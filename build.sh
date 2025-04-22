#!/bin/bash

# Frontend build
echo "Installing frontend dependencies..."
npm install

echo "Building the frontend application..."
npm run build

# Backend build
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "Build completed successfully!" 