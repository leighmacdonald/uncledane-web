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
	state   map[string]tf2state
	stateMu *sync.RWMutex
)

type tf2state struct {
	PlayersCount int
	PlayersMax   int
	ServerName   string
	Players      []Player
}

func updateState(servers map[string]Server) {
	var wg sync.WaitGroup
	for k, v := range servers {
		go func(name string, s Server) {
			wg.Add(1)
			log.Debugf("Updating state: %s", s.Host)
			res, err := query(s)
			if err != nil {
				log.Errorf("Failed to query server %s: %v", name, err)
			}
			stateMu.Lock()
			state[name] = res
			stateMu.Unlock()
			wg.Done()

		}(k, v)
	}
	wg.Wait()
}

func updateWorker(ctx context.Context, servers map[string]Server) {
	updateState(servers)
	t := time.NewTicker(60 * time.Second)
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			updateState(servers)
		}
	}
}

func query(server Server) (tf2state, error) {
	rc, err := rcon.Dial(fmt.Sprintf("%s:%d", server.Host, server.Port), server.Pass)
	if err != nil {
		return tf2state{}, errors.Wrapf(err, "Could not dial remote server: %v")
	}
	_, err = rc.Write("status")
	if err != nil {
		return tf2state{}, errors.Wrapf(err, "Could not write request: %v")
	}
	resp, _, err := rc.Read()
	if err != nil {
		return tf2state{}, errors.Wrapf(err, "Could not read response: %v")
	}
	log.Println(resp)
	return tf2state{}, nil
}

func init() {
	stateMu = &sync.RWMutex{}
}
