@echo off
:: Talent Tutor - Quick Start Script for Windows
:: This script will check and setup everything automatically

echo ========================================
echo  Talent Tutor - Quick Start Setup
echo ========================================
echo.

:: Check Node.js
echo 1. Checking Node.js installation...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    node -v
    echo [OK] Node.js is installed
) else (
    echo [ERROR] Node.js is NOT installed
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)
echo.

:: Check npm
echo 2. Checking npm installation...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    npm -v
    echo [OK] npm is installed
) else (
    echo [ERROR] npm is NOT installed
    pause
    exit /b 1
)
echo.

:: Check dependencies
echo 3. Checking dependencies...
if exist "node_modules\" (
    echo [OK] Dependencies already installed
) else (
    echo [WARNING] Dependencies not found. Installing...
    call npm install
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Dependencies installed successfully
    ) else (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)
echo.

:: Check .env file
echo 4. Checking environment configuration...
if exist ".env" (
    echo [OK] .env file exists
) else (
    if exist ".env.example" (
        echo [WARNING] .env not found. Copying from .env.example...
        copy .env.example .env >nul
        echo [OK] .env file created
        echo [WARNING] Please update .env with your API keys
    ) else (
        echo [WARNING] No .env file found (optional)
    )
)
echo.

:: Check package.json
echo 5. Checking project configuration...
if exist "package.json" (
    echo [OK] package.json found
) else (
    echo [ERROR] package.json not found. Invalid project structure.
    pause
    exit /b 1
)
echo.

echo ========================================
echo  All checks passed!
echo ========================================
echo.
echo Next steps:
echo   1. Run development server: npm run dev
echo   2. Build for production:   npm run build
echo   3. Preview production:     npm run preview
echo.
echo Your app will run at: http://localhost:5173
echo.
echo To start now, run: npm run dev
echo ========================================
echo.
pause
