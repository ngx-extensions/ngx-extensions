#!/bin/bash

set -e

echo 'Running pre-release checks'

echo 'Ensure linting pass...'

npm run lint:lib

echo 'Ensure tests are all green...'

npm run test:lib

echo 'Ensure modules can be built...'

npm run build:lib
npm run build:app

echo 'All checks clear!'
