#!/usr/bin/env bash

set -e

# Clean up first if building again
echo 'Cleaning up build artifacts...'

rm -rf ./dist

echo 'Clean up complete!'

# Build modules
echo 'Building modules...'

# TODO Make use of the angular-cli built-in build process
./node_modules/.bin/ng-packagr -p projects/extensions/ng-package.json -c projects/extensions/tsconfig.json
./node_modules/.bin/ng-packagr -p projects/screenfull/ng-package.json -c projects/screenfull/tsconfig.json
./node_modules/.bin/ng-packagr -p projects/count-up.js/ng-package.json -c projects/count-up.js/tsconfig.json
echo 'Build complete!'
