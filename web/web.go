package web

import (
	"context"
	"crypto/tls"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"net/http"
	"os"
	"path"
	"time"
)

type M map[string]interface{}

type App struct {
	router *gin.Engine
	srv    *http.Server
	ctx    context.Context
}

func New() *App {
	a := App{
		ctx: context.Background(),
	}

	r := gin.Default()
	staticPath := viper.GetString("static_path")
	if staticPath == "" {
		staticPath = "frontend/dist/static"
	}
	idxPath := path.Join(staticPath, "index.html")
	idx, err := os.ReadFile(idxPath)
	if err != nil {
		log.Fatalf("Could not read %s", idxPath)
	}
	r.Static("/static", staticPath)
	for _, p := range []string{"/", "/settings", "/credits", "/donate", "/servers"} {
		r.GET(p, func(c *gin.Context) {
			c.Data(200, "text/html", idx)
		})
	}
	//r.GET("/servers", a.handleIndex)
	//r.GET("/donate", a.handleIndex)
	//r.GET("/credits", a.handleIndex)
	//r.GET("/settings", a.handleIndex)
	//r.GET("/embed", a.handleOEmbed)

	a.router = r
	return &a
}

func (a *App) Serve(opts HTTPOpts) error {
	opts.Handler = a.router
	a.srv = NewHTTPServer(opts)
	go updateWorker(a.ctx)

	return a.srv.ListenAndServe()
}

func (a *App) handleIndex(c *gin.Context) {
	c.String(200, "home", M{})
}

func (a *App) handleOEmbed(c *gin.Context) {
	c.JSON(200, M{
		"version":       "1.0",
		"type":          "rich",
		"title":         "Uncle Dane",
		"description":   "Uncle Dane",
		"author_name":   "Uncle Dane",
		"author_url":    "https://uncledane.com",
		"provider_name": "Check out my Uncletopia TF2 Servers",
		"provider_url":  "https://uncledane.com/servers",
	})
}

// HTTPOpts is used to configure a http.Server instance
type HTTPOpts struct {
	ListenAddr     string
	UseTLS         bool
	Handler        http.Handler
	ReadTimeout    time.Duration
	WriteTimeout   time.Duration
	MaxHeaderBytes int
	TLSConfig      *tls.Config
}

// DefaultHTTPOpts returns a default set of options for http.Server instances
func DefaultHTTPOpts() HTTPOpts {
	addr := viper.GetString("listen_http")
	return HTTPOpts{
		ListenAddr:     addr,
		UseTLS:         false,
		Handler:        nil,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
		TLSConfig:      nil,
	}
}

// NewHTTPServer will configure and return a *http.Server suitable for serving requests.
// This should be used over the default ListenAndServe options as they do not set certain
// parameters, notably timeouts, which can negatively effect performance.
func NewHTTPServer(opts HTTPOpts) *http.Server {
	var tlsCfg *tls.Config
	if opts.UseTLS && opts.TLSConfig == nil {
		tlsCfg = &tls.Config{
			MinVersion:               tls.VersionTLS12,
			CurvePreferences:         []tls.CurveID{tls.CurveP521, tls.CurveP384, tls.CurveP256},
			PreferServerCipherSuites: true,
			CipherSuites: []uint16{
				tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
				tls.TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,
				tls.TLS_RSA_WITH_AES_256_GCM_SHA384,
				tls.TLS_RSA_WITH_AES_256_CBC_SHA,
			},
		}
	} else {
		tlsCfg = nil
	}
	return &http.Server{
		Addr:           opts.ListenAddr,
		Handler:        opts.Handler,
		TLSConfig:      tlsCfg,
		ReadTimeout:    opts.ReadTimeout,
		WriteTimeout:   opts.WriteTimeout,
		MaxHeaderBytes: opts.MaxHeaderBytes,
	}
}
