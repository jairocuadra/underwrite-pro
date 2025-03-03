#!/bin/bash

# Exit on error
set -e

# Build the project with the correct base-href for GitHub Pages
echo "Building the project..."
npm run build -- --configuration=production --base-href="/underwrite-pro/"

# Copy files to root directory
echo "Copying files to root directory..."
cp -r dist/underwrite-pro/* .

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