# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/06128e70-92d4-49fe-84cd-e83d7d0c0993

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/06128e70-92d4-49fe-84cd-e83d7d0c0993) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured for automatic deployment to GitHub Pages with custom domain support.

### Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:

- Builds the project when code is pushed to the `main` branch
- Deploys the built assets to GitHub Pages
- Supports custom domain configuration

### Setting up GitHub Pages

1. Go to your repository Settings
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. The deployment will automatically trigger on the next push to `main`

### Custom Domain Setup

The project is pre-configured for the custom domain: `client-portal.pritpalsingh.law`

To use a different custom domain:

1. Update the `public/CNAME` file with your desired domain
2. In your domain provider's DNS settings, create a CNAME record pointing to `jobbyist.github.io`
3. Push the changes to trigger a new deployment

### Manual Deployment with Lovable

You can also deploy manually using [Lovable](https://lovable.dev/projects/06128e70-92d4-49fe-84cd-e83d7d0c0993) by clicking on Share -> Publish.

## Can I connect a custom domain to my GitHub Pages deployment?

Yes! This project is already configured for a custom domain.

### Current Configuration

The project is set up for the domain: `client-portal.pritpalsingh.law`

### To change the custom domain:

1. **Update the CNAME file**: Edit `public/CNAME` with your desired domain
2. **Configure DNS**: In your domain provider's settings, create a CNAME record:
   - Name: `client-portal` (or your subdomain)
   - Value: `jobbyist.github.io`
3. **Deploy**: Push your changes to trigger the GitHub Actions deployment

### For Lovable deployments:

To connect a domain to Lovable deployments, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
