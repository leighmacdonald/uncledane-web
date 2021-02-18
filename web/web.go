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
	"path"
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
	if err := filepath.Walk(root, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if strings.HasSuffix(info.Name(), ".gohtml") {
			if !strings.Contains(p, "layouts") && !strings.Contains(p, "partials") {
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
	var newPagesSet = func(p string) []string {
		return []string{
			path.Join("templates", fmt.Sprintf("%s.gohtml", p)),
			//"templates/partials/page_header.gohtml",
			path.Join("templates", "layouts", "layout.gohtml"),
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
	r.GET("/settings", a.handleSettings)
	r.GET("/embed", a.handleOEmbed)

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
	go updateWorker(a.ctx)

	return a.srv.ListenAndServe()
}

func (a *App) handleIndex(c *gin.Context) {
	a.render(c, "home", M{})
}

func (a *App) handleServers(c *gin.Context) {
	type serverInfo struct {
		Region  string
		Servers []*Server
	}
	order := viper.GetStringSlice("order")
	var s []serverInfo
	for _, orderKey := range order {
		var si serverInfo
		si.Region = orderKey
		for _, s := range servers {
			if s.Region == orderKey {
				si.Servers = append(si.Servers, s)
			}
		}
		s = append(s, si)
	}
	a.render(c, "servers", M{
		"servers": s,
	})
}

func (a *App) handleDonate(c *gin.Context) {
	a.render(c, "donate", M{})
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

func (a *App) handleCredits(c *gin.Context) {
	type cr struct {
		URL   string
		Title string
		Music []string
	}
	creds := []cr{
		{
			URL:   "https://www.youtube.com/watch?v=3u8JBh3ciIs",
			Title: "How To Fight Every Class In TF2 (As Engineer) (And Win!)",
			Music: []string{
				"Super Smash Brothers Ultimate -- Menu Theme",
				"Alex Giudici -- More Gun (Alex Giudici Remix)",
				"Team Fortress 2 -- Various Tracks from the TF2 OST",
				"Epidemic Sound -- Various free rights music",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=AU5E_bJycE4",
			Title: "Texas Style",
			Music: []string{
				"April March -- Chick Habit",
				"Jurassic 5 -- A Day At The Races",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=cxGJAgaqaL8",
			Title: "Scream Fortress Again",
			Music: []string{
				"Team Fortress 2 -- Misfortune Teller",
				"Team Fortress 2 -- Haunted Fortress",
				"Team Fortress 2 -- Carousel of Curses",
				"Undertale -- sans.",
				"Undertale -- Dogbass",
				"Hades -- House of Hades",
				"Hades -- Out of Tartarus",
				"Hades -- Wretched Shades",
				"Hades -- The Painful Way",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=91pcGACXt5M",
			Title: "Engie Brain #3 - Using The Jag",
			Music: []string{
				"Animal Crossing: New Leaf -- 8am",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=tvQrOksU-Kg",
			Title: "The Panic Attack Is Good, Actually",
			Music: []string{
				"The Elder Scrolls V: Skyrim -- Under An Ancient Sun",
				"Tetris 99 -- Main Theme",
				"Risk of Rain 2 -- Nocturnal Emission",
				"Risk of Rain 2 -- Koppen As Fuck",
				"Risk of Rain 2 -- Thermodynamic Equilibrium",
				"HoopsAndHipHop -- Cianwood City Remix (Pokemon HG/SS)",
				"The Legend of Zelda: Breath of the Wild -- Hateno Ancient Tech Lab",
				"The Legend of Zelda: Breath of the Wild -- Hinox Battle",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=tLYQ__tbCYk",
			Title: "*teleports behind you* “Nothin’ personal, pardner…”",
			Music: []string{
				"Team Fortress 2 -- Playing With Danger",
				"Plants VS Zombies -- Main Menu",
				"Plants VS Zombies -- Mini Games",
				"Plants VS Zombies -- The Roof (Horde)",
				"Pokemon DPP -- Battle! Champion Cynthia",
				"Earthworm Jim -- Andy Asteroids",
				"Earthworm Jim -- Down The Tubes",
				"Earthworm Jim -- For Pete’s Sake",
				"Earthworm Jim -- New Junk City",
				"Earthworm Jim -- Snot A Problem",
				"Goldfinger -- Superman (8-Bit Remix by 8-Bit Universe)",
				"Lewis Burns -- Traditional Didgeridoo Rhythms",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=Z0KFW-Zrh9I",
			Title: "Engie Brain #2 -- King of the Hill",
			Music: []string{
				"Animal Crossing: New Leaf -- 8am",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=ZRclhDVtCaE",
			Title: "I Still Love The Rescue Ranger",
			Music: []string{
				"Pokemon Sword/Shield -- Marnie’s Theme",
				"Pokemon Sword/Shield -- Battle! Mysterious Being",
				"Pokemon Sword/Shield -- Battle! Gym Leader",
				"Pokemon Sword/Shield -- Wild Area (Version 2)",
				"Pokemon Sword/Shield -- Salon",
				"Pokemon Sword/Shield -- Gym Lobby",
				"Pokemon Sword/Shield -- Gym",
				"Pokemon Sword/Shield -- Turffield",
				"Pokemon GO -- Overworld Theme",
				"Animal Crossing: New Horizons -- 7am",
				"Animal Crossing: New Horizons -- 3am",
				"Animal Crossing: New Horizons -- 3pm",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=YgtSWCt5MgU",
			Title: "Impractical Engineering",
			Music: []string{
				"Harry Belafonte -- Jump In The Line",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=6VmvItzjvdw",
			Title: "MvM With YouTubers #5",
			Music: []string{
				"Super Smash Brothers WiiU/3DS -- Trailer Theme",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=_dgioprmFPI",
			Title: "Why I Main Engineer",
			Music: []string{
				"The Legend of Zelda: Breath of the Wild -- Riding (Day)",
				"Spiderman 2 The Game -- Pizza Theme",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=sgfGkw4Ja5w",
			Title: "More Scream Fortress",
			Music: []string{
				"Undertale -- Sans",
				"Undertale -- Megalovania",
				"Kero Kero Bonito -- Flamingo",
				"Nickelback -- Hero",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=W4HOMvM2E0s",
			Title: "Engineer Weapons Tier List",
			Music: []string{
				"Team Fortress 2 -- More Gun",
				"Halo: Combat Evolved -- Main Theme",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=06JVyJvYMjY",
			Title: "pub.compilation.2019.17618.18632",
			Music: []string{
				"Sugarhill Gang -- Apache (Jump On It)",
				"Alanis Morissette -- Ironic",
				"Metallica -- Master of Puppets",
				"Diddy Kong Racing -- Fossil Canyon",
				"Super Mario Party -- Free Play",
				"Mega Man X -- T34 Staff Roll (Credits Theme)",
				"Curb Your Enthusiasm -- Theme",
				"Duck Hunt -- Theme",
				"Family Guy -- Scene Transition Sting",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=e8y3N9sgyps",
			Title: "Engie Brain #1 -- Payload Defense",
			Music: []string{
				"Animal Crossing: New Leaf -- 1pm",
				"Animal Crossing: New Leaf -- 8am",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=toxY8lHfs30",
			Title: "Engineer’s Best Weapon",
			Music: []string{
				"Grand Theft Auto IV -- Loading Screen Music",
				"Super Smash Brothers Ultimate -- Battle! (Zinnia) (Pokemon Su/Mo Remix)",
				"Super Smash Brothers Ultimate -- Gang-Plank Galleon (Donkey Kong Country Remix)",
				"Super Smash Brothers Ultimate -- Overworld (Super Mario Brothers 3 Remix)",
				"Super Smash Brothers Ultimate -- Snakey Chantey (Donkey Kong Country 2: Diddy’s Kong Quest Remix)",
				"HoopsAndHipHop -- Goldenrod City Remix (Pokemon HG/SS)",
				"Noisestorm -- Crab Rave",
				"Guns And Roses -- Welcome To The Jungle",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=zLks7Vph674",
			Title: "Will It Kritz?",
			Music: []string{
				"Super Smash Brothers Ultimate -- Battle! (Trainer) (Pokemon X/Y Remix)",
				"Super Smash Brothers Ultimate -- Kass’ Theme (The Legend of Zelda: Breath of the Wild Remix)",
				"Super Smash Brothers Ultimate -- Tour (Animal Crossing: New Leaf Remix)",
				"Super Smash Brothers -- Bonus Stage",
				"The Legend of Zelda: Breath of the Wild -- Kass’ Theme",
				"The Legend of Zelda: Breath of the Wild -- Molduga Battle",
				"Minecraft -- Living Mice by C418",
				"Will It Blend -- Theme Song",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=XbtFOCl-OyE",
			Title: "Engineering 101: Tools Of The Trade",
			Music: []string{
				"Super Smash Brothers Wii U -- Poke Floats",
				"Super Smash Brothers Wii U -- Pokemon Center (Pokemon Red/Blue)",
				"Super Smash Brothers Wii U -- Route 10",
				"Super Smash Brothers Wii U -- Yoshi’s Story (Version 2)",
				"Super Smash Brothers Wii U -- Yoshi’s Story (Ending)",
				"Super Smash Brothers Wii U -- Final Destination",
				"Jeopardy -- 30 Second Timer",
				"NFL Theme Song",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=tSTxL4vLa3Q",
			Title: "Scream Fortress Number Ten",
			Music: []string{
				"BoyWithAni -- Ridin’ Round Town Like I’m Judge Joe Brown",
				"Tommy James & The Shondells -- Crystal Blue Persuasion",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=WHvwijT2ss8",
			Title: "Remove Random Crits From TF2",
			Music: []string{
				"Hearthstone -- Tricks of the Trade",
				"Hearthstone -- Two Rogues One Mark",
				"Hearthstone -- Playing With A Full Deck",
				"Hearthstone -- Awash In Ale But Nary A Mug",
				"Hearthstone -- Tabletop Battles",
				"Hearthstone -- Mine Cart Chase",
				"Hearthstone -- Grand Tournament Store Theme",
				"Pokemon HeartGold/SoulSilver -- Hurry Along",
				"Pokemon Gold/Silver/Crystal -- Johto Wild Pokemon (Day)",
				"HoopsAndHipHop -- S.S. Anne Remix ",
				"Miami Nights 1984 -- Ocean Drive",
				"Tchaikovsky -- Waltz Of The Flowers",
				"PinkiePieSwear -- Trixie’s Good Side",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=T880bbxBsOg",
			Title: "Noob! You Underestimate The Power Of The Short Circuit!",
			Music: []string{
				"Frank Sinatra -- Blue Moon (8-Bit Remix)",
				"HoopsAndHipHop -- Cianwood City Remix",
				"HoopsAndHipHop -- Goldenrod City Remix",
				"HoopsAndHipHop -- TinBell Tower Remix",
				"HoopsAndHipHop -- S.S. Anne Remix",
				"Saffron City Jazz Cover",
				"PokeMart Reorchestrated",
				"Mega Man 3 -- Spark Man Stage",
				"The Twilight Zone -- Theme",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=I9ieN1ACfP4",
			Title: "TF2 Maps (Actual Size)",
			Music: []string{
				"Crash Bandicoot 2 -- Road To Ruin / Ruination",
				"Crash Bandicoot 2 -- Turtle Woods / The Pits / Night Fight",
				"Crash Bandicoot 3 -- Hang em High / High Time / Flaming Passion",
				"Dan Terminus -- Avalanche ",
				"Globglobaggalab Instrumental",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=l8m55CbwBJ0",
			Title: "Advanced Engineer Contracts",
			Music: []string{
				"80’s Workout (Royalty Free Synthwave)",
				"Donkey Kong 2 -- Token Tango",
				"Pokemon HeartGold/SoulSilver -- Game Corner",
				"Pokemon HeartGold/SoulSilver -- Radio Route 101",
				"Pokemon HeartGold/SoulSilver -- Viridian Forest",
				"Pokemon HeartGold/SoulSilver -- Wi-Fi Communication",
				"Super Smash Brothers Wii U -- Mega Man 2 Medley",
				"Edvard Grieg -- Morning",
			},
		},
		{
			URL:   "https://www.youtube.com/watch?v=X1p42KtZOCw",
			Title: "Trickle-Down Balance",
			Music: []string{
				"Human League -- Don’t You Want Me (Midi Version)",
				"Summer Vibes Instrumental -- Nkato (Royalty Free Music)",
				"32 Bars Freestyle Beat 4.2 -- Kontekst (Royalty Free Music)",
			},
		},
	}
	a.render(c, "credits", M{"credits": creds})
}

func (a *App) handleSettings(c *gin.Context) {
	a.render(c, "settings", M{})
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
