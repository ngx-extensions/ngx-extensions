#!/usr/bin/env bash

echo 'Preparing modules to be packaged...'

gulp move-additional-files
gulp version-placeholder

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
