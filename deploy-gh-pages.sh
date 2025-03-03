#!/bin/bash

# Exit on error
set -e

# Build the project with the correct base-href for GitHub Pages
echo "Building the project..."
export NODE_OPTIONS=--openssl-legacy-provider && npm run build -- --configuration=production --base-href="/underwrite-pro/"

# Create a temporary directory for the build output
echo "Creating temporary directory..."
mkdir -p temp_deploy

# Copy build output to temporary directory
echo "Copying build output to temporary directory..."
cp -r dist/underwrite-pro/* temp_deploy/

# Ensure the base href is correct in index.html
echo "Verifying base href in index.html..."
sed -i '' 's|<base href=".*">|<base href="/underwrite-pro/">|g' temp_deploy/index.html

# Stash any changes in the working directory
echo "Stashing any changes in the working directory..."
git stash -u

# Switch to main branch
echo "Switching to main branch..."
git checkout main

# Clean the root directory (except for git, node_modules, and other essential files)
echo "Cleaning destination directory..."
find . -maxdepth 1 -not -path "./node_modules*" -not -path "./.git*" -not -path "." -not -path "./temp_deploy*" -not -path "./src*" -not -path "./e2e*" -not -path "./deploy-gh-pages.sh" -exec rm -rf {} \;

# Copy files from temporary directory to root
echo "Copying files to root directory..."
cp -r temp_deploy/* .

# Ensure assets directory exists
echo "Ensuring assets directory exists..."
mkdir -p assets

# Copy assets from src to assets directory if they don't exist
echo "Copying assets from src if needed..."
if [ -d "src/assets" ]; then
  cp -r src/assets/* assets/ 2>/dev/null || true
fi

# Clean up temporary directory
echo "Cleaning up temporary directory..."
rm -rf temp_deploy

# Add all files to git
echo "Adding files to git..."
git add .

# Commit changes
echo "Committing changes..."
git commit -m "Deploy to main branch"

# Push to main branch
echo "Pushing to main branch..."
git push origin main

echo "Deployment complete!" 