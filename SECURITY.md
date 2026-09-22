# Security Guidelines

## Environment Variables Setup

This project uses environment variables to store sensitive information such as API keys, database credentials, and JWT secrets. **Never commit these values to version control.**

### Steps to Set Up Secrets:

1. **Copy the example file:**
   ```bash
   cp Backend/.env.example Backend/.env
   ```

2. **Fill in your actual secrets in the `.env` file:**
   - `MONGO_CONN`: Your MongoDB connection string
   - `REGION`: AWS region (e.g., us-east-1)
   - `ACCESS_KEY`: AWS Access Key ID
   - `ACCESS_SECRET`: AWS Secret Access Key
   - `BUCKET_NAME`: Your S3 bucket name
   - `JWT_SECRET_KEY`: A strong random secret for JWT signing
   - `PORT`: Server port

3. **Ensure `.env` is in `.gitignore`:**
   - The `.gitignore` file already includes `.env` to prevent accidental commits

### Security Best Practices:

✅ **Do:**
- Use strong, random values for JWT_SECRET_KEY (at least 32 characters)
- Rotate AWS access keys regularly
- Use IAM roles in production instead of access keys when possible
- Use different keys for development and production
- Enable MFA for AWS root account
- Regularly audit and monitor AWS S3 bucket access

❌ **Don't:**
- Commit `.env` files to version control
- Share secrets in messages, emails, or documentation
- Use the same secrets across environments
- Hardcode secrets in the source code
- Log sensitive information

### Production Deployment:

When deploying to production services (Render, Heroku, AWS, etc.):
1. Use the platform's built-in secrets management
2. Set environment variables directly in the platform's dashboard
3. Never paste `.env` file contents
4. Rotate secrets after deployment
5. Enable secret scanning in your repository

### Secret Scanning:

1. Enable GitHub's secret scanning:
   - Go to Settings → Security & analysis
   - Enable "Secret scanning"
   - Enable "Push protection" to prevent commits with secrets

2. If you accidentally committed secrets:
   ```bash
   # Remove file from history
   git filter-branch --tree-filter 'rm -f .env' HEAD
   # Force push (use with caution)
   git push origin master --force
   # Rotate all exposed secrets immediately
   ```

### Accessing Secrets in Code:

All secrets are accessed via `process.env`:
```javascript
const jwtSecret = process.env.JWT_SECRET_KEY;
const s3Config = {
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET,
  region: process.env.REGION
};
```

This ensures secrets are read from environment variables, not hardcoded values.
