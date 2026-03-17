# RecipeExplorer - Deployment Guide

## Pre-Deployment Checklist

### Testing
```bash
# 1. Run development build
npm run dev

# 2. Test all pages
- []  Home page loads with recipes
- []  Search functionality works
- []  Recipe details page displays correctly
- []  Favorites save/load properly
- []  Theme toggle switches light/dark mode

# 3. Check browser console
- []  No JavaScript errors
- []  No console warnings (CSS only warnings ok)
- []  API calls complete successfully

# 4. Test on multiple browsers
- []  Chrome
- []  Firefox  
- []  Safari
- []  Mobile Chrome
- []  Mobile Safari

# 5. Test responsive design
- []  Desktop (1920x1080)
- []  Tablet (768x1024)
- []  Mobile (375x667)
- []  Zoom in/out works properly
```

### Code Quality
```bash
# Run linter
npm run lint

# Check for console.log statements
grep -r "console\." src/

# Verify no TODO comments left
grep -r "TODO\|FIXME" src/
```

### Performance
```bash
# 1. Run Lighthouse audit in Chrome DevTools
- []  Performance > 90
- []  Accessibility > 85
- []  Best Practices > 85
- []  SEO > 85

# 2. Check bundle size
npm run build
# Check dist/ folder size (should be < 500KB)

# 3. Test API response times
- []  Search response < 2s
- []  Recipe details < 1s
- []  Initial load < 2s
```

## Production Build

### Create Optimized Build
```bash
# Build production version
npm run build

# Output: dist/
# - Minimized JS, CSS
# - Optimized images
# - Source maps
```

### Preview Production Build
```bash
npm run preview

# Test at http://localhost:4173
# Verify all features work in production mode
```

### Build Output Structure
```
dist/
├── index.html           # Entry point
├── assets/
│   ├── index-XXXX.js   # Bundled & minified JS
│   └── index-XXXX.css  # Bundled & minified CSS
└── (static assets if any)
```

## Deployment Options

### Option 1: Vercel (Recommended)
**Best for**: Zero-config deployment, automatic preview links, fast CDN

```bash
# 1. Install Vercel CLI (optional, can use web UI)
npm install -g vercel

# 2. Deploy from project directory
vercel

# 3. Follow prompts:
# - Link to GitHub account
# - Import project
# - Vercel auto-detects Vite
# - Builds and deploys automatically

# Environment
# - No API key needed for TheMealDB (public API)

# Result
# URL: https://your-project-name.vercel.app

# Auto-features
# - HTTPS
# - CDN
# - Preview builds
# - Automatic deploys on push to main
```

### Option 2: Netlify
**Best for**: Easy git integration, serverless functions, good free tier

```bash
# Method 1: Web UI
# 1. Go to netlify.com
# 2. Click "Add new site" → "Import an existing project"
# 3. Connect GitHub
# 4. Select repository
# 5. Netlify detects Vite settings
# 6. Deploy

# Method 2: Netlify CLI
npm install -g netlify-cli
netlify deploy --prod

# Result
# URL: https://your-site-name.netlify.app

# netlify.toml config (optional)
[build]
   command = "npm run build"
   publish = "dist"

[dev]
   command = "npm run dev"
   port = 3000
```

### Option 3: Traditional Hosting (Bluehost, GoDaddy, etc.)
**Best for**: Full control, budget options

```bash
# 1. Build locally
npm run build

# 2. Upload dist/ folder via FTP/SFTP
# - Copy ALL contents of dist/ to public_html/
# - Do NOT copy package.json, src/, etc.

# 3. Server Configuration
# Important: Configure for SPA routing

# .htaccess (for Apache)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# nginx config
location / {
  try_files $uri $uri/ /index.html;
}
```

### Option 4: Docker (Self-hosted)
**Best for**: Full control, enterprise deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t recipe-explorer .
docker run -p 80:80 recipe-explorer
```

### Option 5: GitHub Pages (Free)
**Best for**: Quick free hosting (note: requires custom domain for non-user repos)

```bash
# 1. Update vite.config.js for GitHub Pages
export default {
  base: '/repository-name/', // if not a user/org site
  plugins: [react()],
}

# 2. Build
npm run build

# 3. Push dist to gh-pages branch
# Manual or via GitHub Actions

# Result
# URL: https://username.github.io/repository-name/
```

## Post-Deployment

### Verify Deployment
```bash
# 1. Visit production URL
# 2. Test all pages load
# 3. Check Network tab for 200 responses
# 4. Verify API calls work
# 5. Test theme toggle persists
# 6. Test favorite saves persist
# 7. Test mobile responsiveness
```

### Monitor Performance
```bash
# Use Chrome Lighthouse
DevTools → Lighthouse → Generate Report

