#!/bin/bash

# Exit on error
set -e

# Build the project with the correct base-href for GitHub Pages
echo "Building the project..."
export NODE_OPTIONS=--openssl-legacy-provider && npm run build -- --configuration=production --base-href="/underwrite-pro/"

# Clean the root directory of old files (except for git and node_modules)
echo "Cleaning destination directory..."
find . -maxdepth 1 -not -path "./node_modules*" -not -path "./.git*" -not -path "." -not -path "./dist*" -not -path "./src*" -not -path "./e2e*" -not -path "./deploy-gh-pages.sh" -exec rm -rf {} \;

# Copy files to root directory with proper permissions
echo "Copying files to root directory..."
cp -r dist/underwrite-pro/* .

# Ensure index.html has the correct base href
echo "Verifying base href in index.html..."
sed -i '' 's|<base href=".*">|<base href="/underwrite-pro/">|g' index.html

# Add files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy to main branch"

# Push to main branch
echo "Pushing to main branch..."
git push origin main

echo "Deployment complete!" 