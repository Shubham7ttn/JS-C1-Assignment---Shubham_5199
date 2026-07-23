# MongoDB Atlas Setup

## 1. Create a cluster
1. Go to https://cloud.mongodb.com and sign in (or create an account).
2. Create a **free M0 cluster**.
3. Choose a cloud provider and region close to you.

## 2. Database user
1. Open **Database Access** -> **Add New Database User**.
2. Choose **Password** authentication.
3. Save the username and password (you need them for the connection string).

## 3. Network access
1. Open **Network Access** -> **Add IP Address**.
2. For local development, click **Add Current IP Address**.
3. Or use **Allow Access from Anywhere** (0.0.0.0/0) for development only.

## 4. Get connection string
1. Open **Database** -> **Connect** -> **Drivers**.
2. Copy the Node.js connection string. It looks like:
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
3. Replace `<password>` with your real password (URL-encode special characters).
4. Add the database name before the query string:
   mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/support-tickets?retryWrites=true&w=majority

## 5. Configure backend/.env
```env
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/support-tickets?retryWrites=true&w=majority
```

## 6. Seed and run
```powershell
cd backend
npm run seed
npm run dev
```

## Password URL encoding
If your password contains special characters, encode them:
- @ -> %40
- # -> %23
- / -> %2F
