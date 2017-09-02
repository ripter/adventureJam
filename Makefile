.PHONY: all build test test.nyan lint

all: build server

build: node_modules/
	npx webpack

node_modules/: package.json
	npm install
	touch node_modules/

server: node_modules/
	npx webpack-dev-server --open

test: lint
	npx mocha --opts mocha.opts

test.nyan: node_modules/
	npx mocha --opts mocha.opts -R nyan

lint: node_modules/
	npx eslint src/ test/

plop: node_modules/
	npx plop
