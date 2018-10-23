#!/bin/bash

readonly version=$1

set -e

echo 'Ensure that the release can safely be finished...'

npm run pre-release

echo "Finishing release $version"

# Dissables the editor propmt asking for merge message
# See https://stackoverflow.com/a/14553458/5394220
export GIT_MERGE_AUTOEDIT=no

git flow release finish -m "Release $version" $version

unset GIT_MERGE_AUTOEDIT

echo "Pushing tags"

git push origin --tags

echo "Pushing changes into develop"

git push origin develop

echo "Pushing changes into master"

git push origin master

echo "Finished release $version!"
echo "Returning to develop branch"

git checkout develop

