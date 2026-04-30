# Lawrence Portfolio

## Run locally

```bash
npm install
npm run dev
```

## No-backend publish workflow (Local + Vercel)

This project uses a static content file for deployed data:

- `public/portfolio-content.json`

### How updates work

- **Save Changes** in Admin = saves to your current browser/device only (`localStorage`)
- **Export JSON** in Admin = downloads `portfolio-content.json`
- To publish for all devices:
1. Replace `public/portfolio-content.json` in this repo with the exported file
2. Commit and push
3. Let Vercel redeploy

After redeploy, every device sees the updated content.

## Important limitation

Without a backend/database, content edited on the live site cannot auto-sync globally in real time. Global updates happen only after you publish a new deployment.
