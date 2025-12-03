#!/bin/bash

# Simulate release-please outputs
MAJOR=1
MINOR=2
PATCH=3

echo "Simulating release v${MAJOR}.${MINOR}.${PATCH}"
echo ""

# Show current tags
echo "Current tags:"
git tag -l "v${MAJOR}*"
echo ""

# Delete existing major and minor tags locally
echo "Deleting old tags..."
git tag -d v${MAJOR} 2>/dev/null || echo "  v${MAJOR} didn't exist"
git tag -d v${MAJOR}.${MINOR} 2>/dev/null || echo "  v${MAJOR}.${MINOR} didn't exist"
echo ""

# Create new tags pointing to HEAD
echo "Creating new tags..."
git tag -a v${MAJOR} -m "Release v${MAJOR}"
git tag -a v${MAJOR}.${MINOR} -m "Release v${MAJOR}.${MINOR}"
git tag -a v${MAJOR}.${MINOR}.${PATCH} -m "Release v${MAJOR}.${MINOR}.${PATCH}"
echo ""

# Show where tags point
echo "Tags now point to:"
git show-ref --tags | grep "v${MAJOR}"
echo ""

echo "To push these tags (DRY RUN - not actually pushing):"
echo "  git push origin v${MAJOR} --force"
echo "  git push origin v${MAJOR}.${MINOR} --force"
echo "  git push origin v${MAJOR}.${MINOR}.${PATCH}"
echo ""
echo "To clean up test tags:"
echo "  git tag -d v${MAJOR} v${MAJOR}.${MINOR} v${MAJOR}.${MINOR}.${PATCH}"