# Check Core Web Vitals
# - Largest Contentful Paint: < 2.5s
# - First Input Delay: < 100ms
# - Cumulative Layout Shift: < 0.1
```

### Set Up Analytics (Optional)
```javascript
// Add to src/App.jsx
useEffect(() => {
  // Google Analytics example
  if(window.location.hostname !== 'localhost') {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  }
}, [])
```

### Custom Domain Setup

#### Vercel
```
1. Settings → Domains
2. Add custom domain
3. Update DNS records (CNAME/A)
4. Wait for verification (< 1 hour)
```

#### Netlify
```
1. Settings → Domain management
2. Add custom domain
3. Update DNS records
4. Enable auto-provisioned HTTPS
```

#### Traditional Hosting
```
1. Point domain DNS to hosting account
2. Upload files to public_html/
3. Enable HTTPS (usually auto via cPanel)
4. Update domain in hosting panel
```

## Continuous Deployment

### GitHub Actions (Auto-deploy on push)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Environment Variables

### If Needed (currently none required)
```bash
# .env (for development only)
VITE_API_URL=https://www.themealdb.com/api/json/v1/1

# .env.production
VITE_API_URL=https://www.themealdb.com/api/json/v1/1
```

## Rollback Plan

### If Deployment Fails
```bash
# 1. Check error logs
# 2. Verify npm run build works locally
# 3. Verify all dependencies installed
# 4. Clear deployment cache
# 5. Rebuild and redeploy

# Vercel
- Delete deployment
- Push new changes
- Redeploy

# Netlify
- Switch to previous deploy
- Fix issue
- Redeploy
```

## Performance Optimization (Post-Deploy)

### CDN Configuration
- Ensure dist assets cached for 365 days
- HTML cached for 0 days (always fresh)
- API responses not cached (dynamic)

### Compression
- Enable gzip compression on server
- Brotli compression (if supported)

### Security Headers
```
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Troubleshooting Deployment

### Issue: Routes Not Working
**Cause**: Server not configured for SPA routing
**Solution**: 
- Configure .htaccess / nginx to redirect to index.html
- Or use Vercel/Netlify (auto-configured)

### Issue: Styles Not Loading
**Cause**: Incorrect base path in vite.config.js
**Solution**: Check base path matches deployment URL

### Issue: API Calls Failing
**Cause**: CORS issues with TheMealDB
**Solution**: TheMealDB allows CORS from any origin - should work

### Issue: Large Bundle Size
**Cause**: Dependencies not optimized
**Solution**: 
- Run `npm run build` to see breakdown
- Check for unused packages
- Consider lazy loading routes

### Issue: Slow Performance
**Cause**: Network or server issues
**Solution**:
- Enable compression on server
- Use CDN for static assets
- Optimize images
- Check lighthouse report

## Maintenance Plan

### Regular Tasks
- Monitor error logs
- Check uptime/performance
- Update dependencies monthly
- Review analytics
- Test all features monthly

### Update Process
```bash
# Update dependencies
npm update

# Test locally
npm run dev
npm run build

# Deploy
git push origin main
# (auto-deploy on Vercel/Netlify)
```

## Disaster Recovery

### Backup Strategy
- Git repository = full backup
- Source code on GitHub = redundant
- Deployment platforms = auto-redundancy

### Restore Procedure
```bash
git clone <repo>
cd recipe-explorer
npm install
npm run build
# Deploy dist folder
```

## Security Considerations

### Current Security
- No authentication system
- No backend server required
- TheMealDB API is public
- No sensitive data stored

### If Adding Backend Later
- Use HTTPS only
- Validate all API inputs
- Use environment variables for secrets
- Implement CORS properly
- Add rate limiting
- Use secure cookies

## Success Criteria

✅ Deployment successful when:
- [ ] Site loads at custom domain
- [ ] All pages accessible
- [ ] Search functionality works
- [ ] Favorites persist
- [ ] Theme toggle works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] API calls succeed
- [ ] Performance acceptable

---

## Quick Deploy Commands

```bash
# Vercel (recommended)
npm run build && vercel

# Netlify
npm run build && netlify deploy --prod

# GitHub Pages (if configured)
npm run build && git add dist && git commit && git push

# FTP (traditional)
npm run build
# Upload dist/ via FTP
```

---

**For questions**, refer to README.md or QUICK_REFERENCE.md
