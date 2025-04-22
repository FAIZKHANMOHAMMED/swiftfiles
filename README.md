# SwiftFiles

A file sharing application built with React and Express.

## Deployment Instructions for Render.com

### Prerequisites

1. Create a Render.com account if you don't have one already.
2. Fork or clone this repository to your own GitHub account.

### Automatic Deployment via render.yaml

This repository includes a `render.yaml` file which allows for automatic deployment to Render.com using Infrastructure as Code.

1. From your Render dashboard, click the "New +" button and select "Blueprint".
2. Connect your GitHub account and select the repository.
3. Render will automatically detect the `render.yaml` file and configure the services.
4. Review the configuration and click "Apply".

This will set up:
- A web service for the frontend
- A web service for the backend API
- A MongoDB database

### Manual Deployment

#### Backend API Service

1. From your Render dashboard, click "New +" and select "Web Service".
2. Connect your GitHub repository.
3. Configure the service:
   - Name: swiftfiles-api
   - Environment: Node
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Instance Type: Free (or paid for production)
4. Add environment variables:
   - PORT: 10000
   - MONGODB_URI: Your MongoDB connection string
   - JWT_SECRET: A secure random string
   - FRONTEND_URL: Your frontend URL

#### Frontend Web Service

1. From your Render dashboard, click "New +" and select "Web Service".
2. Connect your GitHub repository.
3. Configure the service:
   - Name: swiftfiles-frontend
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - Instance Type: Free (or paid for production)
4. Add environment variables:
   - PORT: 10000
   - VITE_API_URL: Your backend API URL + '/api' (e.g., https://swiftfiles-api.onrender.com/api)
   - VITE_APP_URL: Your frontend URL (e.g., https://swiftfiles.onrender.app)

### After Deployment

After successful deployment, you can access:
- Frontend: https://swiftfiles-frontend.onrender.com
- Backend API: https://swiftfiles-api.onrender.com

## Local Development

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
``` 