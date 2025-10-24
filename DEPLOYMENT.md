# Deployment Guide - Moon Company Organizational Chart

## Repository Status
✅ Git repository initialized
✅ All files committed
✅ Ready to push to GitHub

## Steps to Deploy on GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Enter repository details:
   - **Repository name**: `moon-company-org-chart` (or your preferred name)
   - **Description**: "Interactive organizational chart for Moon Company with 280+ employees across 24 departments"
   - **Visibility**: Choose **Public** (required for free GitHub Pages) or **Private** (requires GitHub Pro for Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
5. Click **"Create repository"**

### Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/moon-company-org-chart.git

# Rename branch to main (if needed)
git branch -M main

# Push code to GitHub
git push -u origin main
```

**Or use SSH** (if you have SSH keys set up):
```bash
git remote add origin git@github.com:YOUR_USERNAME/moon-company-org-chart.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Select **"Deploy from a branch"**
   - Branch: Select **"main"** (or **"master"**)
   - Folder: Select **"/ (root)"**
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR_USERNAME.github.io/moon-company-org-chart/`

### Step 4: Access Your Deployed Site

Once deployed, you can access your organizational chart at:
```
https://YOUR_USERNAME.github.io/moon-company-org-chart/
```

## Quick Command Reference

### To push future updates:
```bash
git add .
git commit -m "Your update message"
git push
```

### To check remote repository:
```bash
git remote -v
```

### To view commit history:
```bash
git log --oneline
```

## Project Structure

```
moon-company-org-chart/
├── index.html              # Main HTML file
├── styles.css              # Styling and layout
├── script.js               # Interactive functionality
├── org-data.js            # Data structure template
├── data-input-helper.html # Helper tool for data entry
├── README.md              # Project documentation
└── DEPLOYMENT.md          # This deployment guide
```

## Features Deployed

- ✅ 280+ employees across 24 departments
- ✅ 3-tier hierarchy visualization (Senior/Mid/Junior)
- ✅ Three view modes: Senior Management, Department View, Full Hierarchy
- ✅ Scrollable lists for large departments (KPO: 94 members)
- ✅ Interactive modals with employee details
- ✅ Department filtering by senior manager
- ✅ Responsive design for all devices
- ✅ Custom styled scrollbars
- ✅ Color-coded by manager

## Troubleshooting

### If pages don't deploy:
1. Check that the repository is public (or you have GitHub Pro)
2. Ensure `index.html` is in the root directory
3. Wait 2-3 minutes after enabling Pages
4. Check the "Pages" settings for deployment status
5. Clear browser cache if you see old content

### If styles don't load:
1. Ensure all CSS/JS files are in the same directory as `index.html`
2. Check browser console for errors (F12)
3. Verify file paths are relative (not absolute)

## Custom Domain (Optional)

To use a custom domain:
1. Go to repository Settings → Pages
2. Enter your custom domain under "Custom domain"
3. Add DNS records at your domain provider:
   - Type: `CNAME`
   - Name: `www` (or subdomain)
   - Value: `YOUR_USERNAME.github.io`
4. Wait for DNS propagation (up to 48 hours)

## Repository Privacy

- **Public Repository**: Free GitHub Pages deployment
- **Private Repository**: Requires GitHub Pro/Team/Enterprise for Pages

## Support

For issues with:
- **Code/Features**: Check README.md or modify code locally
- **GitHub Pages**: Visit [GitHub Pages Documentation](https://docs.github.com/en/pages)
- **Git Commands**: Visit [Git Documentation](https://git-scm.com/doc)

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
