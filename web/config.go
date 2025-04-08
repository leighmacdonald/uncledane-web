package web

import (
	"fmt"
	"github.com/mitchellh/go-homedir"
	"github.com/spf13/viper"
	"log"
	"os"
)

type creditMeta struct {
	URL   string
	Title string
	Music []string
}

var config Config
var cfgFile string

type Config struct {
	Listen     string       `mapstructure:"listen_http"`
	StaticPath string       `mapstructure:"static_path"`
	Credits    []creditMeta `mapstructure:"credits"`
}

// InitConfig reads in config file and ENV variables if set.
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
	} else {
		log.Fatalf("Failed to read config file: %v", err)
	}
	c := Config{}
	if err := viper.Unmarshal(&c); err != nil {
		log.Fatalf("Failed to unmarshal config: %v", err)
	}
	config = c
}
