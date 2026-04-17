# Testing Documentation - ApartmentPredictor-React

## Overview

This project uses **Vitest** for unit testing, which is fully compatible with Vite and React 19.

## Test Structure

Tests are located in `src/__tests__/` directory:

```
src/__tests__/
  ApartmentsFilter.test.jsx    # Component tests for ApartmentsFilter
  apartmentsApiService.test.js  # API service tests with axios mocks
  useApartments.test.jsx       # Hook tests for useApartments
  setup.js                     # Test setup and global mocks
```

## Test Coverage

### 1. ApartmentsFilter.test.jsx (19 tests)
- **Renderizado basico**: Verifica que el componente se renderiza correctamente
- **Valores iniciales**: Verifica los estados iniciales de inputs y checkboxes
- **Manejo de cambios**: Verifica que los inputs numericos se actualizan correctamente
- **Casos borde**:
  - Area = 0
  - Area negativa
  - Precio negativo
  - Valores muy grandes
  - Campos vacios
- **Checkboxes**: Marcado y desmarcado de checkboxes
- **Submit**: Comportamiento de los botones FILTER y RESET

### 2. apartmentsApiService.test.js (8 tests)
- **getAll**: Obtencion de todos los apartments
- **page**: Obtencion paginada de apartments
- **createApartment**: Creacion de apartments
- **updateApartment**: Actualizacion de apartments
- **deleteApartment**: Eliminacion de apartments
- **filterApartments**: Filtrado de apartments
- **Manejo de errores**: Verifica el manejo de errores en cada metodo
- **Casos borde**: Respuestas vacias, paginas negativas

### 3. useApartments.test.jsx (25 tests)
- **Estado inicial**: Verifica los valores iniciales del hook
- **fetchPageApartments**: Obtencion de paginas de apartments
- **filterApartments**: Filtrado de apartments
- **createApartment**: Creacion de apartments
- **updateApartment**: Actualizacion de apartments
- **deleteApartment**: Eliminacion de apartments
- **Manejo de errores**: Verifica el manejo de errores en todas las operaciones
- **Casos borde**: Uso fuera del provider, respuestas vacias

## Running Tests

### Run tests once
```
npm run test:run
```

### Run tests in watch mode
```
npm test
# or
npm run test:watch
```

### Generate coverage report
```
npm run test:coverage
```

## Configuration

The Vitest configuration is in `vitest.config.js`:

- **Environment**: jsdom (for React testing)
- **Globals**: Vitest globals are enabled (describe, it, expect, vi, etc.)
- **Coverage**: Uses v8 provider with text, json, and html reporters

## Key Testing Libraries

- **Vitest**: Test runner compatible with Vite
- **@testing-library/react**: React testing utilities
- **@testing-library/jest-dom**: Custom jest matchers

## Mocking

### Axios Mocks
All API calls are mocked using `vi.mock(axios)` to avoid actual HTTP requests.

### Context Mocks
The `useApartments` hook is tested with a mock context provider.

## Notes

- Tests use `vi.fn()` from Vitest for function mocking
- Tests use `act()` from React Testing Library for state updates
- The setup.js file includes mocks for `window.matchMedia`

