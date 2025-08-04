# MANA Dashboard - AWS Amplify Deployment Guide

## Pre-Deployment Checklist ✅

- [x] Build compiles successfully (`npm run build`)
- [x] All major components tested
- [x] Router configuration working
- [x] Video assets in public folder
- [x] amplify.yml build spec created
- [x] _redirects file for SPA routing

## Quick Deploy Steps

### Option 1: Connect GitHub Repository (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Amplify deployment"
   git push origin main
   ```

2. **AWS Amplify Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New App" → "Host web app"
   - Select "GitHub" and authorize
   - Choose your repository and branch (main)
   - Amplify will auto-detect React and use our `amplify.yml`

3. **Build Settings** (Auto-detected)
   - Build command: `npm run build`
   - Output directory: `build`
   - Node version: Latest LTS

### Option 2: Manual Deploy

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Go to Amplify Console
   - Choose "Deploy without Git"
   - Drag the `build` folder to upload

## Environment Configuration

### Build Specifications (amplify.yml)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### SPA Routing (_redirects)
```
/*    /index.html   200
```

## Video Assets
- All video files are in `public/` folder
- Videos: no-gloves.mov, pouring-flower.mov, machine-jammed.mov
- Will be accessible at `/video-name.mov` after deployment

## Expected Build Time
- Cold build: ~3-5 minutes
- Cached builds: ~1-2 minutes

## Post-Deployment Testing

1. **Core Features**
   - [ ] Login page loads
   - [ ] Role-based dashboards work
   - [ ] Video evidence playback
   - [ ] Tab navigation
   - [ ] Charts and data display

2. **Router Testing**
   - [ ] Direct URL access works
   - [ ] Browser back/forward
   - [ ] Deep linking to specific dashboards

## Troubleshooting

### Build Fails
- Check Node.js version (use LTS)
- Clear cache: `npm ci`
- Check for missing dependencies

### Videos Don't Load
- Verify files are in `public/` folder
- Check file permissions
- Test with smaller video files first

### Routing Issues
- Ensure `_redirects` file is in `public/`
- Verify React Router configuration
- Check browser console for errors

## Performance Optimization

Current bundle size: ~243 kB (gzipped)
- Consider code splitting for larger apps
- Lazy load dashboard components
- Optimize video file sizes

## Domain & SSL
- Amplify provides automatic HTTPS
- Custom domain can be configured in Amplify Console
- DNS setup required for custom domains

## Monitoring
- Amplify provides built-in analytics
- CloudWatch logs available
- Error tracking and performance metrics

---

**Ready to deploy!** 🚀

Your MANA Dashboard is optimized and ready for AWS Amplify deployment. 