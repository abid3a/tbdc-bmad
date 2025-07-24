# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Supabase Credentials

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key
4. Add them to your `.env.local` file

## Installation

```bash
npm install
npm run dev
``` 