#!/bin/bash

# Hall-o-Flow Full Stack Setup Script

echo "🚀 Hall-o-Flow Full Stack Setup"
echo "=================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo -e "${BLUE}✓ Node.js version:${NC}"
node --version

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo -e "${BLUE}✓ npm version:${NC}"
npm --version

# Setup Frontend
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
cd ..

# Setup Backend
echo -e "\n${BLUE}Setting up Backend...${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Check if .env exists, if not create it
if [ ! -f ".env" ]; then
    echo -e "\n${BLUE}Creating backend .env file...${NC}"
    cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hall-o-flow
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here_change_in_production
EOF
    echo -e "${GREEN}✓ Created .env file${NC}"
fi

cd ..

# Setup Frontend .env.local
cd frontend
if [ ! -f ".env.local" ]; then
    echo -e "\n${BLUE}Creating frontend .env.local file...${NC}"
    cat > .env.local << EOF
GEMINI_API_KEY=PLACEHOLDER_API_KEY
VITE_API_BASE_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✓ Created .env.local file${NC}"
fi

cd ..

echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo -e "\n${BLUE}Next steps:${NC}"
echo "1. Make sure MongoDB is running:"
echo "   - Local: brew services start mongodb-community (macOS)"
echo "   - Or use Docker: docker-compose up mongodb"
echo ""
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo ""
echo "4. Or start all with Docker: docker-compose up"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
