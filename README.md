# Wildhaven Website

A modern website for Wildhaven cabins and accommodations.

## Features

- Next.js 15 with React 19
- Supabase integration
- Responsive design with Tailwind CSS
- Cabin booking system
- User account management

## Dependencies

| Library                     | Description                                                             | Documentation                                                                      |
| --------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| @heroicons/react            | Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS.        | [Docs](https://github.com/tailwindlabs/heroicons)                                  |
| @modelcontextprotocol/sdk   | SDK for Model Context Protocol, enabling context-driven AI workflows.   | [Docs](https://github.com/ppl-ai/modelcontextprotocol)                             |
| @supabase/supabase-js       | JavaScript client for Supabase, an open-source Firebase alternative.    | [Docs](https://supabase.com/docs/reference/javascript)                             |
| date-fns                    | Modern JavaScript date utility library.                                 | [Docs](https://date-fns.org/docs/)                                                 |
| mcp-shrimp-task-manager     | Advanced task management and planning tool.                             | [Docs](https://www.npmjs.com/package/mcp-shrimp-task-manager)                      |
| next                        | The React Framework for Production.                                     | [Docs](https://nextjs.org/docs)                                                    |
| next-auth                   | Authentication for Next.js applications.                                | [Docs](https://next-auth.js.org/)                                                  |
| react                       | A JavaScript library for building user interfaces.                      | [Docs](https://react.dev/)                                                         |
| react-day-picker            | Flexible date picker component for React.                               | [Docs](https://react-day-picker.js.org/)                                           |
| react-dom                   | Serves as the entry point to the DOM and server renderers for React.    | [Docs](https://react.dev/reference/react-dom)                                      |
| transliteration             | Library for converting Unicode text to ASCII for Russian name handling. | [Docs](https://github.com/dzcpy/transliteration)                                   |
| eslint                      | Pluggable JavaScript linter.                                            | [Docs](https://eslint.org/docs/latest/)                                            |
| eslint-config-next          | Next.js ESLint configuration.                                           | [Docs](https://nextjs.org/docs/pages/building-your-application/configuring/eslint) |
| eslint-plugin-tailwindcss   | Linting plugin for Tailwind CSS classes.                                | [Docs](https://github.com/francoismassart/eslint-plugin-tailwindcss)               |
| postcss                     | Tool for transforming CSS with JavaScript.                              | [Docs](https://postcss.org/docs/)                                                  |
| prettier                    | Opinionated code formatter.                                             | [Docs](https://prettier.io/docs/en/index.html)                                     |
| prettier-plugin-tailwindcss | Prettier plugin for sorting Tailwind CSS classes.                       | [Docs](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)                |
| tailwindcss                 | Utility-first CSS framework.                                            | [Docs](https://tailwindcss.com/docs)                                               |

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

- **Framework**: Next.js 15.4.2-canary.16
- **React**: 19.1.0
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Heroicons
- **Date Handling**: date-fns
- **Date Picker**: react-day-picker
- **Text Processing**: transliteration (v2.3.5) for Russian name handling

## Project Dependencies Overview

| Library                                                                                          | Purpose      | Description                                        | Documentation                                                                      |
| ------------------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [@heroicons/react](https://github.com/tailwindlabs/heroicons)                                    | UI           | React SVG icon library from Tailwind Labs          | [Docs](https://github.com/tailwindlabs/heroicons#react)                            |
| [@modelcontextprotocol/sdk](https://github.com/ppl-ai/modelcontextprotocol)                      | Utilities    | SDK for Model Context Protocol, context management | [Docs](https://github.com/ppl-ai/modelcontextprotocol)                             |
| [@supabase/supabase-js](https://supabase.com/docs/reference/javascript)                          | Data/Backend | JS client for Supabase backend/database            | [Docs](https://supabase.com/docs/reference/javascript)                             |
| [date-fns](https://date-fns.org/)                                                                | Utilities    | Modern JavaScript date utility library             | [Docs](https://date-fns.org/docs/)                                                 |
| [mcp-shrimp-task-manager](https://www.npmjs.com/package/mcp-shrimp-task-manager)                 | Dev Tools    | Advanced task management and planning tool         | [Docs](https://www.npmjs.com/package/mcp-shrimp-task-manager)                      |
| [next](https://nextjs.org/)                                                                      | Framework    | React framework for SSR, SSG, routing              | [Docs](https://nextjs.org/docs)                                                    |
| [next-auth](https://next-auth.js.org/)                                                           | Auth         | Authentication for Next.js apps                    | [Docs](https://next-auth.js.org/getting-started/introduction)                      |
| [react](https://react.dev/)                                                                      | UI           | Core React library for building UIs                | [Docs](https://react.dev/)                                                         |
| [react-day-picker](https://react-day-picker.js.org/)                                             | UI           | Flexible date picker component for React           | [Docs](https://react-day-picker.js.org/)                                           |
| [react-dom](https://react.dev/)                                                                  | UI           | React DOM renderer                                 | [Docs](https://react.dev/reference/react-dom)                                      |
| [transliteration](https://github.com/dzcpy/transliteration)                                      | Utilities    | Unicode to ASCII conversion for Russian names      | [Docs](https://github.com/dzcpy/transliteration)                                   |
| [eslint](https://eslint.org/)                                                                    | Dev Tools    | Pluggable JavaScript linter                        | [Docs](https://eslint.org/docs/latest/)                                            |
| [eslint-config-next](https://nextjs.org/docs/pages/building-your-application/configuring/eslint) | Dev Tools    | ESLint config for Next.js                          | [Docs](https://nextjs.org/docs/pages/building-your-application/configuring/eslint) |
| [eslint-plugin-tailwindcss](https://github.com/francoismassart/eslint-plugin-tailwindcss)        | Dev Tools    | ESLint plugin for Tailwind CSS class sorting       | [Docs](https://github.com/francoismassart/eslint-plugin-tailwindcss)               |
| [postcss](https://postcss.org/)                                                                  | Dev Tools    | CSS transformer for JS                             | [Docs](https://postcss.org/docs/)                                                  |
| [prettier](https://prettier.io/)                                                                 | Dev Tools    | Code formatter                                     | [Docs](https://prettier.io/docs/en/index.html)                                     |
| [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)       | Dev Tools    | Prettier plugin for sorting Tailwind CSS classes   | [Docs](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)                |
| [tailwindcss](https://tailwindcss.com/)                                                          | UI           | Utility-first CSS framework                        | [Docs](https://tailwindcss.com/docs)                                               |

## Project Dependencies

Below is a list of all major libraries used in this project, with a brief description and a link to their official documentation:

- **@heroicons/react**: React components for Heroicons SVG icons. [Docs](https://heroicons.com/)
- **@modelcontextprotocol/sdk**: SDK for Model Context Protocol, used for context-driven AI integrations. [Docs](https://github.com/ppl-ai/modelcontextprotocol)
- **@supabase/supabase-js**: JavaScript client for Supabase, an open-source Firebase alternative. [Docs](https://supabase.com/docs/reference/javascript)
- **date-fns**: Modern JavaScript date utility library. [Docs](https://date-fns.org/docs/Getting-Started)
- **mcp-shrimp-task-manager**: Advanced task management tool for project planning and workflow automation. [Docs](https://www.npmjs.com/package/mcp-shrimp-task-manager)
- **next**: React framework for server-side rendering and static site generation. [Docs](https://nextjs.org/docs)
- **next-auth**: Authentication for Next.js applications. [Docs](https://next-auth.js.org/getting-started/introduction)
- **react**: Core React library for building user interfaces. [Docs](https://react.dev/learn)
- **react-day-picker**: Flexible date picker component for React. [Docs](https://react-day-picker.js.org/)
- **react-dom**: React package for working with the DOM. [Docs](https://react.dev/reference/react-dom)
- **transliteration**: Library for converting Unicode text to ASCII, used for Russian name handling. [Docs](https://github.com/dzcpy/transliteration)
- **eslint**: Pluggable JavaScript linter. [Docs](https://eslint.org/docs/latest/)
- **eslint-config-next**: ESLint configuration used by Next.js. [Docs](https://nextjs.org/docs/pages/building-your-application/configuring/eslint)
- **eslint-plugin-tailwindcss**: Linting for Tailwind CSS classes in your code. [Docs](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- **postcss**: Tool for transforming CSS with JavaScript plugins. [Docs](https://postcss.org/)
- **prettier**: Opinionated code formatter. [Docs](https://prettier.io/docs/en/index.html)
- **prettier-plugin-tailwindcss**: Prettier plugin for sorting Tailwind CSS classes. [Docs](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- **tailwindcss**: Utility-first CSS framework. [Docs](https://tailwindcss.com/docs/installation)

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
- `npm run lint`
