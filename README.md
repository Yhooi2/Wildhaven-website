# Wildhaven Website

A modern website for Wildhaven cabins and accommodations.

## Features

- Next.js 15 with React 19
- Supabase integration
- Responsive design with Tailwind CSS
- Cabin booking system
- User account management

## Development

```bash
npm install
npm run dev
```

## MCP Tools Setup

This project includes Model Context Protocol (MCP) tools for enhanced development experience:

- **Context7**: Access up-to-date library documentation
- **TaskManager**: Project task management system

See [MCP_SETUP.md](./MCP_SETUP.md) for detailed configuration and usage instructions.

## Tech Stack

- **Framework**: Next.js 15.4.2-canary.0
- **React**: 19.1.0
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **Date Picker**: react-day-picker

## Project Structure

```
app/
├── _components/     # Shared components
├── _lib/           # Utilities and services
├── _styles/        # Global styles
├── about/          # About page
├── account/        # User account pages
├── cabins/         # Cabin listing and details
└── layout.js       # Root layout
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
