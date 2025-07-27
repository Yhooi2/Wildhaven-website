# Wildhaven Project Architecture

## 🏗️ Project Structure Overview

This document describes the comprehensive refactoring and modernization of the Wildhaven project architecture.

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
│   └── reservation/        # Reservation feature
│       ├── components/     # Feature components
│       │   ├── ui/        # Feature-specific UI
│       │   │   ├── BookingSummary.jsx
│       │   │   ├── ClearButton.jsx
│       │   │   ├── PriceDisplay.jsx
│       │   │   ├── ReservationStatus.jsx
│       │   │   └── index.js
│       │   ├── DateSelector.jsx
│       │   ├── DateSelector.styles.js
│       │   ├── GuestSelector.jsx
│       │   ├── Reservation.jsx
│       │   ├── ReservationCard.jsx
│       │   ├── ReservationDate.jsx
│       │   ├── ReservationForm.jsx
│       │   ├── ReservationRemainder.jsx
│       │   ├── ReservationsList.jsx
│       │   └── index.js
│       ├── context/        # Feature context
│       │   ├── ReservationProvider.jsx
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
│   │   ├── actions.js
│   │   └── page.js
│   ├── reservations/
│   │   └── page.js
│   ├── SideMenu.jsx
│   ├── layout.js
│   └── page.js
├── cabins/                 # Cabins pages
│   ├── _components/
│   │   ├── Cabin.jsx
│   │   ├── CabinCard.jsx
│   │   ├── CabinFilter.jsx
│   │   ├── CabinList.jsx
│   │   ├── FilterButton.jsx
│   │   └── index.js
│   ├── [cabinId]/
│   │   ├── not-found.js
│   │   └── page.js
│   ├── loading.js
│   └── page.js
├── about/
│   ├── CabinsCounter.jsx
│   └── page.js
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.js
├── login/
│   └── page.js
├── error.js
├── icon.png
├── layout.js
├── loading.js
├── not-found.js
└── page.js
```

## 🔄 Refactoring Summary

### 1. File Extension Standardization

- **46 React components** renamed from `.js` to `.jsx`
- **Utilities and configs** kept as `.js` files
- **Better type safety** and IDE support

### 2. Centralized Exports Implementation

- **13 index.js files** created for centralized exports
- **Consistent import patterns** across the project
- **Cleaner imports** using destructuring
- **Feature-based exports** for auth and reservation components

### 3. Feature-Sliced Architecture

- **Reservation feature** moved to `_features/reservation/` with 16 components
- **Auth feature** added to `_features/auth/` with complete authentication components (6 components)
- **Complete feature structure**: components, context, utils (useReservation moved to context/)
- **Colocation of styles** with components (DateSelector.styles.js)
- **Modular architecture** for scalability

### 4. Code Organization

- **Added authentication system** with complete auth feature structure (6 auth components)
- **Enhanced reservation components** with additional UI components (16 total components)
- **Updated all imports** to use centralized exports
- **Consistent naming conventions**
- **Better separation of concerns**

## 🎯 Architecture Principles

### Feature-Sliced Design (FSD)

- **Features** contain business logic
- **Shared** components are reusable
- **UI** components are base building blocks
- **API** layer handles data operations

### Next.js 15 Best Practices

- **App Router** structure
- **Server Components** by default
- **Client Components** when needed
- **Colocation** of related files

### Code Quality

- **ESLint** for code quality
- **Prettier** for formatting
- **Automated testing** scripts
- **Type safety** with .jsx extensions

## 🚀 Benefits

1. **Maintainability**: Clear structure and separation of concerns
2. **Scalability**: Easy to add new features (auth and reservation as examples)
3. **Reusability**: Centralized exports and shared components
4. **Type Safety**: .jsx extensions for React components
5. **Developer Experience**: Better IDE support and navigation
6. **Testing**: Automated scripts for project verification
7. **Authentication**: Complete auth system with 6 reusable components
8. **Reservation System**: Enhanced booking functionality with 19 components

## 📋 Migration Checklist

- ✅ Renamed 46 React components to .jsx
- ✅ Created 13 index.js files for exports
- ✅ Updated all imports to use centralized exports
- ✅ Moved reservation logic to feature folder
- ✅ Added authentication feature with complete structure (6 components)
- ✅ Enhanced reservation components with additional UI components (16 total)
- ✅ Moved useReservation hook to context/ directory
- ✅ Added colocated styles (DateSelector.styles.js)
- ✅ Verified build and linting
- ✅ Created automated testing scripts
- ✅ Documented architecture changes

## 🔧 Testing

Run the following commands to verify project integrity:

```bash
npm run lint          # Check code quality
npm run build         # Verify build process
npm run dev           # Test development server
node scripts/quick-test.js  # Run automated tests
```

## 📚 Related Files

- `MCP_QUICK_START.md` - MCP tools setup
- `MCP_CHEATSHEET.md` - MCP commands reference
- `scripts/quick-test.js` - Automated testing script
- `scripts/test-after-step.js` - Step-by-step testing

---

_Last updated: December 2024_
_Architecture: Feature-Sliced Design with Next.js 15_
