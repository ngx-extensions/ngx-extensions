#!/usr/bin/env bash

set -e

# Clean up first if building again
echo 'Cleaning up build artifacts...'

rm -rf ./dist

echo 'Clean up complete!'

# Build modules
echo 'Building modules...'

./node_modules/.bin/ng-packagr -p projects/extensions/ng-package.json
./node_modules/.bin/ng-packagr -p projects/screenfull/ng-package.json

echo 'Build complete!'
