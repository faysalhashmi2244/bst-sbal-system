# SBAL System API Documentation

This document provides detailed information about all API endpoints, including request and response payloads.

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### 1. Register User

Registers a new user in the system.

- **URL**: `/users/register`
- **Method**: `POST`
- **Request Payload**:

```json
{
  "username": "user_nickname",
  "sponsorId": "sponsor_id",
  "walletAddress": "0x123abc..."
}
```

- **Success Response (201)**:

```json
{
  "success": true,
  "data": {
    "userId": "generated_unique_id",
    "username": "user_nickname",
    "sponsorId": "sponsor_id",
    "walletAddress": "0x123abc..."
  },
  "message": "User registered successfully"
}
```

- **Error Responses**:

  - **Username already exists (400)**:

  ```json
  {
    "success": false,
    "message": "Username already exists"
  }
  ```

  - **Wallet address already registered (400)**:

  ```json
  {
    "success": false,
    "message": "Wallet address already registered"
  }
  ```

  - **Invalid sponsor ID (400)**:

  ```json
  {
    "success": false,
    "message": "Invalid sponsor ID. Sponsor does not exist."
  }
  ```

  - **Server error (500)**:

  ```json
  {
    "success": false,
    "message": "Error message details"
  }
  ```

### 2. Check User Exists

Checks if a user exists by wallet address.

- **URL**: `/users/check`
- **Method**: `POST`
- **Request Payload**:

```json
{
  "walletAddress": "0x123abc..."
}
```

- **Success Response - User Exists (200)**:

```json
{
  "success": true,
  "exists": true,
  "data": {
    "userId": "user_unique_id",
    "username": "user_nickname"
  }
}
```

- **Success Response - User Does Not Exist (200)**:

```json
{
  "success": true,
  "exists": false
}
```

- **Error Responses**:

  - **Missing wallet address (400)**:

  ```json
  {
    "success": false,
    "message": "Wallet address is required"
  }
  ```

  - **Server error (500)**:

  ```json
  {
    "success": false,
    "message": "Error message details"
  }
  ```

### 3. Get User Profile

Retrieves a user's profile information by wallet address.

- **URL**: `/users/profile/:walletAddress`
- **Method**: `GET`
- **URL Parameters**: `walletAddress` - The wallet address of the user

- **Success Response (200)**:

```json
{
  "success": true,
  "data": {
    "userId": "user_unique_id",
    "username": "user_nickname",
    "sponsorId": "sponsor_id",
    "walletAddress": "0x123abc...",
    "createdAt": "2023-07-19T13:48:56.789Z"
  }
}
```

- **Error Responses**:

  - **User not found (404)**:

  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```

  - **Server error (500)**:

  ```json
  {
    "success": false,
    "message": "Error message details"
  }
  ```

## Example Usage

### Register a New User

```javascript
// Frontend code example
const registerUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/register",
      {
        username: "johndoe",
        sponsorId: "admin", // For first user, or existing userId for others
        walletAddress: "0x123abc...",
      },
    );

    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error("Registration failed:", error.response.data.message);
  }
};
```

### Check if User Exists

```javascript
// Frontend code example
const checkUserExists = async (walletAddress) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/check", {
      walletAddress: walletAddress,
    });

    if (response.data.exists) {
      console.log("User exists:", response.data.data);
      return true;
    } else {
      console.log("User does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error checking user:", error.response.data.message);
    return false;
  }
};
```

### Get User Profile

```javascript
// Frontend code example
const getUserProfile = async (walletAddress) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/users/profile/${walletAddress}`,
    );
    console.log("User profile:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response.data.message);
    return null;
  }
};
```
