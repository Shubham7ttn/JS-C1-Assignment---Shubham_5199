# Local MongoDB Setup

## Windows

1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with **Install MongoDB as a Service** enabled.
3. Start MongoDB:

```powershell
net start MongoDB
```

4. Configure `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/support-tickets
```

5. Seed and run:

```powershell
cd backend
npm run seed
npm run dev
```

## Verify MongoDB is running

```powershell
mongosh mongodb://127.0.0.1:27017/support-tickets
```

## Troubleshooting

- **ECONNREFUSED**: MongoDB service is not started. Run `net start MongoDB`.
- **IPv6 issues**: Use `127.0.0.1` instead of `localhost` in MONGODB_URI.
