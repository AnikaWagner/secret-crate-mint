# Vercel Deployment Guide for Secret Crate Mint

This guide provides step-by-step instructions for deploying the Secret Crate Mint application to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Environment variables ready

## Step 1: Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Find and select `AnikaWagner/secret-crate-mint`
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `secret-crate-mint` (or your preferred name)
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Step 2: Environment Variables Configuration

Before deploying, configure the following environment variables in Vercel:

### Required Environment Variables

1. **Chain Configuration**
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   ```

2. **Wallet Connect Configuration**
   ```
   VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   ```

3. **Infura Configuration (Optional)**
   ```
   VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   VITE_RPC_URL=https://1rpc.io/sepolia
   ```

4. **Contract Configuration**
   ```
   VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
   ```

### How to Add Environment Variables in Vercel

1. In your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter the variable name and value
5. Select environment (Production, Preview, Development)
6. Click **Save**

## Step 3: Build Configuration

### Vercel Configuration File

Create a `vercel.json` file in the project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Package.json Scripts

Ensure your `package.json` has the correct build scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

## Step 4: Deploy

1. **Automatic Deployment**
   - Push changes to the main branch
   - Vercel will automatically trigger a deployment
   - Monitor the deployment in the Vercel dashboard

2. **Manual Deployment**
   - In Vercel dashboard, go to **Deployments**
   - Click **Redeploy** on the latest deployment
   - Or trigger a new deployment from the **Git** tab

## Step 5: Domain Configuration

### Custom Domain (Optional)

1. **Add Domain**
   - Go to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS is enabled by default

## Step 6: Post-Deployment Verification

### Checklist

- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] Environment variables are properly set
- [ ] Build process completes successfully
- [ ] All routes are accessible
- [ ] HTTPS is enabled
- [ ] Performance is acceptable

### Testing

1. **Local Testing**
   ```bash
   npm run build
   npm run preview
   ```

2. **Production Testing**
   - Test wallet connection
   - Verify contract interactions
   - Check responsive design
   - Test all user flows

## Step 7: Monitoring and Maintenance

### Vercel Analytics

1. **Enable Analytics**
   - Go to **Analytics** tab in Vercel dashboard
   - Enable Web Analytics
   - Monitor performance metrics

2. **Error Tracking**
   - Monitor deployment logs
   - Set up error notifications
   - Track user interactions

### Updates and Maintenance

1. **Automatic Deployments**
   - Push to main branch triggers deployment
   - Preview deployments for pull requests
   - Rollback capability if needed

2. **Environment Updates**
   - Update environment variables as needed
   - Redeploy after environment changes
   - Test in preview environment first

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Verify all dependencies are in package.json
   - Ensure build command is correct

2. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match exactly
   - Ensure variables are available in correct environment

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL configuration
   - Ensure contract address is correct

4. **Performance Issues**
   - Enable Vercel Analytics
   - Optimize images and assets
   - Use Vercel's Edge Functions if needed

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **RainbowKit Documentation**: [rainbowkit.com](https://rainbowkit.com)

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive data to repository
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **HTTPS**
   - Vercel provides automatic HTTPS
   - Ensure all external resources use HTTPS
   - Configure proper CORS headers

3. **Smart Contract Security**
   - Audit contract code before mainnet deployment
   - Use testnet for development and testing
   - Implement proper access controls

## Cost Optimization

1. **Vercel Free Tier**
   - 100GB bandwidth per month
   - Unlimited static deployments
   - Automatic HTTPS

2. **Upgrade Considerations**
   - Pro plan for custom domains
   - Team plan for collaboration
   - Enterprise for advanced features

## Deployment URLs

After successful deployment, your application will be available at:

- **Production**: `https://secret-crate-mint.vercel.app`
- **Preview**: `https://secret-crate-mint-git-[branch].vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## Next Steps

1. **Smart Contract Deployment**
   - Deploy contract to Sepolia testnet
   - Update contract address in environment variables
   - Test contract interactions

2. **Mainnet Preparation**
   - Audit smart contract
   - Prepare mainnet deployment
   - Update environment variables for mainnet

3. **Marketing and Launch**
   - Prepare marketing materials
   - Set up social media presence
   - Plan launch strategy

---

**Note**: This deployment guide assumes you're using the Sepolia testnet. For mainnet deployment, update the chain ID and RPC URLs accordingly.
