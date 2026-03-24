# DATA LAYER ARCHITECTURE OPTIONS

## CONTEXT: CENTRALIZED API LAYER

```js
// middleware/services.js
const Services = {
  apartment: apartmentService,
  school: schoolService,
  reviewer: reviewerService,
};
export default Services;
```

## CURRENT STATE
- **Layer 1 (middleware/)**: API services with axios calls
- **Layer 2 (data/)**: `useApartments` hook - state management + service consumption
- **Current usage**: Components call `useApartments(refreshTrigger)` directly

---

## OPTION A: UNIFIED DATA HOOK (useAppData)

### Architecture
```js
// data/useAppData.jsx
export const useAppData = (refreshTrigger) => {
  const [apartments, setApartments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  
  const apartmentService = useApartmentService();
  const schoolService = useSchoolService();
  const reviewerService = useReviewerService();
  
  const fetchAllData = async () => {
    // Parallel fetch all entities
    const [aptsData, schoolsData, reviewersData] = await Promise.all([
      apartmentService.getAllApartments(),
      schoolService.getAllSchools(),
      reviewerService.getAllReviewers()
    ]);
    // Set all state
  };
  
  useEffect(() => { fetchAllData(); }, [refreshTrigger]);
  
  return {
    apartments, schools, reviewers,
    isLoading, errors,
    refetch: fetchAllData,
    refetchApartments, refetchSchools, refetchReviewers
  };
};
```

### Usage Pattern
```js
// Component
const MyComponent = () => {
  const { apartments, schools, reviewers, refetch } = useAppData();
  // Use data directly
};
```

### PROS
✅ **Single source of truth** - all data in one place  
✅ **Parallel loading** - fetch all entities simultaneously  
✅ **Simple component API** - one hook call gets everything  
✅ **Centralized refresh** - `refetch()` updates all data  
✅ **Easy data relationships** - apartments + schools + reviewers in same scope  
✅ **No provider nesting** - just one hook import  
✅ **Selective refetch** - `refetchApartments()` for granular updates  
✅ **Minimal boilerplate** - no context setup per entity  

### CONS
❌ **Over-fetching** - components get all data even if only need one entity  
❌ **Tight coupling** - all entities bundled together  
❌ **Single refresh trigger** - one `refreshTrigger` affects all data  
❌ **Memory overhead** - all data loaded even if unused  
❌ **Difficult lazy loading** - can't defer loading unused entities  
❌ **Testing complexity** - must mock entire data structure  
❌ **Scalability issues** - adding new entities requires hook modification  
❌ **Performance bottleneck** - one slow API blocks all data  
❌ **No data isolation** - error in one fetch affects all  
❌ **Prop drilling still needed** - must pass data down component tree  

### IMPLEMENTATION COMPLEXITY
- **Low**: Single hook file, straightforward logic
- **Refactor effort**: Replace `useApartments` calls with `useAppData`
- **Lines of code**: ~150-200 lines

---

## OPTION B: CONTEXT-BASED DATA LAYER (AppDataContext)

### Architecture
```js
// data/AppDataContext.jsx
const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);
  const [schools, setSchools] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  
  const apartmentService = useApartmentService();
  const schoolService = useSchoolService();
  const reviewerService = useReviewerService();
  
  const fetchApartments = async () => { /* ... */ };
  const fetchSchools = async () => { /* ... */ };
  const fetchReviewers = async () => { /* ... */ };
  
  const value = {
    apartments, schools, reviewers,
    loading, errors,
    fetchApartments, fetchSchools, fetchReviewers,
    refetchAll: () => Promise.all([fetchApartments(), fetchSchools(), fetchReviewers()])
  };
  
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => useContext(AppDataContext);
```

### Usage Pattern
```js
// App.jsx
<AppDataProvider>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</AppDataProvider>

// Component
const MyComponent = () => {
  const { apartments, fetchApartments } = useAppData();
  // Use data and actions
};
```

### PROS
✅ **Global state** - data accessible anywhere without prop drilling  
✅ **Decoupled fetching** - `fetchApartments()` independent of `fetchSchools()`  
✅ **Selective loading** - components fetch only what they need  
✅ **Independent refresh** - each entity has own refetch function  
✅ **Better performance** - no unnecessary re-renders (with optimization)  
✅ **Scalable** - easy to add new entities to context  
✅ **Data isolation** - error in one fetch doesn't affect others  
✅ **Lazy loading** - defer fetching until component needs it  
✅ **Testing friendly** - mock context provider per test  
✅ **React patterns** - follows standard context/provider pattern  
✅ **Granular loading states** - `loading.apartments`, `loading.schools`  
✅ **Better DevTools** - React DevTools shows context state  

