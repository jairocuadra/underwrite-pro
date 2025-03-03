#!/bin/bash
set -e

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Starting Angular Deploy to GitHub Pages ===${NC}"

# Clean up
echo -e "${GREEN}Removing old build files...${NC}"
rm -rf dist/

# First build for local testing with base-href=/
echo -e "${GREEN}Building Angular project for local testing...${NC}"
ng build --configuration development --base-href /

# Create local test directory
mkdir -p dist/local-test
cp -r dist/underwrite-pro/* dist/local-test/

# Create .nojekyll file
echo -e "${GREEN}Creating .nojekyll file...${NC}"
touch dist/local-test/.nojekyll

# Now build for GitHub Pages
echo -e "${GREEN}Building Angular project for GitHub Pages...${NC}"
ng build --configuration production --base-href /underwrite-pro/

# Create .nojekyll file
echo -e "${GREEN}Creating .nojekyll file...${NC}"
touch dist/underwrite-pro/.nojekyll

# Deploy
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
npx angular-cli-ghpages --dir=dist/underwrite-pro --no-silent

echo -e "${BLUE}=== Deployment Complete ===${NC}"
echo -e "${GREEN}Your site should be available at: ${BLUE}https://jairocuadra.github.io/underwrite-pro/${NC}"
echo -e "${GREEN}For local testing: ${BLUE}cd dist/local-test && npx http-server${NC}" 