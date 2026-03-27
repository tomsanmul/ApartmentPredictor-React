# REFACTOR IMPLEMENTATION PLAN: SPLIT CONTEXTS ARCHITECTURE

## OVERVIEW

**Goal:** Migrate from hook-based data layer to context-based split architecture  
**Pattern:** One context provider per entity (4-layer architecture)  
**Entities:** Apartment, School, Reviewer, Owner  
**Approach:** Incremental migration, phase by phase

---

## COMMON RULES (ALL PHASES)

### 🎯 Architecture Pattern (MANDATORY)

Each entity follows the **4-layer pattern**:

```
API → Hook → Service → Context
```

**Layer 1: API Service** - Direct axios calls to backend  
**Layer 2: Service Hooks** - Context for API access  
**Layer 3: Service Provider** - Wraps API in React provider  
**Layer 4: Data Context** - Frontend state management + refetch()

---

### 📁 Folder Structure (MANDATORY)

```
src/
├── middleware/
│   ├── config/
│   │   └── endpoints.js          # Centralized API endpoints
│   ├── apartment/
│   │   ├── apartmentApiService.js
│   │   ├── apartmentServiceHooks.jsx
│   │   └── apartmentService.jsx
│   ├── school/
│   │   ├── schoolApiService.js
│   │   ├── schoolServiceHooks.jsx
│   │   └── schoolService.jsx
│   ├── reviewer/
│   │   ├── reviewerApiService.js
│   │   ├── reviewerServiceHooks.jsx
│   │   └── reviewerService.jsx
│   └── owner/
│       ├── ownerApiService.js
│       ├── ownerServiceHooks.jsx
│       └── ownerService.jsx
├── data/
│   ├── ApartmentDataContext.jsx
│   ├── SchoolDataContext.jsx
│   ├── ReviewerDataContext.jsx
│   └── OwnerDataContext.jsx
└── providers/
    └── AppProviders.jsx             # Provider composition
```

---

### 🔒 Global Rules (MANDATORY)

#### Rule 1: All operations go through API first
- API calls backend
- Backend returns updated state
- Context reflects backend response
- **Never mutate state locally**

#### Rule 2: No hardcoded endpoints
- All endpoints in `middleware/config/endpoints.js`
- Import from centralized config
- Easy to change backend URLs

#### Rule 3: Remove refreshTrigger pattern
```js
// ❌ OLD
const [refreshTrigger, setRefreshTrigger] = useState(0);
const { apartments } = useApartments(refreshTrigger);
setRefreshTrigger(prev => prev + 1);

// ✅ NEW
const { apartments, refetch } = useApartmentData();
await refetch();
```

#### Rule 4: Consistent naming convention
- API Service: `<entity>ApiService.js`
- Service Hooks: `<entity>ServiceHooks.jsx`
- Service Provider: `<entity>Service.jsx`
- Data Context: `<Entity>DataContext.jsx`
- Hook: `use<Entity>Service()` and `use<Entity>Data()`

#### Rule 5: Error handling pattern
```js
try {
  const data = await service.getAll();
  setData(data);
  setIsLoading(false);
} catch (error) {
  console.error("Error:", error);
  setIsAxiosError(error.isAxiosError || false);
  setIsLoading(false);
}
```

#### Rule 6: Context value structure
```js
const value = {
  <entities>,      // Array of entities
  isLoading,       // Boolean
  isAxiosError,    // Boolean
  refetch          // Function
};
```

---

### 🧪 Testing Requirements (EVERY PHASE)

Each phase must include:
- ✅ API service tests (mock axios)
- ✅ Context provider tests
- ✅ Component integration tests
- ✅ No duplicate API calls
- ✅ No stale state
- ✅ Refetch behavior works

---

### 📋 Phase Completion Checklist

Before moving to next phase:
- [ ] All files created following structure
- [ ] Endpoints in centralized config
- [ ] No hardcoded URLs
- [ ] Components updated
- [ ] refreshTrigger removed
- [ ] Tests passing
- [ ] No console errors
- [ ] No regressions

---

## PHASE 0: CENTRALIZED ENDPOINTS CONFIGURATION

### Objective
Create centralized endpoint configuration before implementing any entity

### File: `src/middleware/config/endpoints.js`

