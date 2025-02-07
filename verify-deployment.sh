#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
YELLOW='\033[1;33m'

echo "🔍 Checking GitHub Pages deployment status..."

# Get repository name from package.json
REPO_NAME=$(node -p "require('./package.json').name")
HOMEPAGE_URL=$(node -p "require('./package.json').homepage")

echo -e "\n${YELLOW}Deployment Verification Steps:${NC}"

# 1. Check if gh-pages branch exists locally
echo -e "\n1. Checking gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo -e "${GREEN}✓ gh-pages branch exists locally${NC}"
    
    # Get latest commit hash and time
    LATEST_COMMIT=$(git log gh-pages -1 --format="%H")
    COMMIT_TIME=$(git log gh-pages -1 --format="%cr")
    echo -e "Latest deployment commit: ${YELLOW}${LATEST_COMMIT}${NC}"
    echo -e "Deployed: ${YELLOW}${COMMIT_TIME}${NC}"
else
    echo -e "${RED}✗ gh-pages branch not found locally${NC}"
fi

# 2. Check if site is accessible
echo -e "\n2. Checking if site is accessible..."
if curl -s --head "${HOMEPAGE_URL}" | grep "200 OK" > /dev/null; then
    echo -e "${GREEN}✓ Site is accessible${NC}"
else
    echo -e "${RED}✗ Site is not accessible${NC}"
fi

# 3. Verify dist directory
echo -e "\n3. Checking build artifacts..."
if [ -d "dist" ]; then
    echo -e "${GREEN}✓ dist directory exists${NC}"
    echo -e "Number of files: $(find dist -type f | wc -l)"
else
    echo -e "${RED}✗ dist directory not found - run 'npm run build' first${NC}"
fi

# 4. Asset verification
echo -e "\n4. Verifying static assets..."
echo -e "To verify assets are updated:"
echo -e "  1. Open ${YELLOW}${HOMEPAGE_URL}${NC} in a private/incognito window"
echo -e "  2. Open browser DevTools (F12) and go to Network tab"
echo -e "  3. Check that images return ${YELLOW}HTTP 200${NC} (not 304)"
echo -e "  4. Verify Cache-Control headers on image responses"

# 5. Deployment instructions
echo -e "\n${YELLOW}To force a fresh deployment:${NC}"
echo -e "1. Delete gh-pages branch locally and remotely:"
echo -e "   ${GREEN}git branch -D gh-pages${NC}"
echo -e "   ${GREEN}git push origin --delete gh-pages${NC}"
echo -e "2. Clear npm cache:"
echo -e "   ${GREEN}npm cache clean --force${NC}"
echo -e "3. Rebuild and redeploy:"
echo -e "   ${GREEN}npm run build && npm run deploy${NC}"
echo -e "4. Wait ~5 minutes for GitHub Pages to rebuild"
echo -e "5. Run this script again to verify"
