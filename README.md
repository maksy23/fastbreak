# FastBreak

A sports event management application with multi-venue support and user authentication.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth (email/password)
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Forms**: React Hook Form + Zod validation

## Features

- **Authentication**: Email/password
- **Event Management**: Create, edit, delete sports events with multi-venue support
- **Venue Management**: Manage venues with capacity tracking
- **Dashboard**: Search and filter events by name or sport type
- **Security**: User-specific data isolation via RLS policies

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd fastbreak
npm install
```

### 2. Supabase Setup

Create a Supabase account and project:

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to finish setting up
4. Go to Project Settings > API to find your project URL and anon key

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:

### 4. Database Setup

Link your local project to your Supabase project and run the migration:

```bash
# Link to your Supabase project (find project ref in Project Settings > General)
npx supabase link --project-ref <your-project-ref>

# Push the database schema
npx supabase db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Project Structure

```
src/
├── actions/        # Server Actions for events and venues
├── app/
│   ├── (auth)/    # Authentication pages
│   └── (main)/    # Main app (dashboard, about, contact)
├── components/
│   ├── events/    # Event management UI
│   ├── venues/    # Venue management UI
│   ├── layout/    # Navigation and footer
│   └── base/      # Shadcn UI components
├── lib/           # Supabase client and utilities
└── types/         # TypeScript types
```