```js
// Base API URL
const API_BASE = "/api/v1";

// Entity-specific base URLs
const APARTMENT_BASE = `${API_BASE}/apartment`;
const SCHOOL_BASE = `${API_BASE}/school`;
const REVIEWER_BASE = `${API_BASE}/reviewer`;
const OWNER_BASE = `${API_BASE}/owner`;

export const ENDPOINTS = {
  apartment: {
    base: APARTMENT_BASE,
    getAll: `${APARTMENT_BASE}/getAll`,
    getById: (id) => `${APARTMENT_BASE}/${id}`,
    create: `${APARTMENT_BASE}/create`,
    update: `${APARTMENT_BASE}/update`,
    deleteById: (id) => `${APARTMENT_BASE}/deleteById?id=${id}`,
    filter: `${APARTMENT_BASE}/filter`,
  },
  school: {
    base: SCHOOL_BASE,
    getAll: `${SCHOOL_BASE}/getAll`,
    getById: (id) => `${SCHOOL_BASE}/${id}`,
    create: `${SCHOOL_BASE}/create`,
    update: `${SCHOOL_BASE}/update`,
    deleteById: (id) => `${SCHOOL_BASE}/deleteById?id=${id}`,
    filter: `${SCHOOL_BASE}/filter`,
  },
  reviewer: {
    base: REVIEWER_BASE,
    getAll: `${REVIEWER_BASE}/getAll`,
    getById: (id) => `${REVIEWER_BASE}/${id}`,
    create: `${REVIEWER_BASE}/create`,
    update: `${REVIEWER_BASE}/update`,
    deleteById: (id) => `${REVIEWER_BASE}/deleteById?id=${id}`,
  },
  owner: {
    base: OWNER_BASE,
    getAll: `${OWNER_BASE}/getAll`,
    getById: (id) => `${OWNER_BASE}/${id}`,
    create: `${OWNER_BASE}/create`,
    update: `${OWNER_BASE}/update`,
    deleteById: (id) => `${OWNER_BASE}/deleteById?id=${id}`,
  },
};

export default ENDPOINTS;
```

### Tasks
1. Create `src/middleware/config/` folder
2. Create `endpoints.js` file
3. Define all endpoints for 4 entities
4. Export as default and named export

**Time estimate:** 30 minutes

---

## PHASE 1: APARTMENT (Foundation)

### Objective
Refactor existing Apartment implementation to follow new 4-layer architecture with centralized endpoints

### Tasks

#### 1.1 Reorganize Middleware Structure

**Move existing files:**
```
OLD: src/middleware/apartmentApiService.js
NEW: src/middleware/apartment/apartmentApiService.js

OLD: src/middleware/apartmentServiceHooks.jsx
NEW: src/middleware/apartment/apartmentServiceHooks.jsx

OLD: src/middleware/apartmentService.jsx
NEW: src/middleware/apartment/apartmentService.jsx
```

#### 1.2 Update apartmentApiService.js

**File:** `src/middleware/apartment/apartmentApiService.js`

```js
import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const ApartmentApiService = {
  getAllApartments: async () => {
    try {
      const response = await axios.get(ENDPOINTS.apartment.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching apartments:", error);
      throw error;
    }
  },

  getApartmentById: async (apartmentId) => {
    try {
      const response = await axios.get(ENDPOINTS.apartment.getById(apartmentId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  createApartment: async (apartment) => {
    try {
      const response = await axios.post(ENDPOINTS.apartment.create, apartment);
      return response.data;
    } catch (error) {
      console.error("Error creating apartment:", error);
      throw error;
    }
  },

  updateApartment: async (apartment) => {
    try {
      const response = await axios.post(ENDPOINTS.apartment.update, apartment);
      return response.data;
    } catch (error) {
      console.error(`Error updating apartment ${apartment.id}:`, error);
      throw error;
    }
  },

  deleteApartment: async (apartmentId) => {
    try {
      const response = await axios.delete(ENDPOINTS.apartment.deleteById(apartmentId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting apartment ${apartmentId}:`, error);
      throw error;
    }
  },

  filterApartments: async (filters) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => Boolean(value))
      );
      const response = await axios.get(ENDPOINTS.apartment.filter, { params: cleanParams });
      return response.data;
    } catch (error) {
      console.error("Error filtering apartments:", error);
      throw error;
    }
  },
};

export default ApartmentApiService;
```

#### 1.3 Update apartmentServiceHooks.jsx

**File:** `src/middleware/apartment/apartmentServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import ApartmentApiService from "./apartmentApiService";

