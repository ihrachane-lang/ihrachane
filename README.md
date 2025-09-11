# IHR Achane - Supply Chain Management Platform

## Overview

IHR Achane is a comprehensive supply chain management platform designed to connect businesses with suppliers and streamline the sourcing process. The platform offers various services related to supply chain management, client management, and business operations.

Live Website: [https://www.ihrachane.com/](https://www.ihrachane.com/)

## Technology Stack

### Frontend
- **Framework**: Next.js 15.4.7
- **UI Library**: React 19.1.0
- **Styling**: TailwindCSS 4
- **Charts**: Recharts 3.2.0
- **Icons**: React Icons 5.5.0
- **Notifications**: React Hot Toast 2.6.0

### Backend
- **Server**: Next.js API Routes
- **Database**: MongoDB with Mongoose 8.17.2
- **Authentication**: NextAuth.js 4.24.11
- **Password Encryption**: bcryptjs 3.0.2
- **Email Service**: Nodemailer 6.10.1
- **File Storage**: Cloudinary 2.7.0

## Project Structure

### Main Directories

```
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (legal)/          # Legal pages
│   │   ├── (protectedRoutes)/ # Protected dashboard routes
│   │   ├── (public)/         # Public facing pages
│   │   └── api/              # API routes
│   ├── components/           # React components
│   │   ├── Home/             # Home page components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── shared/           # Shared components
│   │   └── sourcing/         # Sourcing related components
│   ├── constants/            # Application constants
│   ├── lib/                  # Library functions
│   ├── models/               # MongoDB models
│   ├── providers/            # React context providers
│   └── utils/                # Utility functions
└── public/                   # Static assets
```

## Features

### Authentication
- User registration with email verification
- Login with email and password
- Password reset functionality
- Role-based access control (user, admin, super_admin)

### Dashboard
- Admin dashboard for managing content
- User dashboard for tracking sourcing requests
- Analytics and summary statistics

### Content Management
- Services management
- Categories and subcategories
- Client management
- Partner management
- Testimonial management
- Company details management

### Sourcing
- Sourcing request submission
- Request tracking
- Supplier management

## Database Models

- **User**: Authentication and user management
- **Service**: Services offered by the platform
- **Category/SubCategory**: Product categories and subcategories
- **Client**: Client information
- **Partner**: Partner information
- **Testimonial**: Customer testimonials
- **CompanyDetails**: Company contact information
- **ContactForm**: Contact form submissions
- **SourcingRequestForm**: Sourcing request submissions

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your-mongodb-connection-string

SMTP_GMAIL_USER=your-smtp-gmail-user
SMTP_GMAIL_PASS=your-smtp-app-password

NEXT_AUTH_SECRET=your-auth-secret

NEXT_PUBLIC_BASE_URL=your-application-base-url

NEXTAUTH_URL=http://localhost:3000

HASH_SALT_ROUND=bcrypt-salt-number

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudnari-cloud-name
CLOUDINARY_API_KEY=your-cloudnari-api-key
CLOUDINARY_API_SECRET=your-cloudnari-api-secret
NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET_NAME=cloudnari-unsigned-upload-preset-name
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ihrachane.git
   cd ihrachane
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Deployment

The application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

