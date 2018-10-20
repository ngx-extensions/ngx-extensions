#!/bin/bash

readonly version = $1

set -e

echo "Finishing release $version"

git flow release finish $version

echo "Pushing tags"
git push origin --tags

echo "Pushing changes into develop"
git push origin develop

echo "Pushing changes into master"
git push origin master

echo "Finished release $version!"
echo "Returning to develop branch"
git checkout develop

