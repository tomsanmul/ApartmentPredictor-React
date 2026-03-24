# DATA MODEL & API ARCHITECTURE

## PROJECT STRUCTURE
```
src/
├── apartment/          # UI components for apartment CRUD
├── auth/              # (empty - auth not implemented)
├── components/        # shared form components
├── data/              # DATA REPOSITORY LAYER - custom hooks for data fetching
├── hooks/             # (empty - general hooks)
├── layout/            # (empty - layout components)
├── middleware/        # API SERVICE LAYER - axios calls, service hooks, context
├── navigation/        # sidebar, nav components
├── pages/             # route pages
├── review/            # review UI components
└── school/            # school UI components
```

## ARCHITECTURE LAYERS

### Layer 1: API SERVICE (src/middleware/)
**Direct axios HTTP calls to backend**

#### apartmentApiService.js
```js
API_BASE_URL = "/api/v1/apartment"

getAllApartments()      → GET /api/v1/apartment/getAll
getApartmentById(id)    → GET /api/v1/apartment/{id}
createApartment(apt)    → POST /api/v1/apartment/create
updateApartment(apt)    → POST /api/v1/apartment/update
deleteApartment(id)     → DELETE /api/v1/apartment/deleteById?id={id}
filterApartments(filters) → GET /api/v1/apartment/filter?{params}
```

#### apartmentServiceHooks.jsx
```js
ApartmentServiceContext = createContext(ApartmentApiService)
useApartmentService()   → returns ApartmentApiService from context
```

#### apartmentService.jsx
```js
ApartmentServiceProvider → wraps app with ApartmentServiceContext.Provider
```

### Layer 2: DATA REPOSITORY (src/data/)
**State management + service consumption**

#### useApartments.jsx
```js
useApartments(refreshTrigger) → {
  apartments: [],
  isLoading: bool,
  isAxiosError: bool,
  refetch: fn
}

Internal:
- useState: apartments, isLoading, isAxiosError
- useApartmentService() to get service
- useEffect triggers fetchApartments() on refreshTrigger
- fetchApartments() calls apartmentService.getAllApartments()
```

## DATA MODELS

### Apartment
```js
{
  id: string,
  price: number,
  area: number,
  bedrooms: number,
  bathrooms: number,
  stories: number,
  mainroad: "yes"|"no"|bool,
  guestroom: "yes"|"no"|bool,
  basement: "yes"|"no"|bool,
  hotwaterheating: "yes"|"no"|bool,
  airconditioning: "yes"|"no"|bool,
  parking: 0|1|bool,
  prefarea: "yes"|"no"|bool,
  furnishingstatus: "unfurnished"|"semi-furnished"|"furnished",
  reviews: Review[]
}
```

### Review
```js
{
  id: string,
  title: string,
  content: string,
  rating: number (1-5),
  reviewDate: string (ISO date),
  reviewer: string|null
}
```

### School
```js
// NOT IMPLEMENTED - only UI shell exists
// SchoolMapView shows hardcoded Manhattan position [40.7831, -73.9712]
```

### Reviewer
```js
// NOT IMPLEMENTED - referenced in Review.reviewer but no entity
```

### PropertyContract
```js
// NOT IMPLEMENTED
```

### Owner
```js
// NOT IMPLEMENTED
```

## API ENDPOINTS

### Apartment Endpoints
```
GET    /api/v1/apartment/getAll
GET    /api/v1/apartment/{id}
POST   /api/v1/apartment/create
POST   /api/v1/apartment/update
DELETE /api/v1/apartment/deleteById?id={id}
GET    /api/v1/apartment/filter?{queryParams}
```

### Other Endpoints
```
NONE - school, review, owner, contract not implemented
```

## CONTEXT PROVIDERS

### ApartmentServiceContext
```js
Provider: ApartmentServiceProvider (middleware/apartmentService.jsx)
Consumer: useApartmentService() (middleware/apartmentServiceHooks.jsx)
Value: ApartmentApiService object
```

## CUSTOM HOOKS

### Data Hooks (src/data/)
```js
useApartments(refreshTrigger)
  → consumes: useApartmentService()
  → returns: { apartments, isLoading, isAxiosError, refetch }
```

### Service Hooks (src/middleware/)
```js
useApartmentService()
  → consumes: ApartmentServiceContext
  → returns: ApartmentApiService
```

## COMPONENT DATA FLOW

### Read Flow
```
Component
  → useApartments(refreshTrigger)
    → useApartmentService()
      → ApartmentApiService.getAllApartments()
        → axios.get('/api/v1/apartment/getAll')
          → backend
```

### Write Flow (Create/Update/Delete)
```
Component (ApartmentCreate/Update/CRUD)
  → useApartmentService()
    → ApartmentApiService.createApartment(data)
      → axios.post('/api/v1/apartment/create', data)
        → backend
```

## FILTER IMPLEMENTATION
```js
filterApartments(filters)
  - Removes falsy values from filters object
  - Passes as axios params: { params: cleanParams }
  - GET /api/v1/apartment/filter?key1=val1&key2=val2
```

## MISSING IMPLEMENTATIONS

### No API/Data Layer
- School (only UI with hardcoded data)
- Review (mock data in component)
- Reviewer
- PropertyContract
- Owner

### No Context
- School
- Review
- Auth

### No Custom Hooks
- School data fetching
- Review data fetching
- Filter state management
- Form state management

## REFACTOR TARGETS

### Pattern to Replicate
For each entity (School, Review, Owner, Contract):

1. **middleware/{entity}ApiService.js**
   - axios calls
   - CRUD operations
   - filter/search

2. **middleware/{entity}ServiceHooks.jsx**
   - createContext
   - useEntityService hook

3. **middleware/{entity}Service.jsx**
   - EntityServiceProvider component

4. **data/use{Entities}.jsx**
   - useState for data/loading/error
   - useEntityService consumption
   - useEffect for fetching
   - return { entities, isLoading, isError, refetch }

5. **Update App.jsx**
   - Wrap with EntityServiceProvider

### Current Gaps
- Review data is mocked in Reviews.jsx component (lines 13-54)
- School has no data layer at all
- No relationship management (apartment.reviews is populated but no API)
- Filter logic scattered in components vs centralized
