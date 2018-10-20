#!/bin/bash

readonly scope=@ngx-extensions

echo "Publishing modules at [$scope]"

npm login --scope=$scope

for module in ./dist/@ngx-extensions/*
do
  if [ -d ${module} ]
  then
    echo "Publishing: $module"
    npm publish ${module} --access=public
  fi
done

npm logout

echo "Modules published at [$scope]!. Use 'npm install [$scope/pkg]' in a client project."
