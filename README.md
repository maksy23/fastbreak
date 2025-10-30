# FastBreak

A sports event management application with multi-venue support and user authentication.

<img width="1511" height="821" alt="Screenshot 2025-10-29 at 8 44 17 PM" src="https://github.com/user-attachments/assets/364eb8e4-8d7c-4090-aa47-f5ae82286083" />
<img width="1508" height="820" alt="Screenshot 2025-10-29 at 8 45 56 PM" src="https://github.com/user-attachments/assets/7c875995-8e68-412e-9e33-4e83353187bb" />

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
