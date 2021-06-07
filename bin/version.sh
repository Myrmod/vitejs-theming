#!/usr/bin/env bash

tag="$(git describe --tags --abbrev=0)" # Last tag before the current commit

# Add a hint that the current commit is not an exact version
if ! git describe --tags --exact-match 1>&- 2>&-; then
   echo "$tag+dev"
else
   echo "$tag"
fi
