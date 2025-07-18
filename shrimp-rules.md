# Wildhaven Website - AI Development Standards

## Project Overview

**Project Type**: Luxury cabin booking website  
**Tech Stack**: Next.js 15, React 19, Supabase, Tailwind CSS  
**Theme**: Italian Alps luxury hotel experience  
**Architecture**: App Router with component co-location

## Architecture Rules

### Directory Structure

- **MUST** follow App Router structure with `app/` as root
- **MUST** use `_components/` folders for reusable components within features
- **MUST** place shared UI components in `app/_components/ui/`
- **MUST** place data services in `app/_lib/`
- **MUST** place global styles in `app/_styles/`
- **MUST NOT** create pages outside the `app/` directory
- **MUST NOT** break the established folder naming conventions

### Component Organization

- **MUST** co-locate feature-specific components in `_components/` folders
- **MUST** export shared UI components from `app/_components/ui/index.js`
- **MUST** create separate files for each component (no multi-component files)
- **MUST NOT** create duplicate components without checking existing ones first

## Data Service Patterns

### Supabase Integration

- **MUST** use the existing `supabase` instance from `app/_lib/supabase.js`
- **MUST** follow the CRUD pattern established in `app/_lib/data-service.js`:
  - GET functions: `getCabin()`, `getCabins()`, `getBookings()`
  - CREATE functions: `createGuest()`, `createBooking()`
  - UPDATE functions: `updateGuest()`, `updateBooking()`
  - DELETE functions: `deleteBooking()`

### Error Handling

- **MUST** use `console.error(error)` for logging
- **MUST** throw descriptive errors: `throw new Error("Specific error message")`
- **MUST** use `notFound()` from `next/navigation` for 404 cases
- **MUST NOT** expose raw database errors to users

### Data Fetching

- **MUST** use `.select()` to specify required fields
- **MUST** use `.single()` for single record queries
- **MUST** use `.order()` for sorted results
- **MUST** use `.eq()` for equality filters

## UI Component Standards

### Component Props

- **MUST** accept `className` prop with default empty string
- **MUST** use prop spreading: `{...props}`
- **MUST** destructure `children` when needed
- **MUST NOT** override essential styling without className merging

### Example Pattern:

```javascript
export default function ComponentName({ children, className = "", ...props }) {
  return (
    <element className={`base-classes ${className}`} {...props}>
      {children}
    </element>
  );
}
```

## Styling Standards

### Color Scheme

- **MUST** use primary colors: `primary-950` (dark bg), `primary-100` (light text)
- **MUST** use accent color: `accent-500` (buttons, highlights)
- **MUST** use gray colors: `gray-500`, `gray-300` for disabled states
- **MUST NOT** introduce new color variables without updating the theme

### Typography

- **MUST** use Josefin Sans font (already configured in layout)
- **MUST** use Tailwind text utilities: `text-lg`, `text-xl`, etc.
- **MUST NOT** override the font-family without explicit requirements

### Layout

- **MUST** use the established grid system: `grid flex-1 px-8 py-12`
- **MUST** use max-width container: `mx-auto w-full max-w-7xl`
- **MUST** maintain responsive design principles
- **MUST NOT** break the mobile-first approach

## File Organization Rules

### Component Exports

- **MUST** add new UI components to `app/_components/ui/index.js`
- **MUST** use default exports for components
- **MUST** use named exports for utilities and multiple exports

### Import Patterns

- **MUST** use absolute imports with `@/` prefix for app directory
- **MUST** group imports: React/Next, third-party, local components, utilities
- **MUST NOT** use relative imports for deeply nested paths

## Dependencies Usage

### Required Libraries

- **MUST** use `@heroicons/react` for icons
- **MUST** use `date-fns` for date manipulation
- **MUST** use `react-day-picker` for date selection
- **MUST** use `@supabase/supabase-js` for database operations
- **MUST NOT** add competing libraries without justification

### Icon Usage

- **MUST** import icons from `@heroicons/react/24/outline` or `@heroicons/react/24/solid`
- **MUST** use consistent icon sizes: `h-5 w-5`, `h-6 w-6`

## Brand Consistency

### Content Guidelines

- **MUST** maintain luxury hotel theme
- **MUST** reference Italian Alps and Dolomites context
- **MUST** use "Wildhaven" as brand name
- **MUST NOT** contradict the established brand voice

### Metadata

- **MUST** follow title template: `%s / Wildhaven`
- **MUST** maintain SEO-friendly descriptions
- **MUST** update metadata when creating new pages

## Code Quality Rules

### Formatting

- **MUST** run `npm run format` before committing
- **MUST** follow Prettier configuration
- **MUST** use ESLint rules for code quality
- **MUST NOT** commit unformatted code

### Performance

- **MUST** use Next.js Image component for images
- **MUST** implement proper loading states
- **MUST** use React 19 features appropriately
- **MUST NOT** create unnecessary re-renders

## Prohibited Actions

### Architecture

- **MUST NOT** modify `app/layout.js` without explicit instruction
- **MUST NOT** change the root HTML structure
- **MUST NOT** break the App Router conventions
- **MUST NOT** create pages in the old `pages/` directory

### Data

- **MUST NOT** create direct database connections outside data-service.js
- **MUST NOT** expose sensitive data in client components
- **MUST NOT** modify Supabase configuration without approval

### Styling

- **MUST NOT** add inline styles without justification
- **MUST NOT** use CSS modules or styled-components
- **MUST NOT** override Tailwind's default configuration

## Decision-Making Criteria

### When to Create New Components

1. **CREATE** when functionality doesn't exist in `app/_components/ui/`
2. **MODIFY** existing components when functionality is similar
3. **EXTEND** existing components with new props when possible

### When to Modify Data Services

1. **ADD** new functions following existing patterns
2. **MODIFY** existing functions only for bug fixes
3. **NEVER** change the error handling pattern

### When to Update Routes

1. **CREATE** new routes in appropriate feature directories
2. **FOLLOW** the established layout hierarchy
3. **MAINTAIN** consistent page structure

## Multi-File Coordination

### When Adding New Features

- **MUST** update `app/_components/ui/index.js` when adding UI components
- **MUST** update data services when adding new data operations
- **MUST** consider impact on existing components and pages
- **MUST** maintain consistency across related files

### When Modifying Existing Features

- **MUST** check all usages before modifying shared components
- **MUST** update all related files simultaneously
- **MUST** maintain backward compatibility when possible

## AI-Specific Guidelines

### Analysis Requirements

- **MUST** examine existing patterns before implementing new features
- **MUST** check component usage across the codebase
- **MUST** verify data service patterns before adding new operations
- **MUST NOT** assume patterns without code verification

### Implementation Priorities

1. **FIRST**: Use existing components and patterns
2. **SECOND**: Extend existing functionality
3. **LAST**: Create new components or patterns

### Quality Assurance

- **MUST** verify all imports are correct
- **MUST** check that new components follow established patterns
- **MUST** ensure responsive design is maintained
- **MUST** validate that brand consistency is preserved
