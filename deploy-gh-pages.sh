#!/bin/bash

# Build the app with hash location strategy
echo "Building the Angular application..."
ng build --base-href="https://jairocuadra.github.io/underwrite-pro/" --configuration production

# Copy index.html to 404.html to handle GitHub Pages routing
echo "Copying index.html to 404.html for GitHub Pages routing..."
cp dist/underwrite-pro/index.html dist/underwrite-pro/404.html

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npx angular-cli-ghpages --dir=dist/underwrite-pro --no-silent

echo "Deployment complete! Your app should be available at https://jairocuadra.github.io/underwrite-pro/" 