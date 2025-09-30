# ORISON

Official website for ORISON - Neo-Classical Progressive House artist.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Project Structure

```
orison-website/
├── app/                    # Next.js app router pages
├── components/
│   ├── common/            # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer, etc.)
│   └── sections/          # Page sections
├── styles/                # Global styles and CSS modules
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
└── public/
    ├── images/            # Image assets
    ├── fonts/             # Custom fonts
    └── audio/             # Audio files (previews, etc.)
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

This project is configured for deployment on Vercel.
