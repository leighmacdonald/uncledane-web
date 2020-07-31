package web

import (
	"context"
	"fmt"
	"github.com/leighmacdonald/rcon"
	"github.com/leighmacdonald/steamid"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"path"
	"sync"
	"time"
)

var (
	servers   []*Server
	serversMu *sync.RWMutex
)

func updateGraph() {
	if config.GraphURL == "" {
		return
	}
	resp, err := http.Get(config.GraphURL)
	if err != nil {
		log.Errorf("Failed to download graph: %v", err)
		return
	}
	p := path.Join(config.StaticPath, "images/graph.png")
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Errorf("Failed to read resp body: %v", err)
		return
	}
	if err := ioutil.WriteFile(p, b, 0755); err != nil {
		log.Errorf("Failed to write file %s: %v", p, err)
		return
	}
}

func updateState() {
	var wg sync.WaitGroup
	for _, srv := range config.Servers {
		wg.Add(1)
		go func(s *Server) {
			log.Debugf("Updating state: %s", s.Host)
			res, err := queryStatus(s)
			if err != nil {
				log.Errorf("Failed to queryStatus servers %s: %v", s.Host, err)
			}
			if len(s.State.Players) == 0 {
				age := time.Now().Sub(s.LastHadPlayers)
				if age > config.EmptyMaxAge {
					if s.State.Map != s.DefaultMap {
						log.WithField("Server", s.Host).Infof("Changing level due to max empty age: %s -> %s", s.State.Map, s.DefaultMap)
						go func() {
							cmd := fmt.Sprintf("changelevel %s", s.DefaultMap)
							log.Debugf("Would have ran: %s", cmd)
							//_, err := queryExec(s, cmd)
							//if err != nil {
							//	log.Errorf("Failed to changelevel")
							//}
						}()
					}
				}
			} else {
				s.LastHadPlayers = time.Now()
			}
			s.Lock()
			s.State = res
			s.Unlock()
			wg.Done()
		}(srv)
	}
	wg.Wait()
}

func updateWorker(ctx context.Context) {
	updateState()
	updateGraph()
	t := time.NewTicker(60 * time.Second)
	tGraph := time.NewTicker(5 * time.Minute)
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			updateState()
		case <-tGraph.C:
			updateGraph()
		}
	}
}

func connect(server *Server) (*rcon.RemoteConsole, error) {
	return rcon.Dial(fmt.Sprintf("%s:%d", server.Host, server.Port), server.Pass)
}

func queryExec(server *Server, command string) (string, error) {
	rc, err := connect(server)
	if err != nil {
		return "", errors.Wrapf(err, "Could not dial remote servers: %v", err)
	}
	_, err = rc.Write(command)
	if err != nil {
		return "", errors.Wrapf(err, "Could not write request: %v", err)
	}
	resp, _, err := rc.Read()
	if err != nil {
		return "", errors.Wrapf(err, "Could not read response: %v", err)
	}
	return resp, err
}

func queryStatus(server *Server) (steamid.Status, error) {
	resp, err := queryExec(server, "status")
	if err != nil {
		return steamid.Status{}, errors.Wrapf(err, "Could not execute command")
	}
	return steamid.ParseStatus(resp, true)
}

func init() {
	serversMu = &sync.RWMutex{}
}
