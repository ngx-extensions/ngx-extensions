#!/bin/bash

readonly version=$1

set -e

echo "Making sure 'develop' is up to date"

git checkout develop
git pull origin develop

echo "Start release $version"

git flow release start $version develop

echo "Bump to version $version and update changelog"

gulp bump-version --ver $version

npm run generate:changelog

git add -A .

git commit -a -m "chore: version bump"

echo "Release `$version` started!"
