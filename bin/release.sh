#!/bin/bash

# get current version
VERSION=$(node --eval "console.log(require('./package.json').version);")

# Build
git checkout -b build

npm run clean
npm run build

git rm .gitignore

# Create git tag, which is also the Bower/Github release
git add dist

git commit -m "release $VERSION"

# Tag and push
git tag -f v$VERSION
git push --tags

# Cleanup
git checkout master
git branch -D build
