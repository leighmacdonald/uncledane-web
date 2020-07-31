package web

import (
	"fmt"
	"github.com/leighmacdonald/steamid"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
	"log"
	"os"
	"sync"
	"time"
)

var config Config
var cfgFile string

type Config struct {
	GraphURL    string        `mapstructure:"graph_url"`
	EmptyMaxAge time.Duration `mapstructure:"empty_max_age"`
	Listen      string        `mapstructure:"listen_http"`
	StaticPath  string        `mapstructure:"static_path"`
	Servers     []*Server     `mapstructure:"servers"`
	Order       []string      `mapstructure:"order"`
}

type Server struct {
	*sync.RWMutex
	Host           string `mapstructure:"host"`
	Port           uint16 `mapstructure:"port"`
	Pass           string `mapstructure:"pass"`
	Region         string `mapstructure:"region"`
	DefaultMap     string `mapstructure:"default_map"`
	CountryCode    string `mapstructure:"country_code"`
	LastHadPlayers time.Time
	State          steamid.Status
}

// initConfig reads in config file and ENV variables if set.
func InitConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		// Find home directory.
		home, err := homedir.Dir()
		if err != nil {
			fmt.Println(err)
			os.Exit(1)
		}

		// Search config in home directory with name "config" (without extension).
		viper.AddConfigPath(home)
		viper.AddConfigPath(".")
		viper.SetConfigName("config")
	}

	viper.AutomaticEnv() // read in environment variables that match

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		fmt.Println("Using config file:", viper.ConfigFileUsed())
	}
	c := Config{}
	if err := viper.Unmarshal(&c); err != nil {
		log.Fatalf("Failed to unmarshal config: %v", err)
	}
	for _, s := range c.Servers {
		s.RWMutex = &sync.RWMutex{}
		s.LastHadPlayers = time.Now()
	}
	servers = c.Servers
	config = c
}
