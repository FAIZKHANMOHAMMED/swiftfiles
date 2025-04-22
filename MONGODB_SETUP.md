# MongoDB Backend Setup Guide

This guide explains how to set up and use the MongoDB backend for SwiftFiles.

## Prerequisites

1. Install MongoDB locally or use MongoDB Atlas (cloud-hosted)
2. Node.js and npm installed

## Setup

### 1. Install MongoDB (if using locally)

- **Windows**: Download and install from [MongoDB website](https://www.mongodb.com/try/download/community)
- **MacOS**: `brew install mongodb-community`
- **Linux**: Follow distribution-specific instructions

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) for a cloud-hosted solution.

### 2. Configure Environment Variables

1. Navigate to the backend folder
2. Edit the `.env` file and update the MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/swiftfiles
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

If using MongoDB Atlas, your connection string will look like:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/swiftfiles
```

### 3. Install Dependencies

```
cd backend
npm install
```

### 4. Start the Backend Server

```
npm run dev
```

## Using the Backend

The backend server will run on `http://localhost:5000` by default. The frontend is already configured to connect to this backend.

The MongoDB backend provides:

1. User authentication (register, login, profile)
2. File storage and management
3. File sharing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Files
- `POST /api/files/upload` - Upload a file
- `GET /api/files/user` - Get all files for current user
- `GET /api/files/share/:shareId` - Get a shared file
- `DELETE /api/files/:fileId` - Delete a file

## Troubleshooting

1. **Connection Issues**: Make sure MongoDB is running if using a local installation
2. **Authentication Problems**: Check your JWT_SECRET in the .env file
3. **File Upload Errors**: Ensure the uploads directory exists and has write permissions 