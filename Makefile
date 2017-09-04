.PHONY: all build run vr

all: build run

build: node_modules/
	npx webpack

run:
	npm start

vr: build
	npx webpack-dev-server --open

node_modules/: package.json
	npm install
	touch node_modules/
