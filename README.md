# The Secret Dining Club

An invitation-only dining society, in web form. There's no menu page and no
address book — every visit to the invitation screen draws a different secret
table: a random venue, dress code, arrival window, and tasting menu from an
anonymous chef.

Built with **React + Vite + Tailwind CSS**, animated with **Framer Motion**,
icons from **lucide-react**.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

This repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and publishes automatically on every push to `main`.

1. Create a GitHub repo named `secret-dining-club` (or update `base` in
   `vite.config.js` and `homepage` in `package.json` to match your repo name).
2. Push this project to that repo's `main` branch.
3. In the repo settings, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
4. Push again (or re-run the workflow) — your site will be live at
   `https://<your-username>.github.io/secret-dining-club/`.

### Manual deploy (alternative)

You can also deploy with the `gh-pages` package instead of Actions:

```bash
npm run deploy
```

This builds the site and pushes `dist/` to the `gh-pages` branch. Make sure
`homepage` in `package.json` and `base` in `vite.config.js` match your
repository name first, and that Pages is set to serve from the `gh-pages`
branch in your repo settings.

## Project structure

```
src/
  components/
    EmberField.jsx      ambient ember particle canvas
    WaxSealButton.jsx    the home page's "crack the seal" CTA
    DecryptText.jsx      decrypting text effect for the secret coordinates
  data/
    invitations.js       the pool of random dinners
  pages/
    Home.jsx             landing page
    Invitation.jsx        the invitation reveal
  App.jsx                 routing + page transitions
```
