# Deployment Guide

## GitHub Pages Deployment

This project is configured to be deployed to GitHub Pages using GitHub Actions.

### Prerequisites

1.  A GitHub repository.
2.  Node.js installed locally.

### Configuration

1.  **Update `vite.config.ts`**:
    If you are deploying to `https://<USERNAME>.github.io/<REPO>/`, you need to set the `base` in `vite.config.ts`.
    
    ```typescript
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vite.dev/config/
    export default defineConfig({
      plugins: [react()],
      base: '/your-repo-name/', // <--- UPDATE THIS
    })
    ```
    
    If you are deploying to a custom domain or `https://<USERNAME>.github.io/` (root), you can leave it as `/` or remove the line.

2.  **Push to GitHub**:
    Initialize git and push your code.
    
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/username/repo.git
    git push -u origin main
    ```

3.  **Enable GitHub Pages**:
    - Go to your repository **Settings**.
    - Navigate to **Pages**.
    - Under **Build and deployment**, select **GitHub Actions** as the source.
    - GitHub will automatically detect the workflow file (created below) or you can choose "Static HTML" if you build locally.
    - **Recommended**: Use the provided workflow file `.github/workflows/deploy.yml`.

### GitHub Actions Workflow

A workflow file has been created at `.github/workflows/deploy.yml`. This will automatically build and deploy your site whenever you push to the `main` branch.

### Manual Deployment (Optional)

If you prefer to deploy manually using the `gh-pages` package:

1.  `npm install gh-pages --save-dev`
2.  Add script to `package.json`: `"deploy": "gh-pages -d dist"`
3.  Run `npm run build`
4.  Run `npm run deploy`
