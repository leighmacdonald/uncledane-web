package web

import (
	"context"
	"fmt"
	"github.com/leighmacdonald/rcon"
	"github.com/leighmacdonald/steamid"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"sync"
	"time"
)

var (
	servers   map[string]Server
	serversMu *sync.RWMutex
)

func updateState() {
	var wg sync.WaitGroup
	for k, v := range config.Servers {
		wg.Add(1)
		go func(name string, s Server) {
			log.Debugf("Updating state: %s", s.Host)
			res, err := query(s)
			if err != nil {
				log.Errorf("Failed to query servers %s: %v", name, err)
			}
			serversMu.Lock()
			s.State = res
			servers[name] = s
			serversMu.Unlock()
			wg.Done()
		}(k, v)
	}
	wg.Wait()
}

func updateWorker(ctx context.Context) {
	updateState()
	t := time.NewTicker(60 * time.Second)
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			updateState()
		}
	}
}

func query(server Server) (steamid.Status, error) {
	rc, err := rcon.Dial(fmt.Sprintf("%s:%d", server.Host, server.Port), server.Pass)
	if err != nil {
		return steamid.Status{}, errors.Wrapf(err, "Could not dial remote servers: %v", err)
	}
	_, err = rc.Write("status")
	if err != nil {
		return steamid.Status{}, errors.Wrapf(err, "Could not write request: %v", err)
	}
	resp, _, err := rc.Read()
	if err != nil {
		return steamid.Status{}, errors.Wrapf(err, "Could not read response: %v", err)
	}
	return steamid.ParseStatus(resp, true)
}

func init() {
	servers = make(map[string]Server)
	serversMu = &sync.RWMutex{}
}
