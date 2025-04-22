# SwiftFiles Backend

This is the MongoDB backend for the SwiftFiles application, providing APIs for user authentication and file management.

## Features

- User authentication (register, login, get current user)
- File operations (upload, list, share, delete)
- JWT-based authentication
- MongoDB database storage
- File storage on disk with metadata in MongoDB

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/swiftfiles
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile (protected)

### Files

- `POST /api/files/upload` - Upload a file (protected)
- `GET /api/files/user` - Get all files for current user (protected)
- `GET /api/files/share/:shareId` - Get a shared file by share ID
- `DELETE /api/files/:fileId` - Delete a file (protected)

## Development

To run the server in development mode with auto-restart:

```
npm run dev
``` 