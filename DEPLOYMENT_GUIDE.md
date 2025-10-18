# Vercel Deployment Guide for Antariksh Backend

## Prerequisites
1. Vercel account (free tier available)
2. MongoDB Atlas account
3. Cloudinary account
4. Gmail account with App Passwords

## Environment Variables Setup

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here
EMAIL_USER_1=your-email1@gmail.com
EMAIL_PASS_1=your-app-password-1
EMAIL_USER_2=your-email2@gmail.com
EMAIL_PASS_2=your-app-password-2
EMAIL_USER_3=your-email3@gmail.com
EMAIL_PASS_3=your-app-password-3
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=production
```

## Deployment Steps

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### Method 2: GitHub Integration
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push

## Important Notes

### CORS Configuration
Update the CORS origins in `api/index.js` to include your frontend domains:
```javascript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://your-frontend-domain.vercel.app', 'https://your-custom-domain.com'] 
  : true
```

### File Upload
- Files are now processed in memory (no disk storage)
- Maximum file size: 10MB
- Only PDF files are allowed
- Files are uploaded directly to Cloudinary

### Database Connection
- Optimized for serverless with connection pooling
- Automatic reconnection handling
- Connection caching for better performance

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/resendOtp` - Resend OTP

### Contact
- `POST /api/services/contact` - Submit contact form

### Health Check
- `GET /` - Root endpoint
- `GET /api/health` - Health check

## Troubleshooting

### Common Issues:
1. **MongoDB Connection**: Ensure MONGO_URI is correct and includes database name
2. **Email Issues**: Verify Gmail App Passwords are correct
3. **CORS Errors**: Update CORS origins for your frontend domain
4. **File Upload**: Ensure Cloudinary credentials are set

### Logs:
Check Vercel function logs in the dashboard for debugging.

## Performance Optimizations
- Connection pooling for MongoDB
- Memory-based file processing
- Optimized serverless configuration
- Binary file support for images and PDFs
