# Deployment Guide

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

- Repository hosted on GitHub
- GitHub Pages enabled in repository settings
- Custom domain DNS configured (optional)

### Automatic Deployment Process

1. **Trigger**: Any push to the `main` branch
2. **Build**: GitHub Actions installs dependencies and builds the project
3. **Deploy**: Built files are automatically deployed to GitHub Pages
4. **Domain**: Custom domain is configured via the `CNAME` file

### GitHub Actions Workflow

The deployment workflow (`.github/workflows/deploy.yml`) includes:

- Node.js 18 setup
- Dependency installation with npm ci
- Linting (with graceful failure handling)
- Production build with custom domain configuration
- Automatic artifact upload and deployment

### Custom Domain Configuration

#### Current Setup
- **Domain**: `client-portal.pritpalsingh.law`
- **CNAME File**: `public/CNAME`
- **Build Configuration**: Uses absolute paths for assets

#### Changing the Domain

1. **Update CNAME File**:
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **Configure DNS**:
   - Create a CNAME record pointing to `jobbyist.github.io`
   - For apex domains, use A records pointing to GitHub Pages IPs

3. **Verify Setup**:
   - Push changes to trigger deployment
   - Check GitHub repository Settings > Pages for status
   - Verify domain resolution with `dig your-domain.com`

### Build Configuration

The project uses Vite with GitHub Pages-specific configuration:

- **Base Path**: Automatically handles custom domain vs. GitHub Pages paths
- **Asset Handling**: Optimized for static hosting
- **SPA Routing**: Includes 404.html redirect script for client-side routing

### SPA Routing Support

For single-page applications with client-side routing:

1. **404.html**: Redirects unknown routes to index.html with query parameters
2. **Index.html**: Processes redirected routes and updates browser history
3. **React Router**: Handles all client-side navigation

### Troubleshooting

#### Common Issues

1. **404 on Refresh**: Ensure 404.html is present and contains redirect script
2. **Asset Loading Errors**: Check base path configuration in vite.config.ts
3. **Domain Not Resolving**: Verify DNS settings and CNAME file content
4. **Build Failures**: Check GitHub Actions logs for specific errors

#### Debugging Steps

1. Check GitHub Actions workflow logs
2. Verify DNS configuration with online tools
3. Test local build: `npm run build && npm run preview`
4. Validate CNAME file format (single line, no protocols)

### Environment Variables

- `GITHUB_PAGES_CUSTOM_DOMAIN`: Set to "true" in CI to use custom domain base path
- `NODE_ENV`: Automatically set to "production" during build

### Security Considerations

- HTTPS is automatically enabled for GitHub Pages
- Custom domains support automatic SSL certificates
- No server-side processing - static files only

### Performance Optimization

The build includes:
- Asset minification and compression
- Code splitting warnings (consider implementing for large bundles)
- Optimized chunk handling for GitHub Pages

### Monitoring

Monitor deployment status through:
- GitHub Actions workflow status
- GitHub repository Settings > Pages
- Domain health monitoring tools
- Browser developer tools for client-side errors