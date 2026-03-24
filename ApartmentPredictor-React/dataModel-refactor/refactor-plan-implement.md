# REFACTOR IMPLEMENTATION PLAN: OPTION C (Split Contexts)

## OVERVIEW

**Goal:** Migrate from hook-based data layer to context-based split architecture  
**Pattern:** One context provider per entity  
**Entities:** Apartment, School, Reviewer, Owner, Contract, Property  
**Approach:** Incremental migration, phase by phase

---

## PHASE 1: APARTMENT CONTEXT (Foundation)

### Objective
Convert existing `useApartments` hook to `ApartmentDataContext` pattern

### Steps

#### 1.1 Create ApartmentDataContext.jsx
**File:** `src/data/ApartmentDataContext.jsx`

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useApartmentService } from '../middleware/apartmentServiceHooks';

const ApartmentDataContext = createContext();

export const ApartmentDataProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const apartmentService = useApartmentService();

  const fetchApartments = async () => {
    setIsLoading(true);
    try {
      const apartmentsData = await apartmentService.getAllApartments();
      setApartments(apartmentsData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, []);

  const value = {
    apartments,
    isLoading,
    isAxiosError,
    refetch: fetchApartments
  };

  return (
    <ApartmentDataContext.Provider value={value}>
      {children}
    </ApartmentDataContext.Provider>
  );
};

export const useApartmentData = () => {
  const context = useContext(ApartmentDataContext);
  if (!context) {
    throw new Error('useApartmentData must be used within ApartmentDataProvider');
  }
  return context;
};
```

#### 1.2 Update App.jsx
**File:** `src/App.jsx`

```js
import { ApartmentDataProvider } from "./data/ApartmentDataContext";
import { ApartmentServiceProvider } from "./middleware/apartmentService";

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <ApartmentDataProvider>
          {/* existing content */}
        </ApartmentDataProvider>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
```

#### 1.3 Update Components Using useApartments
**Files to update:**
- `src/apartment/ApartmentList.jsx`
- `src/apartment/ApartmentFilterPage.jsx` (if exists)
- Any other components using `useApartments`

**Change:**
```js
// OLD
import { useApartments } from '../data/useApartments';
const { apartments, isLoading, isAxiosError, refetch } = useApartments(refreshTrigger);

// NEW
import { useApartmentData } from '../data/ApartmentDataContext';
const { apartments, isLoading, isAxiosError, refetch } = useApartmentData();
// Note: refreshTrigger no longer needed, use refetch() instead
```

#### 1.4 Handle RefreshTrigger Pattern
Components using `refreshTrigger` need adjustment:

```js
// OLD pattern in ApartmentCRUD.jsx
const [refreshTrigger, setRefreshTrigger] = useState(0);
const { apartments } = useApartments(refreshTrigger);
setRefreshTrigger(prev => prev + 1); // to refresh

// NEW pattern
const { apartments, refetch } = useApartmentData();
await refetch(); // to refresh
```

#### 1.5 Deprecate useApartments.jsx
- Rename to `useApartments.jsx.deprecated`
- Add comment: "Deprecated - use ApartmentDataContext instead"
- Keep temporarily for reference

#### 1.6 Testing
- Test all apartment CRUD operations
- Test apartment list rendering
- Test apartment filtering
- Verify no console errors
- Check network tab for duplicate requests

---

## PHASE 2: SCHOOL CONTEXT + API LAYER

### Objective
Create complete School data layer from scratch

### Steps

#### 2.1 Create School API Service
**File:** `src/middleware/schoolApiService.js`

```js
import axios from "axios";

const API_BASE_URL = "/api/v1/school";

const SchoolApiService = {
  getAllSchools: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  },

  getSchoolById: async (schoolId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching school ${schoolId}:`, error);
      throw error;
    }
  },

  createSchool: async (school) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, school);
      return response.data;
    } catch (error) {
      console.error("Error creating school:", error);
      throw error;
    }
  },

  updateSchool: async (school) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/update`, school);
      return response.data;
    } catch (error) {
      console.error(`Error updating school ${school.id}:`, error);
      throw error;
    }
  },

  deleteSchool: async (schoolId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteById?id=${schoolId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting school ${schoolId}:`, error);
      throw error;
    }
  },

  filterSchools: async (filters) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => Boolean(value))
      );
      const response = await axios.get(`${API_BASE_URL}/filter`, { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Error filtering schools:", error);
      throw error;
    }
  },
};

export default SchoolApiService;
```

#### 2.2 Create School Service Hooks
**File:** `src/middleware/schoolServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import SchoolApiService from "./schoolApiService";

export const SchoolServiceContext = createContext(SchoolApiService);

export const useSchoolService = () => useContext(SchoolServiceContext);
```

#### 2.3 Create School Service Provider
**File:** `src/middleware/schoolService.jsx`

```js
import React from "react";
import SchoolApiService from "./schoolApiService";
import { SchoolServiceContext } from "./schoolServiceHooks";

export const SchoolServiceProvider = ({ children }) => (
  <SchoolServiceContext.Provider value={SchoolApiService}>
    {children}
  </SchoolServiceContext.Provider>
);
```

#### 2.4 Create SchoolDataContext
**File:** `src/data/SchoolDataContext.jsx`

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useSchoolService } from '../middleware/schoolServiceHooks';

const SchoolDataContext = createContext();

export const SchoolDataProvider = ({ children }) => {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const schoolService = useSchoolService();

  const fetchSchools = async () => {
    setIsLoading(true);
    try {
      const schoolsData = await schoolService.getAllSchools();
      setSchools(schoolsData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching schools:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const value = {
    schools,
    isLoading,
    isAxiosError,
    refetch: fetchSchools
  };

  return (
    <SchoolDataContext.Provider value={value}>
      {children}
    </SchoolDataContext.Provider>
  );
};

export const useSchoolData = () => {
  const context = useContext(SchoolDataContext);
  if (!context) {
    throw new Error('useSchoolData must be used within SchoolDataProvider');
  }
  return context;
};
```

#### 2.5 Update App.jsx
```js
import { SchoolServiceProvider } from "./middleware/schoolService";
import { SchoolDataProvider } from "./data/SchoolDataContext";

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <SchoolServiceProvider>
          <ApartmentDataProvider>
            <SchoolDataProvider>
              {/* existing content */}
            </SchoolDataProvider>
          </ApartmentDataProvider>
        </SchoolServiceProvider>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
```

#### 2.6 Update School Components
**Files to update:**
- `src/school/SchoolMapView.jsx`
- `src/school/SchoolMap.jsx`
- `src/school/SchoolCreate.jsx`
- `src/pages/SchoolMapPage.jsx`

**Replace hardcoded data with:**
```js
import { useSchoolData } from '../data/SchoolDataContext';

const SchoolComponent = () => {
  const { schools, isLoading, refetch } = useSchoolData();
  
  if (isLoading) return <div>Loading schools...</div>;
  
  return (
    // Use schools data
  );
};
```

#### 2.7 Testing
- Test school list rendering
- Test school CRUD operations
- Verify map markers use real data
- Check no interference with apartment context

---

## PHASE 3: REVIEWER CONTEXT + API LAYER

### Objective
Create Reviewer data layer and integrate with Review system

### Steps

#### 3.1 Create Reviewer API Service
**File:** `src/middleware/reviewerApiService.js`

```js
import axios from "axios";

const API_BASE_URL = "/api/v1/reviewer";

const ReviewerApiService = {
  getAllReviewers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviewers:", error);
      throw error;
    }
  },

  getReviewerById: async (reviewerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${reviewerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviewer ${reviewerId}:`, error);
      throw error;
    }
  },

  createReviewer: async (reviewer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, reviewer);
      return response.data;
    } catch (error) {
      console.error("Error creating reviewer:", error);
      throw error;
    }
  },

  updateReviewer: async (reviewer) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/update`, reviewer);
      return response.data;
    } catch (error) {
      console.error(`Error updating reviewer ${reviewer.id}:`, error);
      throw error;
    }
  },

  deleteReviewer: async (reviewerId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteById?id=${reviewerId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting reviewer ${reviewerId}:`, error);
      throw error;
    }
  },
};

export default ReviewerApiService;
```

#### 3.2 Create Reviewer Service Hooks
**File:** `src/middleware/reviewerServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import ReviewerApiService from "./reviewerApiService";

export const ReviewerServiceContext = createContext(ReviewerApiService);

export const useReviewerService = () => useContext(ReviewerServiceContext);
```

#### 3.3 Create Reviewer Service Provider
**File:** `src/middleware/reviewerService.jsx`

```js
import React from "react";
import ReviewerApiService from "./reviewerApiService";
import { ReviewerServiceContext } from "./reviewerServiceHooks";

export const ReviewerServiceProvider = ({ children }) => (
  <ReviewerServiceContext.Provider value={ReviewerApiService}>
    {children}
  </ReviewerServiceContext.Provider>
);
```

#### 3.4 Create ReviewerDataContext
**File:** `src/data/ReviewerDataContext.jsx`

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useReviewerService } from '../middleware/reviewerServiceHooks';

const ReviewerDataContext = createContext();

export const ReviewerDataProvider = ({ children }) => {
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const reviewerService = useReviewerService();

  const fetchReviewers = async () => {
    setIsLoading(true);
    try {
      const reviewersData = await reviewerService.getAllReviewers();
      setReviewers(reviewersData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching reviewers:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewers();
  }, []);

  const value = {
    reviewers,
    isLoading,
    isAxiosError,
    refetch: fetchReviewers
  };

  return (
    <ReviewerDataContext.Provider value={value}>
      {children}
    </ReviewerDataContext.Provider>
  );
};

export const useReviewerData = () => {
  const context = useContext(ReviewerDataContext);
  if (!context) {
    throw new Error('useReviewerData must be used within ReviewerDataProvider');
  }
  return context;
};
```

#### 3.5 Create Review API Service (if needed)
**File:** `src/middleware/reviewApiService.js`

```js
import axios from "axios";

const API_BASE_URL = "/api/v1/review";

const ReviewApiService = {
  getReviewsByApartmentId: async (apartmentId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/apartment/${apartmentId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  createReview: async (review) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create`, review);
      return response.data;
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  },

  updateReview: async (review) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/update`, review);
      return response.data;
    } catch (error) {
      console.error(`Error updating review ${review.id}:`, error);
      throw error;
    }
  },

  deleteReview: async (reviewId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteById?id=${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting review ${reviewId}:`, error);
      throw error;
    }
  },
};

export default ReviewApiService;
```

#### 3.6 Update App.jsx
```js
import { ReviewerServiceProvider } from "./middleware/reviewerService";
import { ReviewerDataProvider } from "./data/ReviewerDataContext";

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <SchoolServiceProvider>
          <ReviewerServiceProvider>
            <ApartmentDataProvider>
              <SchoolDataProvider>
                <ReviewerDataProvider>
                  {/* existing content */}
                </ReviewerDataProvider>
              </SchoolDataProvider>
            </ApartmentDataProvider>
          </ReviewerServiceProvider>
        </SchoolServiceProvider>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
```

#### 3.7 Update Reviews Component
**File:** `src/review/Reviews.jsx`

Replace mock data generation with real API calls:

```js
import { useReviewerData } from '../data/ReviewerDataContext';
import { useEffect, useState } from 'react';
import ReviewApiService from '../middleware/reviewApiService';

const Reviews = () => {
  const { id } = useParams();
  const { reviewers } = useReviewerData();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await ReviewApiService.getReviewsByApartmentId(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  // Rest of component
};
```

#### 3.8 Testing
- Test reviewer list
- Test review display with real data
- Verify reviewer names populate correctly
- Test review CRUD operations

---

## PHASE 4: REMAINING ENTITIES (Owner, Contract, Property)

### Objective
Complete the data layer for all remaining entities

### Steps for Each Entity (Owner, Contract, Property)

#### 4.1 Owner Entity

**Files to create:**
- `src/middleware/ownerApiService.js`
- `src/middleware/ownerServiceHooks.jsx`
- `src/middleware/ownerService.jsx`
- `src/data/OwnerDataContext.jsx`

**Pattern:** Follow exact same structure as Apartment/School/Reviewer

#### 4.2 Contract Entity

**Files to create:**
- `src/middleware/contractApiService.js`
- `src/middleware/contractServiceHooks.jsx`
- `src/middleware/contractService.jsx`
- `src/data/ContractDataContext.jsx`

#### 4.3 Property Entity

**Files to create:**
- `src/middleware/propertyApiService.js`
- `src/middleware/propertyServiceHooks.jsx`
- `src/middleware/propertyService.jsx`
- `src/data/PropertyDataContext.jsx`

#### 4.4 Final App.jsx Structure

```js
import { ApartmentServiceProvider } from "./middleware/apartmentService";
import { SchoolServiceProvider } from "./middleware/schoolService";
import { ReviewerServiceProvider } from "./middleware/reviewerService";
import { OwnerServiceProvider } from "./middleware/ownerService";
import { ContractServiceProvider } from "./middleware/contractService";
import { PropertyServiceProvider } from "./middleware/propertyService";

import { ApartmentDataProvider } from "./data/ApartmentDataContext";
import { SchoolDataProvider } from "./data/SchoolDataContext";
import { ReviewerDataProvider } from "./data/ReviewerDataContext";
import { OwnerDataProvider } from "./data/OwnerDataContext";
import { ContractDataProvider } from "./data/ContractDataContext";
import { PropertyDataProvider } from "./data/PropertyDataContext";

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <SchoolServiceProvider>
          <ReviewerServiceProvider>
            <OwnerServiceProvider>
              <ContractServiceProvider>
                <PropertyServiceProvider>
                  <ApartmentDataProvider>
                    <SchoolDataProvider>
                      <ReviewerDataProvider>
                        <OwnerDataProvider>
                          <ContractDataProvider>
                            <PropertyDataProvider>
                              {/* existing content */}
                            </PropertyDataProvider>
                          </ContractDataProvider>
                        </OwnerDataProvider>
                      </ReviewerDataProvider>
                    </SchoolDataProvider>
                  </ApartmentDataProvider>
                </PropertyServiceProvider>
              </ContractServiceProvider>
            </OwnerServiceProvider>
          </ReviewerServiceProvider>
        </SchoolServiceProvider>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
```

---

## PHASE 5: CENTRALIZED SERVICES EXPORT

### Objective
Create centralized service export for easier access

### Steps

#### 5.1 Create Services Index
**File:** `src/middleware/services.js`

```js
import ApartmentApiService from './apartmentApiService';
import SchoolApiService from './schoolApiService';
import ReviewerApiService from './reviewerApiService';
import OwnerApiService from './ownerApiService';
import ContractApiService from './contractApiService';
import PropertyApiService from './propertyApiService';

const Services = {
  apartment: ApartmentApiService,
  school: SchoolApiService,
  reviewer: ReviewerApiService,
  owner: OwnerApiService,
  contract: ContractApiService,
  property: PropertyApiService,
};

export default Services;
```

#### 5.2 Optional: Use Services in Contexts
Components can now import services directly if needed:

```js
import Services from '../middleware/services';

// Direct access
const apartments = await Services.apartment.getAllApartments();
```

---

## OPTIMIZATION: PROVIDER COMPOSITION

### Objective
Reduce provider nesting with composition pattern

### Implementation

**File:** `src/providers/AppProviders.jsx`

```js
import React from 'react';
import { ApartmentServiceProvider } from "../middleware/apartmentService";
import { SchoolServiceProvider } from "../middleware/schoolService";
import { ReviewerServiceProvider } from "../middleware/reviewerService";
import { OwnerServiceProvider } from "../middleware/ownerService";
import { ContractServiceProvider } from "../middleware/contractService";
import { PropertyServiceProvider } from "../middleware/propertyService";

import { ApartmentDataProvider } from "../data/ApartmentDataContext";
import { SchoolDataProvider } from "../data/SchoolDataContext";
import { ReviewerDataProvider } from "../data/ReviewerDataContext";
import { OwnerDataProvider } from "../data/OwnerDataContext";
import { ContractDataProvider } from "../data/ContractDataContext";
import { PropertyDataProvider } from "../data/PropertyDataContext";

const composeProviders = (...providers) => {
  return providers.reduce(
    (Prev, Curr) => ({ children }) => (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ),
    ({ children }) => <>{children}</>
  );
};

const ServiceProviders = composeProviders(
  ApartmentServiceProvider,
  SchoolServiceProvider,
  ReviewerServiceProvider,
  OwnerServiceProvider,
  ContractServiceProvider,
  PropertyServiceProvider
);

const DataProviders = composeProviders(
  ApartmentDataProvider,
  SchoolDataProvider,
  ReviewerDataProvider,
  OwnerDataProvider,
  ContractDataProvider,
  PropertyDataProvider
);

export const AppProviders = ({ children }) => (
  <ServiceProviders>
    <DataProviders>
      {children}
    </DataProviders>
  </ServiceProviders>
);
```

**Updated App.jsx:**

```js
import { AppProviders } from "./providers/AppProviders";

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        {/* existing content */}
      </AppProviders>
    </BrowserRouter>
  );
}
```

---

## TESTING STRATEGY

### Unit Tests

#### Test Context Providers
```js
import { render, screen } from '@testing-library/react';
import { ApartmentDataProvider, useApartmentData } from './ApartmentDataContext';

test('provides apartment data to consumers', async () => {
  const TestComponent = () => {
    const { apartments, isLoading } = useApartmentData();
    return <div>{isLoading ? 'Loading' : apartments.length}</div>;
  };

  render(
    <ApartmentDataProvider>
      <TestComponent />
    </ApartmentDataProvider>
  );

  expect(screen.getByText('Loading')).toBeInTheDocument();
});
```

#### Test API Services
```js
import ApartmentApiService from './apartmentApiService';
import axios from 'axios';

jest.mock('axios');

test('fetches all apartments', async () => {
  const mockData = [{ id: 1, price: 100000 }];
  axios.get.mockResolvedValue({ data: mockData });

  const result = await ApartmentApiService.getAllApartments();
  
  expect(result).toEqual(mockData);
  expect(axios.get).toHaveBeenCalledWith('/api/v1/apartment/getAll');
});
```

### Integration Tests

Test full data flow from component → context → service → API

### E2E Tests

Test complete user workflows with real data

---

## ROLLBACK PLAN

### If Issues Arise

1. **Phase 1 rollback:**
   - Restore `useApartments.jsx`
   - Remove `ApartmentDataContext.jsx`
   - Revert App.jsx changes
   - Revert component changes

2. **Phase 2+ rollback:**
   - Remove new entity contexts
   - Remove new API services
   - Keep Phase 1 changes (apartment context)

3. **Emergency rollback:**
   - Git revert to pre-refactor commit
   - Deploy previous version

---

## PERFORMANCE MONITORING

### Metrics to Track

- Initial load time
- Time to interactive
- API request count
- Bundle size
- Re-render count (React DevTools Profiler)

### Optimization Checkpoints

After each phase:
- Run Lighthouse audit
- Check bundle size with `npm run build`
- Profile with React DevTools
- Monitor network requests

---

## COMPLETION CHECKLIST

### Phase 1: Apartment
- [ ] Create ApartmentDataContext.jsx
- [ ] Update App.jsx with provider
- [ ] Update all components using useApartments
- [ ] Remove refreshTrigger pattern
- [ ] Deprecate useApartments.jsx
- [ ] Test all apartment CRUD operations
- [ ] Verify no regressions

### Phase 2: School
- [ ] Create schoolApiService.js
- [ ] Create schoolServiceHooks.jsx
- [ ] Create schoolService.jsx
- [ ] Create SchoolDataContext.jsx
- [ ] Update App.jsx with providers
- [ ] Update school components
- [ ] Test school functionality

### Phase 3: Reviewer
- [ ] Create reviewerApiService.js
- [ ] Create reviewerServiceHooks.jsx
- [ ] Create reviewerService.jsx
- [ ] Create ReviewerDataContext.jsx
- [ ] Create reviewApiService.js (optional)
- [ ] Update App.jsx with providers
- [ ] Update Reviews.jsx
- [ ] Test reviewer/review functionality

### Phase 4: Remaining Entities
- [ ] Create Owner API + Context
- [ ] Create Contract API + Context
- [ ] Create Property API + Context
- [ ] Update App.jsx with all providers
- [ ] Test all entities

### Phase 5: Optimization
- [ ] Create centralized services.js
- [ ] Create AppProviders.jsx composition
- [ ] Update App.jsx to use composition
- [ ] Run performance audit
- [ ] Document final architecture

---

## TIMELINE ESTIMATE

- **Phase 1 (Apartment):** 4-6 hours
- **Phase 2 (School):** 3-4 hours
- **Phase 3 (Reviewer):** 3-4 hours
- **Phase 4 (Owner, Contract, Property):** 6-8 hours
- **Phase 5 (Optimization):** 2-3 hours
- **Testing & Bug Fixes:** 4-6 hours

**Total:** 22-31 hours (3-4 days)

---

## SUCCESS CRITERIA

✅ All entities use context-based data layer  
✅ No prop drilling for data access  
✅ Independent entity refresh capabilities  
✅ No performance regressions  
✅ All tests passing  
✅ Clean provider composition  
✅ Centralized service exports  
✅ Documentation updated  
✅ Code review approved  
✅ Production deployment successful
