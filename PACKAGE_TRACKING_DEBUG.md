# Package Tracking System - Debugging Guide

## Overview

The package tracking system stores purchased packages in MongoDB and displays them in the TeamReferral component.

## How It Works

### 1. **Backend Setup** ✅

- **Database**: MongoDB (see `backend/server.js`)
- **Model**: User schema with `purchasedPackages` array (see `backend/models/userModel.js`)
- **API Endpoints**:
  - `POST /api/users/package/purchase` - Store package purchase
  - `GET /api/users/packages/:walletAddress` - Get user's packages

### 2. **Frontend Flow** ✅

1. User buys package via `Packages.jsx` (purchaseNode or purchaseNodeWithDiscount)
2. Transaction is confirmed on blockchain
3. Package data is sent to backend API automatically
4. `TeamReferral.jsx` fetches and displays packages for each user in tree

## Why Packages Might Not Show

### Issue 1: Backend Not Running

**Check:**

```bash
cd backend
npm start
# or
node server.js
```

**Expected output:**

```
Server running on port 5000
MongoDB connected successfully
```

### Issue 2: User Not Registered

**The user must be registered in the database first!**

When a user purchases a package, the backend tries to find them by wallet address:

- If user doesn't exist → 404 error → Package not saved
- If user exists → Package saved to their record

**Solution:** Make sure users register before buying packages (check your registration flow)

### Issue 3: No Packages Purchased Yet

**Check if any packages have been purchased:**

1. Open browser console (F12)
2. Look for logs like:
   ```
   Fetching packages for address: 0x...
   Packages response for 0x...: { success: true, data: {...} }
   Found X packages for 0x...
   ```

If you see `Found 0 packages`, it means no packages have been saved yet.

### Issue 4: API Connection Error

**Check the API base URL:**

- File: `src/services/api.js`
- Uses: `VITE_API_BASE_URL_USER` from `.env`
- Default: `https://sbal-system.onrender.com/api`

**Local testing:** Update `.env`:

```
VITE_API_BASE_URL_USER=http://localhost:5000/api
```

## Testing the System

### Step 1: Start Backend

```bash
cd backend
npm install
npm start
```

### Step 2: Register a Test User

Use your registration form or test via API:

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "sponsorId": 0,
    "walletAddress": "0xYourWalletAddress"
  }'
```

### Step 3: Buy a Package

1. Connect wallet in frontend
2. Approve tokens
3. Buy a package ($100, $200, etc.)
4. Wait for transaction confirmation

### Step 4: Verify Package Saved

Check MongoDB or test API:

```bash
curl http://localhost:5000/api/users/packages/0xYourWalletAddress
```

Expected response:

```json
{
  "success": true,
  "data": {
    "userId": 0,
    "username": "testuser",
    "purchasedPackages": [
      {
        "packageId": 1,
        "packageName": "Package Name",
        "price": "100",
        "transactionHash": "0x...",
        "purchaseDate": "2025-10-04T..."
      }
    ]
  }
}
```

### Step 5: View in TeamReferral

1. Navigate to Team Referral page
2. Open browser console (F12)
3. Look for debug logs:
   ```
   Fetching packages for address: 0x...
   Packages response for 0x...: {...}
   Found 1 packages for 0x...
   ```
4. Packages should display below user cards

## Current Debug Features

The code now includes extensive logging:

- ✅ Logs when fetching packages
- ✅ Logs API responses
- ✅ Logs number of packages found
- ✅ Shows "No packages" text when empty
- ✅ Only saves on purchase transactions (not approve/claim)

## Quick Checklist

- [ ] Backend server is running
- [ ] MongoDB is connected
- [ ] User is registered in database
- [ ] Package has been purchased (confirmed transaction)
- [ ] Browser console shows package fetch logs
- [ ] No CORS or network errors in console

## Common Errors

### Error: "User not found"

- User needs to be registered first
- Check wallet address matches exactly

### Error: 404 on API call

- Backend not running
- Wrong API URL in `.env`

### Error: Package already recorded

- Duplicate transaction hash
- Normal behavior, prevents duplicates

### Error: CORS

- Check `backend/server.js` CORS settings
- Add your frontend URL to allowed origins

## Need Help?

1. Check browser console for errors
2. Check backend terminal for errors
3. Verify API endpoints are accessible
4. Test with curl/Postman first
5. Check MongoDB for actual data
