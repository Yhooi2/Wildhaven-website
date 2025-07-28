# Wildhaven Project Architecture

## 🏗️ Project Structure Overview

This document describes the comprehensive refactoring and modernization of the Wildhaven project architecture, transitioning from feature-based to entity-based architecture.

## 📁 Directory Structure

```
app/
├── _api/                    # Data layer (renamed from _lib/)
│   ├── auth.js
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
├── _entities/              # Entity-based architecture (NEW)
│   ├── booking/            # Booking entity
│   │   ├── ui/            # Booking UI components
│   │   │   ├── PriceDisplay/
│   │   │   │   ├── PriceDisplay.jsx
│   │   │   │   └── index.js
│   │   │   ├── GuestSelector/
│   │   │   │   ├── GuestSelector.jsx
│   │   │   │   └── index.js
│   │   │   ├── DateSelector/
│   │   │   │   ├── DateSelector.jsx
│   │   │   │   ├── DateSelector.styles.js
│   │   │   │   └── index.js
│   │   │   ├── BookingSummary/
│   │   │   │   ├── BookingSummary.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── model/         # Booking business logic
│   │   │   ├── booking-types.js
│   │   │   ├── booking-utils.js
│   │   │   └── index.js
│   │   └── index.js
│   ├── reservation/        # Reservation entity
│   │   ├── ui/            # Reservation UI components
│   │   │   ├── ReservationStatus/
│   │   │   │   ├── ReservationStatus.jsx
│   │   │   │   └── index.js
│   │   │   ├── ReservationCard/
│   │   │   │   ├── ReservationCard.jsx
│   │   │   │   └── index.js
│   │   │   ├── ReservationsList/
│   │   │   │   ├── ReservationsList.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js
│   │   ├── model/         # Reservation business logic
│   │   │   ├── reservation-types.js
│   │   │   ├── reservation-utils.js
│   │   │   └── index.js
│   │   └── index.js
│   └── cabin/             # Cabin entity
│       ├── ui/            # Cabin UI components
│       │   ├── CabinCard/
│       │   │   ├── CabinCard.jsx
│       │   │   └── index.js
│       │   ├── CabinDetails/
│       │   │   ├── CabinDetails.jsx
│       │   │   └── index.js
│       │   ├── CabinCatalog/
│       │   │   ├── CabinCatalog.jsx
│       │   │   └── index.js
│       │   └── index.js
│       ├── model/         # Cabin business logic
│       │   ├── cabin-types.js
│       │   ├── cabin-utils.js
│       │   └── index.js
│       └── index.js
├── _features/              # Feature-based architecture
│   ├── auth/               # Authentication feature
│   │   ├── actions/
│   │   │   └── auth-actions.js
│   │   ├── components/
│   │   │   ├── AuthHeader.jsx
│   │   │   ├── AuthProviders.jsx
│   │   │   ├── LoginMessage.jsx
│   │   │   ├── Protected.jsx
│   │   │   ├── SignInButton.jsx
│   │   │   ├── SignOutButton.jsx
│   │   │   └── index.js
│   │   └── index.js
│   └── reservation/        # Reservation feature (simplified)
│       ├── components/     # Feature components
│       │   ├── ui/        # Feature-specific UI
│       │   │   ├── ClearButton.jsx
│       │   │   └── index.js
│       │   ├── ReservationWidget.jsx
│       │   ├── ReservationForm.jsx
│       │   └── index.js
│       ├── context/        # Feature context
│       │   ├── ReservationProvider.jsx
│       │   ├── useReservation.js
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
│   │   ├── actions.js
│   │   └── page.js
│   ├── reservations/
│   │   └── page.js
│   ├── SideMenu.jsx
│   ├── layout.js
│   └── page.js
├── cabins/                 # Cabins pages
│   ├── _components/
│   │   ├── CabinFilter.jsx
│   │   ├── CabinList.jsx
│   │   ├── FilterButton.jsx
│   │   └── index.js
│   ├── [cabinId]/
│   │   ├── not-found.js
│   │   └── page.js
│   ├── loading.js
│   └── page.js
├── about/                  # About page
│   ├── CabinsCounter.jsx
│   └── page.js
├── login/                  # Login page
│   └── page.js
├── error.js               # Error boundary
├── loading.js             # Loading component
├── not-found.js           # 404 page
├── layout.js              # Root layout
└── page.js                # Home page
```

