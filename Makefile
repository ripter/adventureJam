.PHONY: all build run

all: build run

build: node_modules/
	npx webpack

run:
	npm start

node_modules/: package.json
	npm install
	touch node_modules/