### CONS
❌ **Provider nesting** - adds another wrapper in App.jsx  
❌ **More boilerplate** - context + provider + hook per entity group  
❌ **Re-render risk** - context changes trigger all consumers (needs optimization)  
❌ **Complex optimization** - requires `useMemo`, `useCallback`, or split contexts  
❌ **Harder debugging** - context flow less explicit than props  
❌ **Initial setup cost** - more files and structure upfront  
❌ **Context hell risk** - if not organized, many nested providers  

### IMPLEMENTATION COMPLEXITY
- **Medium**: Context setup, provider wrapping, optimization considerations
- **Refactor effort**: Wrap App, replace hook calls, add context imports
- **Lines of code**: ~200-300 lines (with optimization)

---

## COMPARISON MATRIX

| Criterion | Option A: useAppData Hook | Option B: AppDataContext |
|-----------|---------------------------|--------------------------|
| **Prop drilling** | Still needed | Eliminated |
| **Over-fetching** | High (all data always) | Low (fetch on demand) |
| **Scalability** | Poor (monolithic hook) | Good (modular context) |
| **Performance** | Poor (all data loads) | Good (selective loading) |
| **Code complexity** | Low | Medium |
| **Refactor effort** | Low | Medium |
| **Testing** | Hard (mock all data) | Easy (mock provider) |
| **Memory usage** | High (all data loaded) | Low (lazy loading) |
| **Data isolation** | Poor (bundled) | Good (independent) |
| **React patterns** | Non-standard | Standard (Context API) |
| **Maintenance** | Hard (tight coupling) | Easy (loose coupling) |
| **Initial dev time** | Fast | Slower |

---

## HYBRID OPTION C: SPLIT CONTEXTS (RECOMMENDED)

### Architecture
```js
// data/ApartmentDataContext.jsx
const ApartmentDataContext = createContext();

export const ApartmentDataProvider = ({ children }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const apartmentService = useApartmentService();
  
  const fetchApartments = async () => {
    setLoading(true);
    try {
      const data = await apartmentService.getAllApartments();
      setApartments(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { fetchApartments(); }, []);
  
  const value = { apartments, loading, error, fetchApartments };
  
  return <ApartmentDataContext.Provider value={value}>{children}</ApartmentDataContext.Provider>;
};

export const useApartmentData = () => useContext(ApartmentDataContext);

// data/SchoolDataContext.jsx (similar pattern)
// data/ReviewerDataContext.jsx (similar pattern)
```

### Usage
```js
// App.jsx
<ApartmentDataProvider>
  <SchoolDataProvider>
    <ReviewerDataProvider>
      <BrowserRouter>...</BrowserRouter>
    </ReviewerDataProvider>
  </SchoolDataProvider>
</ApartmentDataProvider>

// Component
const MyComponent = () => {
  const { apartments, fetchApartments } = useApartmentData();
  const { schools } = useSchoolData();
  // Only subscribe to needed contexts
};
```

### PROS
✅ **Best of both worlds** - global state + data isolation  
✅ **Optimal re-renders** - only consumers of changed context re-render  
✅ **Maximum flexibility** - mix and match data sources  
✅ **Clear boundaries** - each entity has own context  
✅ **Easy testing** - mock individual contexts  
✅ **Gradual migration** - migrate one entity at a time  
✅ **Independent scaling** - add/remove entities without affecting others  
✅ **Performance optimized** - no unnecessary data loading  

### CONS
❌ **Provider nesting** - multiple wrappers (can use compose pattern)  
❌ **More files** - one context per entity  
❌ **Verbose imports** - import multiple hooks  

---

## RECOMMENDATION

### For Small Apps (< 5 entities, simple relationships)
**→ OPTION A: useAppData Hook**
- Fast to implement
- Simple mental model
- Acceptable performance trade-offs

### For Medium Apps (5-10 entities, some relationships)
**→ OPTION B: AppDataContext (Single Context)**
- Better scalability
- Manageable with optimization
- Standard React pattern

### For Large Apps (> 10 entities, complex relationships)
**→ OPTION C: Split Contexts (Recommended)**
- Best performance
- Maximum maintainability
- Clear separation of concerns

