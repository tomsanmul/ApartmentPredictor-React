# ApartmentPredictor-React masterDoc v6.1

## Summary

### Version Goal

Schools map and assign new school to an apartment

### References

- Server (BackEnd):
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)
- CodeSandbox:
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd) / [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)
  - Praga-CRUD: [1](https://codesandbox.io/p/devbox/react-dev-forked-cmrdn2) - [2](https://codesandbox.io/p/devbox/task-crud-forked-9dxyd5?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [3](https://codesandbox.io/p/devbox/task-crud-2-forked-l72dzj?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [4](https://codesandbox.io/p/sandbox/imagelarge-context-1-46rlf4) / [imageSizeContext](https://codesandbox.io/p/sandbox/wjylz5)
- React:
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity) / [Managing the state](https://react.dev/learn/managing-state)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html) / [useReducer](https://albertprofe.dev/reactjs/reactjs-hook-reducer.html) / [useContext](https://albertprofe.dev/reactjs/reactjs-hook-context.html)
- Labs:
  - [Lab#RE07-1: traffic lights simulation](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant](https://albertprofe.dev/reactjs/rjslab6-1.html)
  - Middleware & Navigation:
    - **mathsWeb**: [mathsWeb: repo](https://github.com/AlbertProfe/mathsWeb) / [mathsWeb: deployed](https://mathswebspace.netlify.app/)
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront](https://github.com/AlbertProfe/userBorrowBookFront/tree/master)
  - Filter
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront · GitHub](https://github.com/AlbertProfe/userBorrowBookFront)
    - [userBorrowBookFront/docs/userBorrowBookFront-v1.0.md](https://github.com/AlbertProfe/userBorrowBookFront/blob/master/docs/userBorrowBookFront-v1.0.md)

### Project Structure

```textile
$ tree
.
├── apartment
│   ├── ApartmentCreate.jsx
│   ├── ApartmentCRUD.jsx
│   ├── ApartmentDetail.jsx
│   ├── ApartmentItem.jsx
│   ├── ApartmentListContainer.jsx
│   ├── ApartmentList.jsx
│   ├── ApartmentReviewSummary.jsx
│   ├── ApartmentUpdate.jsx
│   └── filter
│       └── ApartmentFilter.jsx
├── App.css
├── App.jsx
├── assets
│   └── apartmentNewYork.jpg
├── auth
├── components
│   └── ApartmentForm.jsx
├── data
│   └── useApartments.jsx
├── hooks
├── index.css
├── layout
├── main.jsx
├── middleware
│   ├── apartmentApiService.js
│   ├── apartmentServiceHooks.jsx
│   └── apartmentService.jsx
├── navigation
│   ├── NavigationList.jsx
│   └── SideBar.jsx
├── pages
│   ├── ApartmentFilterPage.jsx
│   ├── ApartmentPage.jsx
│   ├── HomePage.jsx
│   └── SchoolMapPage.jsx
├── review
│   └── Reviews.jsx
└── school
    ├── SchoolCreate.jsx
    ├── SchoolMap.jsx
    └── SchoolMapView.jsx

14 directories, 29 files
```

New domain `school`:

```textile
$ tree
.
├── apartment
...
├── navigation
│   ├── NavigationList.jsx
│   └── SideBar.jsx
├── pages
│   ├── ....
│   └── SchoolMapPage.jsx
├── review
│   └── ...
└── school
    ├── SchoolCreate.jsx
    ├── SchoolMap.jsx
    └── SchoolMapView.jsx

14 directories, 29 files
```

## Middleware/Data Refactor guide

## 0. WHY - The problem

> Current architecture has only Apartment with full data layer implementation. School, Review, Owner and PropertyContract lack proper API services and data management. 

<mark>Data is either hardcoded or mocked in components</mark>. 

The system needs <mark>scalable</mark>, <mark>maintainable</mark> architecture supporting 6+ entities with independent data fetching, no prop drilling, and optimal performance. 

Current hook-based approach ([useApartments](cci:1://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/data/useApartments.jsx:3:0-36:2)) doesn't scale well for multiple entities. We need context-based architecture enabling global state access, selective loading, and clear separation of concerns across all entities while maintaining testability and following React best practices.

## 1. WHERE WE ARE - Current Architecture

**Source:** [datamodel-refactor.md](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/dataModel-refactor/datamodel-refactor.md:0:0-0:0)

**Current Status:**

- ✅ Apartment: Complete (API + context + hook)
- ❌ School, Review, Reviewer, Owner, Contract: Not implemented

**Architecture:** Two layers

- Layer 1 (middleware/): API services with axios
- Layer 2 (data/): State management hooks

**Flow:** Component → useApartments → useApartmentService → axios → backend

## 2. WHERE WE WANT TO GO - Options

**Source:** [data-layer-options.md](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/dataModel-refactor/data-layer-options.md:0:0-0:0)

**Three options analyzed:**

- Option A: Single hook for all data (simple but over-fetches)
- Option B: Single context for all data (better but re-render risks)
- **Option C: Split contexts per entity** ⭐ RECOMMENDED

**Why Option C:**

- 6+ entities to manage
- Best performance (no over-fetching)
- Independent scaling
- Follows React best practices

## 3. HOW TO GET THERE - Plan Implementation

**Source:** [refactor-plan-implement.md](cci:7://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/dataModel-refactor/refactor-plan-implement.md:0:0-0:0)

**5 Phases (22-31 hours total):**

1. Apartment Context (4-6h) - Convert useApartments to context
2. School Context + API (3-4h) - Build from scratch
3. Reviewer Context + API (3-4h) - Replace mock data
4. Owner, Contract, Property (6-8h) - Replicate pattern
5. Optimization (2-3h) - Provider composition, centralized services

**Pattern per entity:**

- Create API service (axios calls)
- Create service hooks + provider
- Create data context
- Update components

## 4. WHO WILL CODE - Review and validation

> After implementing the refactor, conduct comprehensive review covering architecture validation, code quality assessment, performance benchmarking, and testing coverage. 

- Verify all six entities follow consistent patterns with proper error handling and loading states. 

- Measure bundle size impact, initial load time, and re-render efficiency. 

- Ensure documentation is complete with migration notes and troubleshooting guides. 

- Validate API endpoint consistency across all services. 

- Check DevTools for context structure clarity. 

- Confirm rollback procedures are documented and tested. 

- Gather team feedback on developer experience and maintainability improvements before final production deployment.
