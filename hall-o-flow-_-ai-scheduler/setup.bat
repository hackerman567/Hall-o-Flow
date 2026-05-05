@echo off
REM Hall-o-Flow Full Stack Setup Script for Windows

echo.
echo 🚀 Hall-o-Flow Full Stack Setup
echo ==================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo ✓ Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo ✓ npm version:
npm --version

REM Setup Frontend
echo.
echo Setting up Frontend...
cd frontend
call npm install
echo ✓ Frontend dependencies installed
cd ..

REM Setup Backend
echo.
echo Setting up Backend...
cd backend
call npm install
echo ✓ Backend dependencies installed

REM Check if .env exists
if not exist ".env" (
    echo.
    echo Creating backend .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/hall-o-flow
        echo NODE_ENV=development
        echo JWT_SECRET=your_jwt_secret_key_here_change_in_production
    ) > .env
    echo ✓ Created .env file
)

cd ..

REM Setup Frontend .env.local
cd frontend
if not exist ".env.local" (
    echo.
    echo Creating frontend .env.local file...
    (
        echo GEMINI_API_KEY=PLACEHOLDER_API_KEY
        echo VITE_API_BASE_URL=http://localhost:5000
    ) > .env.local
    echo ✓ Created .env.local file
)

cd ..

echo.
echo ✅ Setup Complete!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running:
echo    - Windows: MongoDB Service should be running
echo    - Or use Docker: docker-compose up mongodb
echo.
echo 2. Start backend: cd backend ^&^& npm run dev
echo 3. Start frontend: cd frontend ^&^& npm run dev
echo.
echo 4. Or start all with Docker: docker-compose up
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000
echo.
pause
