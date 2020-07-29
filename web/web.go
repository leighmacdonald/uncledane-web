package web

import (
	"bytes"
	"context"
	"crypto/tls"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gomarkdown/markdown"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// Arg map for templates
type M map[string]interface{}

type App struct {
	router    *gin.Engine
	templates map[string]*template.Template
	srv       *http.Server
	ctx       context.Context
}

func New() *App {
	a := App{
		ctx:       context.Background(),
		templates: make(map[string]*template.Template),
	}
	var templateFiles []string
	root := "templates"
	if err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if strings.HasSuffix(info.Name(), ".gohtml") {
			if !strings.Contains(path, "/layouts/") && !strings.Contains(path, "/partials") {
				templateFiles = append(templateFiles, info.Name())
			}
		}
		return nil
	}); err != nil {
		log.Fatalf("Failed to read templates: %v", err)
	}
	r := gin.Default()
	staticPath := viper.GetString("static_path")
	if staticPath == "" {
		staticPath = "frontend/dist"
	}
	r.Static("/dist", staticPath)
	r.StaticFile("/favicon.ico", "./resources/favicon.ico")
	var newPagesSet = func(path string) []string {
		return []string{
			fmt.Sprintf("templates/%s.gohtml", path),
			//"templates/partials/page_header.gohtml",
			"templates/layouts/layout.gohtml",
		}
	}
	for _, p := range templateFiles {
		pageN := strings.ReplaceAll(p, ".gohtml", "")
		a.templates[pageN] = newTmpl(newPagesSet(pageN)...)
	}
	r.GET("/", a.handleIndex)
	r.GET("/servers", a.handleServers)
	r.GET("/donate", a.handleDonate)
	r.GET("/credits", a.handleCredits)

	a.router = r
	return &a
}

func md(data string) template.HTML {
	out := markdown.ToHTML([]byte(data), nil, nil)
	return template.HTML(out)
}

func (a *App) render(c *gin.Context, t string, args M) {
	var buf bytes.Buffer
	tmpl := a.templates[t]
	if err := tmpl.ExecuteTemplate(&buf, "layout", args); err != nil {
		log.Errorf("Failed to execute template: %v", err)
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Data(200, gin.MIMEHTML, buf.Bytes())
}

func newTmpl(files ...string) *template.Template {
	var tFuncMap = template.FuncMap{
		"md": md,
		"icon": func(class string) template.HTML {
			return template.HTML(fmt.Sprintf(`<i class="%s"></i>`, class))
		},
		"currentYear": func() template.HTML {
			return template.HTML(fmt.Sprintf("%d", time.Now().UTC().Year()))
		},
		"datetime": func(t time.Time) template.HTML {
			return template.HTML(t.Format(time.RFC822))
		},
		"fmtFloat": func(f float64, size int) template.HTML {
			ft := fmt.Sprintf("%%.%df", size)
			return template.HTML(fmt.Sprintf(ft, f))
		},
	}
	tmpl, err := template.New("layout").Funcs(tFuncMap).ParseFiles(files...)
	if err != nil {
		log.Panicf("Failed to load template: %v", err)
	}
	return tmpl
}

func (a *App) Serve(opts HTTPOpts) error {
	opts.Handler = a.router
	a.srv = NewHTTPServer(opts)

	go updateWorker(a.ctx, config.Servers)

	return a.srv.ListenAndServe()
}

func (a *App) handleIndex(c *gin.Context) {
	a.render(c, "home", M{})
}

func (a *App) handleServers(c *gin.Context) {
	serverMu.RLock()
	servers := server
	serverMu.RUnlock()
	a.render(c, "servers", M{
		"servers": servers,
	})
}

func (a *App) handleDonate(c *gin.Context) {
	a.render(c, "donate", M{})
}

func (a *App) handleCredits(c *gin.Context) {
	a.render(c, "credits", M{})
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
