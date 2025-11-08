# Deploying the Backend to Render.com

This guide explains how to deploy the SBAL System backend to Render.com.

## Prerequisites

1. A [Render.com](https://render.com) account
2. Your MongoDB connection string (Atlas or other MongoDB provider)
3. Your project pushed to a Git repository (GitHub, GitLab, etc.)

## Deployment Steps

### 1. Connect Your Repository to Render

1. Log in to your Render.com account
2. Click on "New" and select "Web Service"
3. Connect your Git repository where this project is hosted
4. Select the repository

### 2. Configure the Web Service

Use these settings:

- **Name**: sbal-system-backend (or your preferred name)
- **Root Directory**: backend
- **Runtime**: Node
- **Build Command**: npm install
- **Start Command**: npm start
- **Plan**: Free (or select a paid plan for production)

### 3. Set Environment Variables

Add these environment variables in the Render dashboard:

- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: 10000 (Render will automatically set `PORT` to an internal value, but your app should use this)

### 4. Deploy

Click "Create Web Service" and Render will automatically build and deploy your backend.

## Accessing Your API

Once deployed, your API will be available at:
`https://your-service-name.onrender.com`

Update your frontend's API base URL to point to this URL.

## Troubleshooting

- Check the logs in the Render dashboard if your service fails to deploy
- Make sure your MongoDB connection string is correct and the IP is whitelisted
- Ensure your package.json has the correct start script (`"start": "node server.js"`)

## Using the Blueprint (render.yaml)

Alternatively, you can use the `render.yaml` file in the root directory to deploy using Render Blueprints:

1. Go to the Render Dashboard
2. Click on "Blueprints" in the sidebar
3. Click "New Blueprint Instance"
4. Connect your repository
5. Render will automatically detect the `render.yaml` file and configure the services
