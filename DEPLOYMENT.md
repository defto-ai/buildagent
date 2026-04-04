# Deployment Guide

## Deploy to Cloudflare Pages

### Prerequisites
- Cloudflare account
- GitHub repository pushed to defto-ai/buildagent
- Domain buildagent.dev registered

### Steps

#### 1. Connect GitHub Repository
1. Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your GitHub account
4. Select `defto-ai/buildagent` repository

#### 2. Configure Build Settings
- **Framework preset**: Docusaurus
- **Build command**: `cd website && npm install && npm run build`
- **Build output directory**: `website/build`
- **Root directory**: `/`
- **Node version**: 18 or higher

#### 3. Deploy
Click "Save and Deploy". Cloudflare will:
- Install dependencies
- Build the site
- Deploy to `*.pages.dev`

#### 4. Add Custom Domain
1. Go to your project settings
2. Click "Custom domains"
3. Add `buildagent.dev`
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning (usually < 5 minutes)

### Build Locally

```bash
cd website
npm install
npm run build
npm run serve  # Preview production build
```

### Troubleshooting

**Build fails with "Cannot read properties of undefined"**
- Check that all markdown files have proper frontmatter with `id` and `title`
- Verify category configs exist in subdirectories

**Broken links warning**
- Set `onBrokenLinks: 'warn'` in docusaurus.config.ts
- Create placeholder pages for missing links

**Domain not working**
- Verify DNS records are correct
- Wait up to 24 hours for DNS propagation
- Check SSL certificate status in Cloudflare dashboard
