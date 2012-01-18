all: test

test:
	prove --exec='node' t/test.js
lint:
	jsl -stdin < japan.js
test-setup:
	npm install qunit-tap
min-setup:
	npm install uglify-js
min:
	uglifyjs japan.js > japan.min.js

.PHONY: test test-setup min min-setup
