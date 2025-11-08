# SBAL System Backend

This is the backend server for the SBAL System application that handles user registration and authentication.

## Features

- User registration with unique username validation
- Sponsor ID verification
- Automatic user ID generation
- User existence check before login
- MongoDB integration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Install dependencies:

```
cd backend
npm install
```

2. Create a `.env` file in the backend directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/sbal-system
PORT=5000
```

Note: If you're using MongoDB Atlas, replace the MONGODB_URI with your connection string.

### Running the Server

Development mode (with auto-restart):

```
npm run dev
```

Production mode:

```
npm start
```

## API Endpoints

### Register a new user

- **URL**: `/api/users/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "user_nickname",
    "sponsorId": "sponsor_id",
    "walletAddress": "0x..."
  }
  ```
- **Response**: User data with generated userId

### Check if user exists

- **URL**: `/api/users/check`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "walletAddress": "0x..."
  }
  ```
- **Response**: Boolean indicating if user exists

### Get user profile

- **URL**: `/api/users/profile/:walletAddress`
- **Method**: `GET`
- **Response**: User profile data

## Notes

- The first user should use "admin" as the sponsorId
- Each user gets a unique ID generated automatically
- Usernames must be unique
- Sponsor IDs must match existing user IDs in the database
