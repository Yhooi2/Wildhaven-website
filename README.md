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

For detailed architecture documentation, see [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md).

## Tech Stack

- **Framework**: Next.js 15.4.2-canary.0
- **React**: 19.1.0
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **Date Picker**: react-day-picker

## Architecture

This project follows **Feature-Sliced Design (FSD)** principles:

- **Feature-based architecture** with dedicated feature folders
- **Centralized exports** via index.js files
- **Type safety** with .jsx extensions for React components
- **Colocation** of related files and styles
- **Modular structure** for scalability and maintainability

### Key Architectural Decisions

1. **File Extensions**: React components use `.jsx`, utilities use `.js`
2. **Centralized Exports**: All component folders have `index.js` files
3. **Feature Organization**: Business logic organized in `_features/` folder
4. **Shared Components**: Reusable UI components in `_components/`
5. **Data Layer**: API and services in `_api/` folder

## Project Structure

```
app/
├── _api/                    # Data layer (renamed from _lib/)
│   ├── data-service.js
│   └── supabase.js
├── _components/             # Shared UI components
│   ├── Header/
│   │   ├── Header.jsx
│   │   ├── Logo.jsx
│   │   ├── Navigation.jsx
│   │   └── index.js
│   ├── ui/                 # Base UI components
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── Heading.jsx
│   │   ├── Icon.jsx
│   │   ├── Input.jsx
│   │   ├── Layout.jsx
│   │   ├── Spinner.jsx
│   │   ├── Text.jsx
│   │   └── index.js
│   ├── BackButton.jsx
│   ├── ErrorLayout.jsx
│   ├── TextExpander.jsx
│   └── index.js
├── _features/              # Feature-based architecture
│   └── reservation/        # Reservation feature
│       ├── components/     # Feature components
│       │   ├── ui/        # Feature-specific UI
│       │   │   ├── BookingSummary.jsx
│       │   │   ├── ClearButton.jsx
│       │   │   ├── PriceDisplay.jsx
│       │   │   └── index.js
│       │   ├── DateSelector.jsx
│       │   ├── GuestSelector.jsx
│       │   ├── Reservation.jsx
│       │   ├── ReservationForm.jsx
│       │   └── index.js
│       ├── context/        # Feature context
│       │   ├── ReservationProvider.jsx
│       │   └── index.js
│       ├── hooks/          # Feature hooks
│       │   ├── useReservation.js
│       │   └── index.js
│       ├── utils/          # Feature utilities
│       │   ├── dateHelpers.js
│       │   ├── pricing.js
│       │   └── index.js
│       └── index.js
├── _styles/                # Global styles
│   └── globals.css
├── account/                # Account pages
│   ├── profile/
│   │   ├── _components/
│   │   │   ├── SelectCountry.jsx
│   │   │   ├── UpdateProfileForm.jsx
│   │   │   └── index.js
│   │   └── page.js
│   ├── reservations/
│   │   ├── ReservationCard.jsx
│   │   └── page.js
│   ├── SideMenu.jsx
│   ├── layout.js
│   └── page.js
├── cabins/                 # Cabins pages
│   ├── _components/
│   │   ├── CabinCard.jsx
│   │   ├── CabinFilter.jsx
│   │   ├── CabinList.jsx
│   │   ├── FilterButton.jsx
│   │   └── index.js
│   ├── [cabinId]/
│   │   ├── _components/
│   │   │   ├── Cabin.jsx
│   │   │   └── index.js
│   │   ├── not-found.js
│   │   │   └── page.js
│   ├── loading.js
│   └── page.js
├── about/
│   ├── CabinsCounter.jsx
│   └── page.js
├── error.js
├── layout.js
├── loading.js
├── not-found.js
└── page.js
```

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Testing

The project includes automated testing scripts:

- `node scripts/quick-test.js` - Quick project integrity check
- `node scripts/test-after-step.js` - Step-by-step testing after refactoring

These scripts verify:

- Build process
- Linting
- File structure
- Import consistency
- Component exports