---

## YOUR CASE: OPTION C (Split Contexts)

**Entities to manage:**
- Apartment
- School
- Reviewer
- Owner
- PropertyContract
- Property

**Why Option C:**
- 6+ entities with different access patterns
- Different pages use different data (ApartmentPage vs SchoolMapPage)
- Scalability critical for future growth
- Best performance (no over-fetching)
- Follows React best practices
- Easy gradual migration from current architecture

---

## MIGRATION PATH

### Current → Option A
1. Create `data/useAppData.jsx`
2. Merge `useApartments` logic + add school/reviewer
3. Replace all `useApartments()` calls with `useAppData()`
4. Destructure only needed data in components

### Current → Option B
1. Create `data/AppDataContext.jsx`
2. Move `useApartments` logic into provider
3. Wrap App with `<AppDataProvider>`
4. Replace `useApartments()` with `useAppData()`
5. Optimize with `useMemo`/`useCallback`

### Current → Option C (Recommended)
1. **Phase 1: Apartment**
   - Rename `data/useApartments.jsx` → `data/ApartmentDataContext.jsx`
   - Convert to context pattern (keep same logic)
   - Wrap App with `<ApartmentDataProvider>`
   - Update components to use `useApartmentData()`

2. **Phase 2: School**
   - Create `data/SchoolDataContext.jsx` (replicate pattern)
   - Create `middleware/schoolApiService.js`
   - Create `middleware/schoolServiceHooks.jsx`
   - Wrap App with `<SchoolDataProvider>`

3. **Phase 3: Reviewer**
   - Create `data/ReviewerDataContext.jsx`
   - Create `middleware/reviewerApiService.js`
   - Create `middleware/reviewerServiceHooks.jsx`
   - Wrap App with `<ReviewerDataProvider>`

4. **Phase 4+: Owner, Contract, Property**
   - Repeat pattern for remaining entities

---

## DECISION FACTORS

### Choose Option A if:
- App is small (< 5 entities)
- All data needed on most pages
- Fast delivery is priority
- Team unfamiliar with Context API

### Choose Option B if:
- App is medium-sized (5-10 entities)
- Some pages need all data
- Want standard React patterns
- Can invest in optimization

### Choose Option C if:
- App is large (> 10 entities) ✓
- Different pages need different data ✓
- Performance is critical ✓
- Long-term maintainability matters ✓
- **This is your case**

---

## IMPLEMENTATION EXAMPLE: OPTION C

### File Structure
```
src/
├── data/
│   ├── ApartmentDataContext.jsx
│   ├── SchoolDataContext.jsx
│   ├── ReviewerDataContext.jsx
│   ├── OwnerDataContext.jsx
│   └── ContractDataContext.jsx
├── middleware/
│   ├── services.js (centralized export)
│   ├── apartmentApiService.js
│   ├── apartmentServiceHooks.jsx
│   ├── schoolApiService.js
│   ├── schoolServiceHooks.jsx
│   └── ...
```

### Centralized Services Export
```js
// middleware/services.js
import ApartmentApiService from './apartmentApiService';
import SchoolApiService from './schoolApiService';
import ReviewerApiService from './reviewerApiService';

const Services = {
  apartment: ApartmentApiService,
  school: SchoolApiService,
  reviewer: ReviewerApiService,
};

export default Services;
```

### App.jsx Structure
```js
import { ApartmentDataProvider } from './data/ApartmentDataContext';
import { SchoolDataProvider } from './data/SchoolDataContext';
import { ReviewerDataProvider } from './data/ReviewerDataContext';

export default function App() {
  return (
    <BrowserRouter>
      <ApartmentDataProvider>
        <SchoolDataProvider>
          <ReviewerDataProvider>
            <Routes>...</Routes>
          </ReviewerDataProvider>
        </SchoolDataProvider>
      </ApartmentDataProvider>
    </BrowserRouter>
  );
}
```

---

## FINAL RECOMMENDATION: OPTION C (Split Contexts)

**Rationale:**
- You have 6+ entities (apartment, school, reviewer, owner, contract, property)
- Different pages use different data (ApartmentPage vs SchoolMapPage)
- Scalability is important for future growth
- Follows React best practices
- Easy to test and maintain
- Gradual migration path from current architecture
- Best performance characteristics
- Clear separation of concerns
