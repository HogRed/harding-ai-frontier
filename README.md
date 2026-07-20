# Harding AI — Neural Frontier

An interactive student-facing guide to Harding University’s Bachelor of
Science in Artificial Intelligence.

**Live site:** [hogred.github.io/harding-ai-frontier](https://hogred.github.io/harding-ai-frontier/)

## What students can explore

- The 124-hour degree and its 71–72-hour major
- Software, artificial intelligence, and mathematics requirements
- Career paths and the degree courses that develop relevant skills
- Example portfolio projects students could build
- Faculty guidance and a link to the official Harding catalog

The Harding University catalog remains the authoritative source for degree
requirements.

## Technology

- React 19
- TypeScript
- vinext
- Vite
- GitHub Actions and GitHub Pages

## Local development

Requirements:

- Node.js 22 or newer
- npm

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validation

Run the production build and automated checks:

```bash
npm test
```

Create the static GitHub Pages bundle locally:

```bash
npm run build:pages
```

The generated static site is written to `pages-dist/`, which is intentionally
excluded from Git.

## Deployment

Pushing to `main` triggers
[the Pages workflow](.github/workflows/pages.yml). It:

1. Installs locked dependencies.
2. Builds the application.
3. Creates a static Pages-compatible bundle.
4. Publishes the bundle to GitHub Pages.

No repository secrets are required for deployment. The workflow uses GitHub’s
short-lived Pages identity token.

## Updating content

- Main interactive content: `app/Explorer.tsx`
- Visual styling and responsive layout: `app/globals.css`
- Site metadata and social sharing: `app/layout.tsx`
- Images: `public/`

When catalog requirements change, update both the displayed totals and the
individual course data, then run `npm test` before publishing.

## Repository privacy

This repository is public. Do not commit:

- `.env` files
- API keys, tokens, or passwords
- private student information
- unpublished institutional documents
- local deployment archives

The portrait, faculty credentials, university email address, and AI Bison
artwork are intentionally included as public website content.
