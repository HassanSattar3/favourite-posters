#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Verifying deployment configuration..."

# Check if git is initialized
if [ ! -d .git ]; then
    echo -e "${RED}Error: Git repository not initialized${NC}"
    echo "Run 'git init' to initialize the repository"
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo -e "${RED}Error: No remote origin configured${NC}"
    echo "Add your GitHub repository as remote origin:"
    echo "git remote add origin https://github.com/hassansattar3/favourite-posters.git"
    exit 1
fi

# Check if GitHub workflow exists
if [ ! -f .github/workflows/deploy.yml ]; then
    echo -e "${RED}Error: GitHub Actions workflow file not found${NC}"
    exit 1
fi

# Verify package.json configuration
if ! grep -q '"homepage": "https://hassansattar3.github.io/favourite-posters"' package.json; then
    echo -e "${RED}Error: homepage not properly configured in package.json${NC}"
    exit 1
fi

if ! grep -q '"predeploy": "npm run build"' package.json; then
    echo -e "${RED}Error: predeploy script not found in package.json${NC}"
    exit 1
fi

if ! grep -q '"deploy": "gh-pages -d dist"' package.json; then
    echo -e "${RED}Error: deploy script not found in package.json${NC}"
    exit 1
fi

# All checks passed
echo -e "${GREEN}✓ Git repository initialized${NC}"
echo -e "${GREEN}✓ Remote origin configured${NC}"
echo -e "${GREEN}✓ GitHub Actions workflow exists${NC}"
echo -e "${GREEN}✓ Package.json properly configured${NC}"
echo
echo -e "${GREEN}All deployment configurations verified successfully!${NC}"
echo
echo "Next steps:"
echo "1. Commit your changes:"
echo "   git add ."
echo "   git commit -m \"Setup GitHub Pages deployment\""
echo
echo "2. Push to main branch:"
echo "   git push origin main"
echo
echo "3. Monitor deployment status:"
echo "   https://github.com/hassansattar3/favourite-posters/actions"