## 🔄 Migration Status

### ✅ Completed Migrations

#### Booking Entity

- **PriceDisplay** → `app/_entities/booking/ui/PriceDisplay/`
- **GuestSelector** → `app/_entities/booking/ui/GuestSelector/`
- **DateSelector** → `app/_entities/booking/ui/DateSelector/`
- **BookingSummary** → `app/_entities/booking/ui/BookingSummary/`

#### Reservation Entity

- **ReservationStatus** → `app/_entities/reservation/ui/ReservationStatus/`
- **ReservationCard** → `app/_entities/reservation/ui/ReservationCard/`
- **ReservationsList** → `app/_entities/reservation/ui/ReservationsList/`

#### Cabin Entity

- **CabinCard** → `app/_entities/cabin/ui/CabinCard/`
- **CabinDetails** → `app/_entities/cabin/ui/CabinDetails/`
- **CabinCatalog** → `app/_entities/cabin/ui/CabinCatalog/` (new widget)

### 📋 Model Layers

#### Booking Model

- `booking-types.js` - Type definitions and constants
- `booking-utils.js` - Pricing calculations, date helpers

#### Reservation Model

- `reservation-types.js` - Type definitions
- `reservation-utils.js` - Reservation management utilities

#### Cabin Model

- `cabin-types.js` - Cabin type definitions and constants
- `cabin-utils.js` - Filtering, sorting, validation utilities

## 🎯 Architecture Principles

### Entity-Based Structure

- **Separation of Concerns**: UI components, business logic, and data models are clearly separated
- **Reusability**: Components can be easily reused across different features
- **Maintainability**: Changes to business logic don't affect UI components
- **Scalability**: New entities can be added without affecting existing ones

### Import Guidelines (Next.js 15)

- **Absolute Paths**: All imports use `@/` aliases
- **Named Exports**: Components use named exports (except pages/layouts)
- **Centralized Exports**: Each layer has an index.js with centralized exports
- **No Circular Dependencies**: Strict dependency management

### File Organization

```
_entities/
├── {entity}/
│   ├── ui/           # UI components
│   │   ├── {Component}/
│   │   │   ├── {Component}.jsx
│   │   │   └── index.js
│   │   └── index.js
│   ├── model/        # Business logic
│   │   ├── {entity}-types.js
│   │   ├── {entity}-utils.js
│   │   └── index.js
│   └── index.js      # Main entity export
```

## 🛠️ Development Tools

### Automated Testing Scripts

- `npm run check:step` - Comprehensive project validation
- `npm run check:circular` - Circular dependency detection
- `npm run check:imports` - Import compliance verification
- `npm run build` - Production build verification
- `npm run lint` - Code quality checks

### Migration Workflow

1. **Create Structure**: Set up entity directories and index files
2. **Move Components**: Transfer components to appropriate entity UI layers
3. **Update Imports**: Convert all imports to absolute paths
4. **Create Models**: Implement business logic in model layers
5. **Verify**: Run comprehensive checks
6. **Clean Up**: Remove old files and update documentation

## 📊 Quality Metrics

### Success Criteria

- ✅ No ESLint warnings or errors
- ✅ Successful production build
- ✅ No circular dependencies
- ✅ All imports use absolute paths
- ✅ Components use named exports
- ✅ Centralized exports properly configured

### Performance Impact

- **Build Time**: Optimized through better dependency management
- **Bundle Size**: Reduced through proper tree-shaking
- **Developer Experience**: Improved through clear structure and tooling

## 🔮 Future Roadmap

### Phase 2: Feature Migration

- Migrate remaining feature components to appropriate entities
- Implement shared state management
- Add comprehensive testing

### Phase 3: Advanced Features

- Implement advanced filtering and sorting
- Add real-time updates
- Optimize for mobile performance

### Phase 4: Documentation

- Complete API documentation
- Add component storybook
- Create development guidelines

---

_This architecture follows Feature-Sliced Design (FSD) principles and Next.js 15 best practices._
