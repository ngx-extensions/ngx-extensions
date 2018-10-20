#!/usr/bin/env bash

echo 'Packaging modules...'
for module in ./dist/@ngx-extensions/*
do
  if [ -d ${module} ]
  then
    echo "Packaging $module"
    cd $module
    npm pack
    cd -
  fi
done
echo 'Modules ready to be published!'
