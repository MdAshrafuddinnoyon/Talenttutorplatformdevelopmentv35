#!/bin/bash

# Talent Tutor - Quick Start Script
# This script will check and setup everything automatically

echo "🚀 Talent Tutor - Quick Start Setup"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "1. Checking Node.js installation..."
if command -v node &> /dev/null
then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓ Node.js is installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}✗ Node.js is NOT installed${NC}"
    echo "Please install Node.js from: https://nodejs.org"
    exit 1
fi

# Check npm
echo ""
echo "2. Checking npm installation..."
if command -v npm &> /dev/null
then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ npm is installed: $NPM_VERSION${NC}"
else
    echo -e "${RED}✗ npm is NOT installed${NC}"
    exit 1
fi

# Check if node_modules exists
echo ""
echo "3. Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
else
    echo -e "${YELLOW}⚠ Dependencies not found. Installing...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Dependencies installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Check .env file
echo ""
echo "4. Checking environment configuration..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env file exists${NC}"
else
    if [ -f ".env.example" ]; then
        echo -e "${YELLOW}⚠ .env not found. Copying from .env.example...${NC}"
        cp .env.example .env
        echo -e "${GREEN}✓ .env file created${NC}"
        echo -e "${YELLOW}⚠ Please update .env with your API keys${NC}"
    else
        echo -e "${YELLOW}⚠ No .env file found (optional)${NC}"
    fi
fi

# Check package.json
echo ""
echo "5. Checking project configuration..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✓ package.json found${NC}"
else
    echo -e "${RED}✗ package.json not found. Invalid project structure.${NC}"
    exit 1
fi

echo ""
echo "======================================"
echo -e "${GREEN}✓ All checks passed!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run development server: ${GREEN}npm run dev${NC}"
echo "  2. Build for production:   ${GREEN}npm run build${NC}"
echo "  3. Preview production:     ${GREEN}npm run preview${NC}"
echo ""
echo "Your app will run at: ${GREEN}http://localhost:5173${NC}"
echo ""
echo "To start now, run: ${GREEN}npm run dev${NC}"
echo "======================================"
