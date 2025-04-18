# Bright Infinite - Next.js 15 with Sanity

A modern web application built with Next.js 15 and Sanity CMS, featuring audio content, biography, store, and contact functionality.

## Project Overview

This project is structured as a modular Next.js application with Sanity CMS integration. It features:

- Audio content management and playback
- Biography section
- Store functionality
- Contact form and information
- Type-safe development with TypeScript
- Modern UI components

## Architecture

The project follows a modular architecture with clear separation of concerns:

```
/ (root)
├── types/                        # Centralized type definitions
├── lib/                          # Shared utilities and services
├── components/                   # Reusable UI components
└── app/                          # Next.js App Router
```

### Key Directories

- **types/**: Contains all TypeScript interfaces and type definitions
- **lib/**: Houses business logic, services, and utilities
- **components/**: UI components organized by feature and reusability
- **app/**: Next.js App Router pages and API routes

## Type System

The project uses a comprehensive type system with the following key type files:

- `audio.types.tsx`: Audio track and playlist types
- `bio.types.tsx`: Biography content types
- `store.types.tsx`: Store and product types
- `contact.types.tsx`: Contact form and information types

## API Services

The application uses service-based architecture with the following key services:

- `audio.api.tsx`: Audio content management
- `bio.api.tsx`: Biography content management
- `store.api.tsx`: Store and product management
- `contact.api.tsx`: Contact form handling

## Development Guidelines

### Type Safety

- All new features must include appropriate type definitions
- Use TypeScript interfaces for Sanity document types
- Maintain type consistency across the application

### Component Development

- Use server components by default
- Add "use client" directive only when needed
- Follow the established component structure

### Data Fetching

- Use server components for initial data fetching
- Implement client-side data fetching when needed
- Follow Sanity's best practices for GROQ queries

### Code Organization

- Place types in the `/types` directory
- Use `.api.tsx` extension for service files
- Follow PascalCase for component files
- Use camelCase for utility functions

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.local.example`)
4. Run the development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Follow the established architecture and naming conventions
2. Ensure type safety in all new features
3. Write clear, maintainable code
4. Document any new features or changes

## License

[Add your license information here]

## Testing Strategy

The project follows a phased testing approach to ensure quality while maintaining development velocity.

### Current Testing Status

- Basic test configuration is in place
- Testing infrastructure is ready for future implementation
- Focus is on getting the site live first

### Planned Testing Implementation

1. **Component Testing**

   - UI components (Button, Input)
   - Feature components (BioCard, ProductCard, ContactForm)
   - Layout components

2. **Service Testing**

   - API service functions
   - Sanity client interactions
   - Data fetching and caching

3. **Integration Testing**

   - Page rendering
   - Form submissions
   - User interactions

4. **End-to-End Testing**
   - Critical user journeys
   - Form submissions
   - Checkout process

### Test Structure

```
/ (root)
├── __tests__/
│   ├── components/      # Component tests
│   ├── services/       # Service tests
│   ├── utils/          # Utility tests
│   └── pages/          # Page tests
├── __mocks__/          # Test mocks
└── jest.config.js      # Jest configuration
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test/file
```

### Adding New Tests

1. Create test file with `.test.tsx` or `.test.ts` extension
2. Follow existing test patterns
3. Use React Testing Library for component tests
4. Mock external dependencies appropriately

## Preview Mode

The application supports Sanity's preview functionality, allowing content editors to see their changes in real-time before publishing.

### Setting Up Preview

1. Generate a preview token in Sanity Studio
2. Add the token to `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PREVIEW_TOKEN=your_token_here
   SANITY_PREVIEW_SECRET=your_secret_here
   ```

### Using Preview

1. In Sanity Studio, click "Open Preview" on any document
2. The preview will open in a new tab showing the live site with draft content
3. Changes made in Sanity Studio will be reflected in real-time

### Preview URLs

- Enter preview mode: `/api/preview?secret=<secret>&slug=<path>`
- Exit preview mode: `/api/exit-preview?slug=<path>`
