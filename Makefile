.PHONY: all build run vr plop public

all: build run

build: node_modules/
	npx webpack

run:
	npm start

vr: build
	npx webpack-dev-server --open

public: build
	npx http-server

node_modules/: package.json
	npm install
	touch node_modules/

lint: node_modules/
	npx eslint src

plop: node_modules/
	npx plop
