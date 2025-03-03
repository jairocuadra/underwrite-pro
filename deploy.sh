#!/bin/bash
set -e

# Output colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Angular Deploy to GitHub Pages ===${NC}"

# Clean existing build
echo -e "${BLUE}Removing old build files...${NC}"
rm -rf dist/

# Build project
echo -e "${BLUE}Building Angular project...${NC}"
ng build --configuration production --base-href /underwrite-pro/

# Create or ensure .nojekyll file exists
echo -e "${BLUE}Creating .nojekyll file...${NC}"
touch dist/underwrite-pro/.nojekyll

# Deploy to GitHub Pages
echo -e "${BLUE}Deploying to GitHub Pages...${NC}"
npx angular-cli-ghpages --dir=dist/underwrite-pro --no-silent

echo -e "${GREEN}=== Deployment Complete! ===${NC}"
echo -e "${GREEN}Your site should be available at https://jairocuadra.github.io/underwrite-pro/${NC}" 