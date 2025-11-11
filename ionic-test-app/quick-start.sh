#!/bin/bash

# Quick Start Script for Ionic Test App
# This script helps set up and run the Ionic test application

echo "================================================"
echo "Hub Link Nest - Ionic Test Application Setup"
echo "================================================"
echo ""

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "Error: Please run this script from the ionic-test-app directory"
    echo "Usage: cd ionic-test-app && ./quick-start.sh"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
    echo "Dependencies installed successfully!"
    echo ""
else
    echo "Dependencies already installed."
    echo ""
fi

# Check if Hub Link Nest is running
echo "Checking if Hub Link Nest is running..."
if curl -s http://localhost:5173/config.json > /dev/null; then
    echo "✓ Hub Link Nest is running on http://localhost:5173"
    echo ""
else
    echo "⚠ Warning: Hub Link Nest is not running on http://localhost:5173"
    echo ""
    echo "To start Hub Link Nest:"
    echo "  1. Open a new terminal"
    echo "  2. Navigate to the hub-link-nest directory"
    echo "  3. Run: npm run dev"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Ask what to do
echo "What would you like to do?"
echo "1) Start the development server"
echo "2) Run unit tests"
echo "3) Build for production"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Starting Ionic development server..."
        echo "The app will open at http://localhost:8100"
        echo ""
        npm start
        ;;
    2)
        echo ""
        echo "Running unit tests..."
        npm test
        ;;
    3)
        echo ""
        echo "Building for production..."
        npm run build
        ;;
    4)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
