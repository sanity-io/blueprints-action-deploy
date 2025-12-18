#!/bin/sh
set -e

# Tags a new release in git for the specified component and version.
# Usage: ./tag-release.sh <component> <major> <minor>
# Used by the release-please workflow
# Deletes the existing tags if they exist, then creates and pushes new tags.
# Effectively "moving" the minor tag and commit sha to point to the latest major tag release

component=$1
major=$2
minor=$3
dry-run=${4:-false}

if [ $4 == true ]; then
  echo "Testing release for component: ${component}, version: ${major}.${minor}"
  exit 1
fi

if [ -z "$component" ] || [ -z "$major" ] || [ -z "$minor" ]; then
  echo "Usage: $0 <component> <major> <minor> [dry-run]"
  exit 1

echo "Tagging release for component: ${component}, version: ${major}.${minor}"

## delete existing tags
git tag -d ${component}-v${major} 2>/dev/null || true
git tag -d ${component}-v${major}.${minor} 2>/dev/null || true
git push origin :${component}-v${major} 2>/dev/null || true
git push origin :${component}-v${major}.${minor} 2/dev/null || true

## create and push new tags
git tag -a ${component}-v${major} -m "Release ${component}-v${major}"
git tag -a ${component}-v${major}.${minor} -m "Release ${component}-v${major}.${minor}"
git push origin ${component}-v${major}
git push origin $component-v${major}.${minor}