# IHRACHANE — Global Supply Chain, Product Sourcing & Logistics Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.10-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208.17-green)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06b6d4)](https://tailwindcss.com/)

IHRACHANE is a full-stack supply-chain management platform that connects global buyers with verified manufacturers. It covers the complete procurement pipeline — factory sourcing, supplier verification & audit, quality inspection, China warehousing & consolidation, and international freight — with a bilingual (English / Turkish) public website and a feature-rich admin dashboard (CMS).

> 🌐 **Live website:** [https://www.ihrachane.com/](https://www.ihrachane.com/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Route Map](#route-map)
- [Database Models](#database-models)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [SEO & Caching](#seo--caching)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The platform has two major surfaces:

1. **Public website** — marketing site with a homepage (hero, features, service cards, supply-chain process, testimonials, partners, clients, contact form), dynamically managed **category & sub-category pages**, bilingual **static service landing pages** (`/services/*` + `/tr/*`), a **blog**, a **shipping-partners** page, and legal pages (About Us, Privacy Policy).
2. **Admin dashboard** (`/dashboard`) — role-protected CMS where admins manage the homepage sections, blog posts, categories / sub-categories / sub-services, clients, partners, testimonials, shipping-partners page, company details & social links, contact messages, sourcing requests, users, and analytics.

All public content is stored in MongoDB and rendered with Next.js **static generation + tag-based revalidation**, so content changes made in the dashboard are reflected on the public site almost immediately.

---

## Features

### 🌍 Public Website

- SEO-optimized, responsive homepage with a custom hero, service cards, supply-chain process, testimonials carousel, partner & client marquees, and a contact form.
- **Dynamic category & sub-category pages** — every category/sub-category gets its own URL slug (`/[category]`, `/[category]/[subcategory]`), banner, description, sub-services, bilingual FAQ and keyword sections.
- **Static service landing pages** with English + Turkish variants (`/services/sourcing`, `/services/quality-inspection`, `/services/china-to-turkey-freight` and `/tr/*`).
- **Blog** — published articles with category filters, tags, cover images, reading time, SEO/meta fields and view counts.
- **Shipping partners page**, **About Us** and **Privacy Policy** pages.
- Bilingual **EN/TR** content strategy with `hreflang` alternates and Turkish keyword sections.

### 🔐 Authentication

- Registration with **email OTP verification** (Nodemailer + bcrypt-hashed OTP tokens).
- Login via **NextAuth.js (Credentials provider, JWT strategy)** — restricted to `admin` / `super_admin` roles.
- Forgot / reset password with OTP and resend flows.
- Route protection via `src/middleware.js` (unauthenticated / non-admin users are redirected to `/login`).

### 🛠 Admin Dashboard (`/dashboard`)

- **Dashboard summary** — live counters (users, clients, partners, services, categories, sub-categories, testimonials, sourcing requests, contact messages), request-status breakdown, recent requests/messages and a 6-month chart (Recharts).
- **Blog management** — create / edit / delete posts, draft or publish, Cloudinary cover-image upload, SEO fields with a live Google search snippet preview.
- **Home page sections** — hero, services, clients, partners, testimonials.
- **Dynamic pages manager** — categories, sub-categories and sub-category services (full CRUD with banners & SEO copy).
- **Shipping partner page** — hero section + partner list.
- **About page** — company details & social links.
- **Contact page** — contact messages and sourcing requests (with status updates).
- **User management** — list users, change roles, delete users, change passwords.

### ⚙️ Backend & SEO

- MongoDB REST API via Next.js **Route Handlers**, grouped by domain.
- `sitemap.xml`, `robots.txt`, dynamic **OG image** generation (`/opengraph-image`, Edge runtime) and **JSON-LD** structured data (Organization, WebSite, Service, BreadcrumbList, FAQPage, BlogPosting, CollectionPage).
- **Google Analytics 4** integration.
- Tag-based **ISR caching** (`unstable_cache` + `revalidateTag` / `revalidatePath`) with automatic cache invalidation after every dashboard mutation, Google sitemap pings and public-route warm-up.

---

## Tech Stack

### Frontend

| Technology | Purpose |
| --- | --- |
| Next.js 15.4.10 (App Router, Turbopack) | Framework — SSR / ISR / SSG |
| React 19.1.0 | UI library |
| TailwindCSS 4 | Styling & design system |
| Recharts 3.2 | Dashboard charts |
| React Icons 5.5 | Icon set |
| React Hot Toast 2.6 | Notifications |

### Backend

| Technology | Purpose |
| --- | --- |
| Next.js Route Handlers | REST API |
| MongoDB + Mongoose 8.17 | Database / ODM (DB name: `ihrfaset`) |
| NextAuth.js 4.24.11 (JWT) | Authentication |
| bcryptjs 3.0 | Password & OTP hashing |
| Nodemailer 6.10 | Transactional email (OTP, reset links) |
| Cloudinary 2.7 + next-cloudinary | Image storage & uploads |
| Axios | HTTP client |

---

## Project Structure

```
.
├── public/                      # Static assets (logos, partner & banner images)
└── src/
    ├── app/
    │   ├── (auth)/              # login, register, otp-verification, reset-password
    │   ├── (legal)/             # about-us, privacy
    │   ├── (protectedRoutes)/   # /dashboard/** (admin CMS)
    │   ├── (public)/            # home, [category], [category]/[subcategory],
    │   │                        # blog, services/[service], tr/[service],
    │   │                        # shipping-partners
    │   ├── api/                 # Route handlers grouped by domain
    │   ├── layout.js            # Root layout (fonts, GA, providers, JSON-LD)
    │   ├── sitemap.js           # Dynamic XML sitemap
    │   ├── robots.js            # robots.txt
    │   ├── opengraph-image.js   # Dynamic OG image (Edge runtime)
    │   └── globals.css          # Tailwind + site-* design-system utilities
    ├── components/              # Home, dashboard, shared, sourcing, seo, error,
    │                            # loading, not-found, analytics
    ├── constants/               # Per-entity form/table constants
    ├── lib/
    │   ├── data/                # Cached data accessors (public-data, blog-data)
    │   ├── seo/                 # seo-utils, jsonld generators, service-pages
    │   ├── authOptions.js       # NextAuth configuration
    │   ├── mongodb.js           # Mongoose connection
    │   ├── nodemailer.js        # SMTP transport
    │   ├── cloudinary.js        # Cloudinary config
    │   ├── slug.js              # Slugify + diacritics removal
    │   ├── cache-tags.js        # Revalidation cache tags
    │   └── revalidate-*.js      # Cache invalidation helpers
    ├── models/                  # Mongoose models
    ├── providers/               # AppProvider (SessionProvider)
    ├── utils/                   # Email templates, uploads, auth helpers, menu
    └── middleware.js            # Auth guard + /home/* → /* 301 redirect
```

---

## Route Map

### Public routes

| Route | Description |
| --- | --- |
| `/` | Homepage (hero, services, testimonials, partners, clients, contact) |
| `/[category]` | Dynamic category page |
| `/[category]/[subcategory]` | Dynamic sub-category page |
| `/services/[service]` | Static service landing page (EN) |
| `/tr`, `/tr/[service]` | Turkish service pages |
| `/blog`, `/blog/[slug]` | Blog listing & article |
| `/shipping-partners` | Shipping / freight partner page |
| `/about-us`, `/privacy` | Legal pages |

### Auth routes

| Route | Description |
| --- | --- |
| `/login` | Sign in (admin / super_admin only) |
| `/register` | Create account |
| `/otp-verification` | Email OTP verification |
| `/reset-password` | Forgot / reset password |

### Dashboard routes (protected)

| Route | Description |
| --- | --- |
| `/dashboard` | Analytics summary |
| `/dashboard/home` | Homepage hero editor |
| `/dashboard/services` | Services section |
| `/dashboard/client` | Clients CRUD |
| `/dashboard/partner` | Partners CRUD |
| `/dashboard/testimonial` | Testimonials CRUD |
| `/dashboard/blog` · `/dashboard/blog/create` · `/dashboard/blog/edit/[id]` | Blog management |
| `/dashboard/categories/list` · `/sub-list` · `/service` | Category / sub-category / service pages manager |
| `/dashboard/public/shipping-partners` | Shipping-partners page hero |
| `/dashboard/about/details` · `/dashboard/about/social-links` | Company details & social links |
| `/dashboard/contact` · `/dashboard/sourcing-request` | Contact messages & sourcing requests |
| `/dashboard/users` | User management |
| `/dashboard/profile` · `/dashboard/profilesettings` | Profile settings |

### API routes (Route Handlers)

| Group | Endpoints |
| --- | --- |
| `(auth)` | `/api/auth/register`, `verify-otp`, `verify-otp/resend`, `reset-password`, `reset-password/confirm`, `reset-password/resend-otp`, `[...nextauth]` |
| `(blog)` | `/api/blog` (CRUD), `/api/blog/upload` |
| `(categories)` | `/api/categories` (CRUD), `categoriesName`, `by-name/[name]`, `/api/sub-categories` (CRUD), `backfill-slugs`, `/api/sub-categories/services` (CRUD) |
| `(clients)` | `/api/clients` (CRUD) |
| `(contacts)` | `/api/contacts/messages` (CRUD), `/api/contacts/sourcing-requests` (CRUD + `update-status/[id]`) |
| `(partners)` | `/api/partners` (CRUD) |
| `(services)` | `/api/services` (CRUD) |
| `(testimonials)` | `/api/testimonials` (CRUD) |
| `(users)` | `/api/users` (CRUD, `change-password/[id]`, `update-role/[id]`) |
| `(aboutCompany)` | `/api/company/details`, `/api/company/social-links` (CRUD) |
| `home` | `/api/home/hero`, `/api/home/hero/create` |
| `summary` | `/api/summary/statistics` |

---

## Database Models

All Mongoose models live in `src/models/`. The application connects to the `ihrfaset` database.

| Model | Purpose |
| --- | --- |
| `User` | Auth users with roles (`user`, `admin`, `super_admin`), OTP & reset tokens |
| `Service` | Homepage service entries |
| `Category` | Dynamic category pages (auto slug, banner, SEO copy) |
| `SubCategory` | Sub-category pages linked to a category |
| `SubCategoryService` | Individual services listed under a sub-category |
| `Client` | Client logos shown on the homepage |
| `Partner` | Shipping / logistics partners |
| `Testimonial` | Customer testimonials |
| `CompanyDetails` | Address, phone, email, WhatsApp |
| `SocialLink` | Social media links (footer) |
| `ContactForm` | Contact form submissions |
| `SourcingRequestForm` | Sourcing requests (product requirements + status) |
| `BlogPost` | Blog articles (slug, excerpt, content, cover, SEO, status, views) |
| `HomeHero` | Homepage hero section content |

---

## Environment Variables

Create a `.env` file in the project root (`.env` is git-ignored). All variables are required unless marked optional.

```env
# 1. MongoDB Database
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<database>

# 2. Email Service (SMTP — Gmail works out of the box)
SMTP_GMAIL_USER=your@gmail.com
SMTP_GMAIL_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# 3. Security & Authentication
NEXT_AUTH_SECRET=your-nextauth-secret
HASH_SALT_ROUND=10

# 4. App URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000   # used in email verification/reset links
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # used for SEO canonical URLs & sitemap
NEXTAUTH_URL=http://localhost:3000

# 5. Cloudinary (image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME=your-unsigned-upload-preset
```

> 💡 `NEXT_PUBLIC_SITE_URL` is optional — when not set, it falls back to `https://www.ihrachane.com` (see `src/lib/seo/seo-utils.js`).

---

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (Next.js 15 requirement)
- **npm** (or yarn / pnpm)
- A **MongoDB** database (local or MongoDB Atlas)
- (Optional) A **Cloudinary** account and an **SMTP** account for image uploads and transactional email

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd ihrachane

# 2. Install dependencies
npm install

# 3. Create the environment file and fill in the values (see above)
#    A .env.example is not committed to the repo — copy the block above.
cp .env.example .env   # or create .env manually

# 4. Run the development server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> ℹ️ New users are created with the `user` role by default. To access the dashboard, promote a user to `admin` / `super_admin` in MongoDB, or via `/dashboard/users` once an admin account already exists.

### Production build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint (next/core-web-vitals) |

---

## SEO & Caching

- **Rendering** — public pages use static generation (`generateStaticParams`) with ISR revalidation windows of 3600s – 86400s per page.
- **Cache tags** — every public data accessor in `src/lib/data/*` is wrapped in `unstable_cache` with granular tags (`categories`, `sub-categories`, `testimonials`, `partners`, `clients`, `services`, `home-hero`, `company-details`, `social-links`, `blog-posts`, …).
- **Automatic invalidation** — all mutating API routes call `revalidateTag` / `revalidatePath` (helpers in `src/lib/revalidate-public.js`), ping Google's sitemap endpoint, and optionally warm up the affected public routes after content changes.
- **Structured data** — JSON-LD generators in `src/lib/seo/jsonld.js` (Organization, WebSite, Service, BreadcrumbList, FAQPage, BlogPosting, CollectionPage).
- **Redirects** — `src/middleware.js` issues a 301 for legacy `/home/*` URLs → `/*`, guards `/dashboard`, and redirects logged-in users away from `/login`, `/register` and `/reset-password`.
- **Analytics** — GA4 tag via `src/components/analytics/GoogleAnalytics.jsx` and the root layout.
- **Internationalization** — English + Turkish service pages with `hreflang` alternates and bilingual keyword sections.

---

## Deployment

The app is a standard Next.js application and can be deployed to **Vercel** (recommended), Netlify, or any Node.js-capable host:

1. Push the repository to your Git host and import it into the platform.
2. Add all environment variables listed above in the project settings (they are required for MongoDB, NextAuth, SMTP email verification, Cloudinary uploads, and SEO canonical URLs).
3. Deploy.

For email verification to work in production, make sure `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_SITE_URL` point to your production domain.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add some amazing feature'`.
4. Push the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.