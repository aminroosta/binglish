#!/bin/bash
# This script zips the contents of the dist folder and removes any .DS_Store files
# It also uses the version in the package.json file as the name of the zip file

# Change directory to the dist folder
cd dist

# Find and delete any .DS_Store files
find . -name ".DS_Store" -delete

# Read the version from the package.json file
version=$(node -p "require('../package.json').version")

# Zip the contents of the dist folder
zip -r "$version.zip" .

# Move the zip file to the parent directory
mv "$version.zip" ..

# Go back to the parent directory
cd ..

# Print a success message
echo "Done! The zip file is located at $(pwd)/$version.zip"