export const ApartmentServiceContext = createContext(ApartmentApiService);

export const useApartmentService = () => useContext(ApartmentServiceContext);
```

#### 1.4 Update apartmentService.jsx

**File:** `src/middleware/apartment/apartmentService.jsx`

```js
import React from "react";
import ApartmentApiService from "./apartmentApiService";
import { ApartmentServiceContext } from "./apartmentServiceHooks";

export const ApartmentServiceProvider = ({ children }) => (
  <ApartmentServiceContext.Provider value={ApartmentApiService}>
    {children}
  </ApartmentServiceContext.Provider>
);
```

#### 1.5 Create ApartmentDataContext.jsx

**File:** `src/data/ApartmentDataContext.jsx`

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useApartmentService } from '../middleware/apartment/apartmentServiceHooks';

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

#### 1.6 Update App.jsx

**File:** `src/App.jsx`

```js
import { ApartmentDataProvider } from "./data/ApartmentDataContext";
import { ApartmentServiceProvider } from "./middleware/apartment/apartmentService";

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

#### 1.7 Update Components - Remove refreshTrigger Pattern

**Files to update:**
- `src/apartment/ApartmentList.jsx`
- `src/apartment/ApartmentCRUD.jsx`
- `src/pages/ApartmentFilterPage.jsx`

**Change:**
```js
// OLD
import { useApartments } from '../data/useApartments';
const { apartments, isLoading, isAxiosError, refetch } = useApartments(refreshTrigger);

// NEW
import { useApartmentData } from '../data/ApartmentDataContext';
const { apartments, isLoading, isAxiosError, refetch } = useApartmentData();
```

**In ApartmentCRUD.jsx:**
```js
// OLD
const [refreshTrigger, setRefreshTrigger] = useState(0);
setRefreshTrigger(prev => prev + 1);

// NEW
await refetch();
```

#### 1.8 Deprecate useApartments.jsx
- Rename to `useApartments.jsx.deprecated`
- Add comment: "Deprecated - use ApartmentDataContext instead"

#### 1.9 Testing
- ✅ All apartment CRUD operations work
- ✅ No duplicate API calls
- ✅ No console errors
- ✅ Refetch behavior correct

**Time estimate:** 4-6 hours

---

## PHASE 2: SCHOOL

### Objective
Create complete School data layer following Apartment pattern

### Tasks

#### 2.1 Create School API Service

**File:** `src/middleware/school/schoolApiService.js`

