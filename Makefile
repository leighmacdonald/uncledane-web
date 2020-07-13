all: build

vet:
	@CGO_ENABLED=0 go vet . ./...

fmt:
	@CGO_ENABLED=0 go fmt . ./...

yarn_install:
	@cd frontend && yarn install && cd ..

frontend:
	@cd frontend && yarn run build && cd ..

watch:
	@cd frontend && yarn run watch && cd ..

serve:
	@CGO_ENABLED=0 go run main.go

js_deps: yarn_install

build: clean fmt vet
	@CGO_ENABLED=0 go build -o uncledane-web

run:
	@CGO_ENABLED=0 go run $(GO_FLAGS) -race main.go

test:
	@CGO_ENABLED=0 go test $(GO_FLAGS) -race -cover . ./...

testcover:
	@CGO_ENABLED=0 go test -race -coverprofile c.out $(GO_FLAGS) ./...

lint:
	@CGO_ENABLED=0 golangci-lint run

bench:
	@CGO_ENABLED=0 go test -run=NONE -bench=. $(GO_FLAGS) ./...

clean:
	@CGO_ENABLED=0 go clean $(GO_FLAGS) -i
	@rm -rf ./frontend/dist

image:
	@docker build -t leighmacdonald/uncledane-web:latest .

runimage:
	@docker run --rm --name uncledane-web -it \
		-p 8003:8003 \
		--mount type=bind,source=$(CURDIR)/config.yaml,target=/app/config.yaml \
		leighmacdonald/uncledane-web:latest || true
