.PHONY: all build run vr plop server

all: build run

build: node_modules/
	npx webpack

run:
	npm start

vr: build
	npx webpack-dev-server --open

server: build
	npx http-server --open

node_modules/: package.json
	npm install
	touch node_modules/


plop: node_modules/
	npx plop