```js
import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const SchoolApiService = {
  getAllSchools: async () => {
    try {
      const response = await axios.get(ENDPOINTS.school.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  },

  getSchoolById: async (schoolId) => {
    try {
      const response = await axios.get(ENDPOINTS.school.getById(schoolId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching school ${schoolId}:`, error);
      throw error;
    }
  },

  createSchool: async (school) => {
    try {
      const response = await axios.post(ENDPOINTS.school.create, school);
      return response.data;
    } catch (error) {
      console.error("Error creating school:", error);
      throw error;
    }
  },

  updateSchool: async (school) => {
    try {
      const response = await axios.post(ENDPOINTS.school.update, school);
      return response.data;
    } catch (error) {
      console.error(`Error updating school ${school.id}:`, error);
      throw error;
    }
  },

  deleteSchool: async (schoolId) => {
    try {
      const response = await axios.delete(ENDPOINTS.school.deleteById(schoolId));
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
      const response = await axios.get(ENDPOINTS.school.filter, { params: cleanParams });
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

**File:** `src/middleware/school/schoolServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import SchoolApiService from "./schoolApiService";

export const SchoolServiceContext = createContext(SchoolApiService);

export const useSchoolService = () => useContext(SchoolServiceContext);
```

#### 2.3 Create School Service Provider

**File:** `src/middleware/school/schoolService.jsx`

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
import { useSchoolService } from '../middleware/school/schoolServiceHooks';

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
import { SchoolServiceProvider } from "./middleware/school/schoolService";
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
- ✅ School list rendering
- ✅ School CRUD operations
- ✅ Map markers use real data
- ✅ No interference with apartment context

**Time estimate:** 3-4 hours

---

## PHASE 3: REVIEWER

### Objective
Create Reviewer data layer (minimal UI integration)

### Tasks

#### 3.1 Create Reviewer API Service

**File:** `src/middleware/reviewer/reviewerApiService.js`

```js
import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const ReviewerApiService = {
  getAllReviewers: async () => {
    try {
      const response = await axios.get(ENDPOINTS.reviewer.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviewers:", error);
      throw error;
    }
  },

  getReviewerById: async (reviewerId) => {
    try {
      const response = await axios.get(ENDPOINTS.reviewer.getById(reviewerId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviewer ${reviewerId}:`, error);
      throw error;
    }
  },

  createReviewer: async (reviewer) => {
    try {
      const response = await axios.post(ENDPOINTS.reviewer.create, reviewer);
      return response.data;
    } catch (error) {
      console.error("Error creating reviewer:", error);
      throw error;
    }
  },

  updateReviewer: async (reviewer) => {
    try {
      const response = await axios.post(ENDPOINTS.reviewer.update, reviewer);
      return response.data;
    } catch (error) {
      console.error(`Error updating reviewer ${reviewer.id}:`, error);
      throw error;
    }
  },

  deleteReviewer: async (reviewerId) => {
    try {
      const response = await axios.delete(ENDPOINTS.reviewer.deleteById(reviewerId));
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

**File:** `src/middleware/reviewer/reviewerServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import ReviewerApiService from "./reviewerApiService";

export const ReviewerServiceContext = createContext(ReviewerApiService);

export const useReviewerService = () => useContext(ReviewerServiceContext);
```

#### 3.3 Create Reviewer Service Provider

**File:** `src/middleware/reviewer/reviewerService.jsx`

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
import { useReviewerService } from '../middleware/reviewer/reviewerServiceHooks';

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

#### 3.5 Update App.jsx

```js
import { ReviewerServiceProvider } from "./middleware/reviewer/reviewerService";
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

#### 3.6 Testing
- ✅ Reviewer CRUD operations
- ✅ Data available in context
- ✅ No interference with other contexts

**Time estimate:** 2-3 hours

---

## PHASE 4: OWNER

### Objective
Complete the last required entity following the established pattern

### Tasks

#### 4.1 Create Owner API Service

**File:** `src/middleware/owner/ownerApiService.js`

```js
import axios from "axios";
import ENDPOINTS from "../config/endpoints";

const OwnerApiService = {
  getAllOwners: async () => {
    try {
      const response = await axios.get(ENDPOINTS.owner.getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching owners:", error);
      throw error;
    }
  },

  getOwnerById: async (ownerId) => {
    try {
      const response = await axios.get(ENDPOINTS.owner.getById(ownerId));
      return response.data;
    } catch (error) {
      console.error(`Error fetching owner ${ownerId}:`, error);
      throw error;
    }
  },

  createOwner: async (owner) => {
    try {
      const response = await axios.post(ENDPOINTS.owner.create, owner);
      return response.data;
    } catch (error) {
      console.error("Error creating owner:", error);
      throw error;
    }
  },

  updateOwner: async (owner) => {
    try {
      const response = await axios.post(ENDPOINTS.owner.update, owner);
      return response.data;
    } catch (error) {
      console.error(`Error updating owner ${owner.id}:`, error);
      throw error;
    }
  },

  deleteOwner: async (ownerId) => {
    try {
      const response = await axios.delete(ENDPOINTS.owner.deleteById(ownerId));
      return response.data;
    } catch (error) {
      console.error(`Error deleting owner ${ownerId}:`, error);
      throw error;
    }
  },
};

export default OwnerApiService;
```

#### 4.2 Create Owner Service Hooks

**File:** `src/middleware/owner/ownerServiceHooks.jsx`

```js
import { createContext, useContext } from "react";
import OwnerApiService from "./ownerApiService";

export const OwnerServiceContext = createContext(OwnerApiService);

export const useOwnerService = () => useContext(OwnerServiceContext);
```

#### 4.3 Create Owner Service Provider

**File:** `src/middleware/owner/ownerService.jsx`

```js
import React from "react";
import OwnerApiService from "./ownerApiService";
import { OwnerServiceContext } from "./ownerServiceHooks";

export const OwnerServiceProvider = ({ children }) => (
  <OwnerServiceContext.Provider value={OwnerApiService}>
    {children}
  </OwnerServiceContext.Provider>
);
```

#### 4.4 Create OwnerDataContext

**File:** `src/data/OwnerDataContext.jsx`

```js
import { createContext, useContext, useState, useEffect } from 'react';
import { useOwnerService } from '../middleware/owner/ownerServiceHooks';

const OwnerDataContext = createContext();

export const OwnerDataProvider = ({ children }) => {
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAxiosError, setIsAxiosError] = useState(false);
  
  const ownerService = useOwnerService();

  const fetchOwners = async () => {
    setIsLoading(true);
    try {
      const ownersData = await ownerService.getAllOwners();
      setOwners(ownersData);
      setIsLoading(false);
      setIsAxiosError(false);
    } catch (error) {
      console.error("Error fetching owners:", error);
      setIsAxiosError(error.isAxiosError || false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const value = {
    owners,
    isLoading,
    isAxiosError,
    refetch: fetchOwners
  };

  return (
    <OwnerDataContext.Provider value={value}>
      {children}
    </OwnerDataContext.Provider>
  );
};

export const useOwnerData = () => {
  const context = useContext(OwnerDataContext);
  if (!context) {
    throw new Error('useOwnerData must be used within OwnerDataProvider');
  }
  return context;
};
```

#### 4.5 Update App.jsx

```js
import { OwnerServiceProvider } from "./middleware/owner/ownerService";
import { OwnerDataProvider } from "./data/OwnerDataContext";

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentServiceProvider>
        <SchoolServiceProvider>
          <ReviewerServiceProvider>
            <OwnerServiceProvider>
              <ApartmentDataProvider>
                <SchoolDataProvider>
                  <ReviewerDataProvider>
                    <OwnerDataProvider>
                      {/* existing content */}
                    </OwnerDataProvider>
                  </ReviewerDataProvider>
                </SchoolDataProvider>
              </ApartmentDataProvider>
            </OwnerServiceProvider>
          </ReviewerServiceProvider>
        </SchoolServiceProvider>
      </ApartmentServiceProvider>
    </BrowserRouter>
  );
}
```

#### 4.6 Testing
- ✅ Owner CRUD operations
- ✅ Data available in context
- ✅ All 4 entities working independently

**Time estimate:** 2-3 hours

---

## PHASE 5: PROVIDER COMPOSITION & CLEANUP

### Objective
Optimize provider nesting and clean up deprecated code

### Tasks

#### 5.1 Create Provider Composition

**File:** `src/providers/AppProviders.jsx`

```js
import React from 'react';
import { ApartmentServiceProvider } from "../middleware/apartment/apartmentService";
import { SchoolServiceProvider } from "../middleware/school/schoolService";
import { ReviewerServiceProvider } from "../middleware/reviewer/reviewerService";
import { OwnerServiceProvider } from "../middleware/owner/ownerService";

import { ApartmentDataProvider } from "../data/ApartmentDataContext";
import { SchoolDataProvider } from "../data/SchoolDataContext";
import { ReviewerDataProvider } from "../data/ReviewerDataContext";
import { OwnerDataProvider } from "../data/OwnerDataContext";

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
  OwnerServiceProvider
);

const DataProviders = composeProviders(
  ApartmentDataProvider,
  SchoolDataProvider,
  ReviewerDataProvider,
  OwnerDataProvider
);

export const AppProviders = ({ children }) => (
  <ServiceProviders>
    <DataProviders>
      {children}
    </DataProviders>
  </ServiceProviders>
);
```

#### 5.2 Update App.jsx

**File:** `src/App.jsx`

```js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./navigation/SideBar";
import HomePage from "./pages/HomePage";
import ApartmentPage from "./pages/ApartmentPage";
import ApartmentFilterPage from "./pages/ApartmentFilterPage";
import SchoolMapPage from "./pages/SchoolMapPage";
import "./App.css";
import { AppProviders } from "./providers/AppProviders";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  
  return (
    <BrowserRouter>
      <AppProviders>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <IconButton onClick={toggleDrawer(true)} style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 1000 }}>
            <MenuIcon />
          </IconButton>
          <SideBar open={drawerOpen} toggleDrawer={toggleDrawer} />
          
          <main style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '8px', marginLeft: '48px', width: '100%' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apartments" element={<ApartmentPage />} />
              <Route path="/apartmentFilter" element={<ApartmentFilterPage />} />
              <Route path="/schoolMap" element={<SchoolMapPage />} />
            </Routes>
          </main>
        </div>
      </AppProviders>
    </BrowserRouter>
  );
}
```

#### 5.3 Cleanup Deprecated Files

- Delete `src/data/useApartments.jsx.deprecated`
- Remove any unused imports
- Clean up console.log statements

#### 5.4 Final Testing

- ✅ All 4 entities CRUD working
- ✅ No prop drilling
- ✅ No duplicate API calls
- ✅ Clean provider composition
- ✅ No console errors
- ✅ Performance check (no regressions)

**Time estimate:** 2-3 hours

---

## TIMELINE SUMMARY

| Phase | Entity | Time Estimate |
|-------|--------|---------------|
| Phase 0 | Endpoints Config | 30 min |
| Phase 1 | Apartment | 4-6 hours |
| Phase 2 | School | 3-4 hours |
| Phase 3 | Reviewer | 2-3 hours |
| Phase 4 | Owner | 2-3 hours |
| Phase 5 | Composition & Cleanup | 2-3 hours |
| **TOTAL** | | **14-20 hours** |

---

## SUCCESS CRITERIA

✅ All 4 entities (Apartment, School, Reviewer, Owner) implemented  
✅ Each entity follows 4-layer architecture (API → Hook → Service → Context)  
✅ All endpoints centralized in `middleware/config/endpoints.js`  
✅ No hardcoded URLs anywhere  
✅ No `refreshTrigger` pattern  
✅ Components use `refetch()` for data refresh  
✅ Clean provider composition in `AppProviders.jsx`  
✅ All tests passing  
✅ No console errors  
✅ No performance regressions  
✅ Code follows consistent naming conventions  
✅ Deprecated files removed

---

## COMPLETION CHECKLIST

### Phase 0
- [ ] Create `middleware/config/` folder
- [ ] Create `endpoints.js` with all 4 entities

### Phase 1 (Apartment)
- [ ] Move files to `middleware/apartment/`
- [ ] Update API service to use ENDPOINTS
- [ ] Create ApartmentDataContext
- [ ] Update App.jsx with providers
- [ ] Update components (remove refreshTrigger)
- [ ] Deprecate useApartments.jsx
- [ ] Tests passing

### Phase 2 (School)
- [ ] Create `middleware/school/` folder
- [ ] Create schoolApiService.js
- [ ] Create schoolServiceHooks.jsx
- [ ] Create schoolService.jsx
- [ ] Create SchoolDataContext.jsx
- [ ] Update App.jsx
- [ ] Update school components
- [ ] Tests passing

### Phase 3 (Reviewer)
- [ ] Create `middleware/reviewer/` folder
- [ ] Create reviewerApiService.js
- [ ] Create reviewerServiceHooks.jsx
- [ ] Create reviewerService.jsx
- [ ] Create ReviewerDataContext.jsx
- [ ] Update App.jsx
- [ ] Tests passing

### Phase 4 (Owner)
- [ ] Create `middleware/owner/` folder
- [ ] Create ownerApiService.js
- [ ] Create ownerServiceHooks.jsx
- [ ] Create ownerService.jsx
- [ ] Create OwnerDataContext.jsx
- [ ] Update App.jsx
- [ ] Tests passing

### Phase 5 (Composition)
- [ ] Create `providers/` folder
- [ ] Create AppProviders.jsx
- [ ] Update App.jsx to use AppProviders
- [ ] Delete deprecated files
- [ ] Final testing
- [ ] Performance audit
- [ ] Documentation updated

---

## FINAL STRUCTURE

```
src/
├── middleware/
│   ├── config/
│   │   └── endpoints.js
│   ├── apartment/
│   │   ├── apartmentApiService.js
│   │   ├── apartmentServiceHooks.jsx
│   │   └── apartmentService.jsx
│   ├── school/
│   │   ├── schoolApiService.js
│   │   ├── schoolServiceHooks.jsx
│   │   └── schoolService.jsx
│   ├── reviewer/
│   │   ├── reviewerApiService.js
│   │   ├── reviewerServiceHooks.jsx
│   │   └── reviewerService.jsx
│   └── owner/
│       ├── ownerApiService.js
│       ├── ownerServiceHooks.jsx
│       └── ownerService.jsx
├── data/
│   ├── ApartmentDataContext.jsx
│   ├── SchoolDataContext.jsx
│   ├── ReviewerDataContext.jsx
│   └── OwnerDataContext.jsx
├── providers/
│   └── AppProviders.jsx
└── App.jsx
```

---

**END OF REFACTOR PLAN**
