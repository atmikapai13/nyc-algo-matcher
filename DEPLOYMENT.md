# Deployment Guide

This guide covers deploying the NYC Algo Matcher app to Vercel and GitHub Pages.

## 🚀 Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and best option for Next.js apps, especially since this app uses API routes.

### Steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/nyc-algo-matcher.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - **Important**: Set the "Root Directory" to `my-app` (since your Next.js app is in the `my-app` folder)
   - Click "Deploy"
   - Vercel will automatically detect Next.js and deploy

3. **Environment Variables** (if needed):
   - If you add any environment variables later, add them in Vercel dashboard under Project Settings → Environment Variables

4. **Custom Domain** (optional):
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain

### Automatic Deployments:
- Every push to `main` branch = production deployment
- Every pull request = preview deployment

---

## 📄 Option 2: Deploy to GitHub Pages

**Note**: GitHub Pages only serves static files. Since your app has API routes (`/api/news`), you'll need to either:
- Remove the API route functionality, OR
- Use a workaround (see below)

### Option 2A: Static Export (No API Routes)

1. **Update `next.config.mjs`**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true
     }
   };
   
   export default nextConfig;
   ```

2. **Remove or modify API route** - You'll need to handle the news fetching differently (e.g., client-side only with CORS proxy)

3. **Add GitHub Pages deployment script** to `package.json`:
   ```json
   "scripts": {
     "export": "next build"
   }
   ```

4. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: cd my-app && npm install
         - run: cd my-app && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./my-app/out
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: GitHub Actions
   - Your site will be at: `https://YOUR_USERNAME.github.io/nyc-algo-matcher/`

### Option 2B: Keep API Routes (Advanced)

You can use Vercel for API routes and GitHub Pages for static content, but this is complex and not recommended.

---

## 🔧 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All environment variables are documented
- [ ] API routes work correctly
- [ ] Images are optimized
- [ ] No hardcoded localhost URLs
- [ ] Test the build locally: `cd my-app && npm run build`
- [ ] Check for any console errors

---

## 📝 Quick Commands

```bash
# Test build locally
cd my-app
npm run build
npm start

# Push to GitHub
git add .
git commit -m "Your message"
git push
```

---

## 🆘 Troubleshooting

### Vercel Issues:
- **Build fails**: Check build logs in Vercel dashboard
- **API routes not working**: Ensure Root Directory is set to `my-app`
- **Images not loading**: Check image paths are relative

### GitHub Pages Issues:
- **404 errors**: Check basePath in next.config.mjs if using custom domain
- **API routes fail**: GitHub Pages doesn't support server-side features

---

## 💡 Recommendation

**Use Vercel** - It's free, easy, and perfect for Next.js apps with API routes!

