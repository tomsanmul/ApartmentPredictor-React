# ApartmentPredictor-React masterDoc v5

## Summary

### Version Goal

> The **Apartment Filter** feature provides a comprehensive search interface that enables users to discover apartments <mark>matching their specific requirements</mark>.

### Product Goal

> The **ApartmentPredictor** project aims to build a modern, intelligent real-estate platform that evolves from a simple apartment listings viewer into a comprehensive property management and prediction system. I

ts goal is to provide users with a seamless experience to browse, manage, and analyze real-estate data through a polished `React` frontend and a robust `Spring Boot` backend. 

As the platform grows, it introduces secure `AWS Cognito authentication`, `Stripe`-powered monetization, and AI-driven predictive analytics for rent and sale pricing. 

The final product integrates geospatial visualization with interactive maps, contract insights, and school proximity data, creating a rich, data-informed marketplace for both buyers and property managers. 

> Designed with scalability, usability, and cloud readiness in mind, 

**ApartmentPredictor** combines modern web design, cloud integration, and machine learning to deliver a complete, user-centric solution for exploring, valuing, and managing apartments intelligently.

### References

- Server (BackEnd):
  
  - [GitHub - AlbertProfe/ApartmentPredictor](https://github.com/AlbertProfe/ApartmentPredictor)
  - [Create JAR from backend Spring Boot](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/appends/DATA-create-JAR.md)

- CodeSandbox:
  
  - [Traffic Lights](https://codesandbox.io/p/sandbox/7f8ffd) / [Scientists Gallery 5](https://codesandbox.io/p/devbox/scientistsgallery4-forked-94z8k7)
  - Praga-CRUD: [1](https://codesandbox.io/p/devbox/react-dev-forked-cmrdn2) - [2](https://codesandbox.io/p/devbox/task-crud-forked-9dxyd5?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [3](https://codesandbox.io/p/devbox/task-crud-2-forked-l72dzj?workspaceId=ws_UM9jK6QFKQoLTL71feVrD1) - [4](https://codesandbox.io/p/sandbox/imagelarge-context-1-46rlf4)  / [imageSizeContext](https://codesandbox.io/p/sandbox/wjylz5)

- React:
  
  - [Describing the UI](https://react.dev/learn/describing-the-ui) / [Adding Interactivity](https://react.dev/learn/adding-interactivity) / [Managing the state](https://react.dev/learn/managing-state)
  - [Custom Hooks](https://albertprofe.dev/reactjs/reactjs-hook-custom.html) / [useEffect](https://albertprofe.dev/reactjs/reactjs-hook-effect.html) / [useState](https://albertprofe.dev/reactjs/reactjs-hook-state.html) / [useReducer](https://albertprofe.dev/reactjs/reactjs-hook-reducer.html) / [useContext](https://albertprofe.dev/reactjs/reactjs-hook-context.html)

- Labs:
  
  - [Lab#RE07-1: traffic lights simulation](https://albertprofe.dev/reactjs/rjslab7-1.html)
  - [Lab#RE01-1: API Rest Axios](https://albertprofe.dev/reactjs/rjslab1.html)
  - [Lab#RE06-1: healthyFood Restaurant](https://albertprofe.dev/reactjs/rjslab6-1.html)
  - Middleware & Navigation:
    - **mathsWeb**: [mathsWeb: repo](https://github.com/AlbertProfe/mathsWeb) /  [mathsWeb: deployed](https://mathswebspace.netlify.app/)
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront](https://github.com/AlbertProfe/userBorrowBookFront/tree/master)
  - Filter
    - **userBorrowBook**: [GitHub - AlbertProfe/userBorrowBookFront · GitHub](https://github.com/AlbertProfe/userBorrowBookFront)
    - [userBorrowBookFront/docs/userBorrowBookFront-v1.0.md](https://github.com/AlbertProfe/userBorrowBookFront/blob/master/docs/userBorrowBookFront-v1.0.md)

## Project Structure

```textile
[Fri Mar 20 07:53:49] albert@albert-VirtualBox:~/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src (master)
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
│   └── HomePage.jsx
└── review
    └── Reviews.jsx

13 directories, 25 files

.
```

## DATA

- [apartmentPredictorCRUD](https://documenter.getpostman.com/view/7473960/2sBXVeFs8L)

`Apartment` JSON:

```json
{
    "id": "5ca600bb-6071-4974-aaec-d854aa70aafc",
    "price": null,
    "area": 5,
    "bedrooms": 1,
    "bathrooms": 1,
    "stories": 1,
    "mainroad": "yes",
    "guestroom": "yes",
    "basement": "yes",
    "hotwaterheating": "yes",
    "airconditioning": "yes",
    "parking": 1,
    "prefarea": "yes",
    "furnishingstatus": "none",
    "reviews": [
        {
            "id": "a31a9482-3e47-4ec9-b8c9-9f3d3884c487",
            "title": "Nice Apartment in Fifth Avenue",
            "content": "This apartment exceeded my expectations. The location is perfect and the amenities are top-notch. Highly recommended for anyone looking for a comfortable stay.",
            "rating": 5,
            "reviewDate": "2025-12-12",
            "reviewer": null
        }
    ],
    "schools": [
        {
            "id": "87ffb224-a053-4c3d-b593-cab8cf2f457e",
            "name": "Sunrise School",
            "type": "religious",
            "location": "East Side",
            "rating": 4,
            "public": false
        },
        {
            "id": "a2afa2f1-bab1-4fa6-816e-b77b8f3e31cd",
            "name": "Sunrise High School",
            "type": "religious",
            "location": "Downtown",
            "rating": 4,
            "public": false
        },
        {
            "id": "d217c2be-5079-43c8-9ffb-631ea8642bba",
            "name": "Hill Institute",
            "type": "private",
            "location": "East Side",
            "rating": 1,
            "public": false
        }
    ],
    "contracts": [
        {
            "id": "51ac3c07-4dc9-4d30-81dc-11973aaa4191",
            "propertyContractCode": "PROP-001-123456",
            "urlContractPropertyDocument": "https://docs.example.com/contracts/PROP-001-123456.pdf",
            "contractDate": "2023-06-15",
            "valuePropertyContract": 250000,
            "typeProperty": "APARTMENT",
            "address": "123 Main Street, Apt 4B, New York, NY 10001",
            "owner": {
                "id": "00567d6b-d4d4-486b-b12b-73e50dcd524d",
                "fullName": "David Miller",
                "birthDate": "1982-02-24",
                "email": "david.miller@hotmail.com",
                "password": "password123",
                "idLegalOwner": "RLT-154743",
                "registrationDate": "2016-03-09",
                "qtyDaysAsOwner": 3639,
                "business": false,
                "active": false
            },
            "active": false
        }
    ]
}
```

## Filter feature

### Hooks

The component leverages React's `useState` hook to manage three primary state objects;

- `filters` (storing 14 <mark> filter criteria</mark>),
- `filteredApartments` (<mark>results</mark> array), 
- and UI states (`loading`, `error`). 

The custom `useApartmentService` hook at `.src/apartment/filter/ApartmentFilter.jsx:44` provides access to the apartment service layer, encapsulating API communication logic.

### Data Model & Filters

The filters object at `.rc/apartment/filter/ApartmentFilter.jsx:21-36` defines the complete filter schema with:

- **numeric fields** (maxPrice, minArea, minBedrooms, minBathrooms, minParking, minSchools), 
- **categorical selects** (furnishingStatus with three options), 
- **boolean dropdowns** (mainroad, guestroom, basement, hotwaterheating, airconditioning, prefarea), 
- and **text search** (textOnReview). 

The [handleFilterChange](cci:1://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/apartment/filter/ApartmentFilter.jsx:45:2-48:4) function <mark>updates filter state reactively</mark>, while [applyFilters](cci:1://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/apartment/filter/ApartmentFilter.jsx:50:2-64:4) `asynchronously` invokes `apartmentService.filterApartments(filters)` with proper error handling and loading states.

### Render

The UI employs Material-UI components within a responsive grid layout (`gridTemplateColumns: repeat(auto-fit, minmax(200px, 1fr))`). Fourteen `TextField` components render as either number inputs, select dropdowns, or text fields. 

Results populate a `TableContainer` with 13 columns displaying apartment attributes, conditional rendering for empty states, loading indicators, and error messages.

### Code

**Sskeleton:**

```jsx
const ApartmentFilter = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({maxPrice: "", ....});
  // State to hold the filtered apartments
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom hook to access the apartment service
  const apartmentService = useApartmentService();
  const handleFilterChange = (e) => {....};
  // send filters to middleware apartmentService
  const applyFilters = async () => {....};

  return (
      <Filters />
      {/* Apply Filters Button */}
      <Button onClick={applyFilters}>Apply Filters</Button>
      {/* Results Table */}
      <FilteredApartmentsTable>          
};

export default ApartmentFilter;
```

**Pseudocode/skeleton:**

```jsx
import {Button, ......, } from "@mui/material";
import React, { useState } from "react";
import { useApartmentService } from "../../middleware/apartmentServiceHooks";

const ApartmentFilter = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({maxPrice: "", ....});

  // State to hold the filtered apartments
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom hook to access the apartment service
  const apartmentService = useApartmentService();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
      // send filters to middleware apartmentService
      const data = await apartmentService.filterApartments(filters); 
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Filters Section */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
       Filter (Full) Apartments</Typography>
       {/* Filters render with all options */}
      <div>
         {/* ...... */}
        <TextField      
          value={filters.textOnReview}
          onChange={handleFilterChange}
        />
        {/* ...... */}
      </div>

      {/* Apply Filters Button */}
      <Button onClick={applyFilters}>
        {loading ? <CircularProgress size={24} /> : "Apply Filters"}
      </Button>

      {/* Error Message */}
      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          Error: {error}
        </Typography>
      )}

      {/* Results Table */}
      <br />
      <Typography color="success" style={{ marginBottom: "20px" }}>
        There are {filteredApartments.length} results.
      </Typography>
      <TableContainer component={Paper}>
        <Table>
           {/* ...... */}
          <TableBody>
            {filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell>{apartment.id}</TableCell>
                     {/* ...... */}
                  </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ApartmentFilter;
```

**Coupled component:**

```jsx
import {
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useApartmentService } from "../../middleware/apartmentServiceHooks";

const ApartmentFilter = () => {
  // State to hold the filter values
  const [filters, setFilters] = useState({
    maxPrice: "",
    minArea: "",
    minBedrooms: "",
    minBathrooms: "",
    minParking: "",
    furnishingStatus: "",
    mainroad: "",
    guestroom: "",
    basement: "",
    hotwaterheating: "",
    airconditioning: "",
    prefarea: "",
    minSchools: "",
    textOnReview: "",
  });

  // State to hold the filtered apartments
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom hook to access the apartment service
  const apartmentService = useApartmentService();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apartmentService.filterApartments(filters);
      setFilteredApartments(data);
    } catch (error) {
      console.error("Filter error:", error);
      setError(error.message || "Failed to fetch data");
      setFilteredApartments([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      {/* Filters Section */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Filter (Full) Apartments</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        <TextField
          label="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Area"
          name="minArea"
          type="number"
          value={filters.minArea}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Bedrooms"
          name="minBedrooms"
          type="number"
          value={filters.minBedrooms}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Bathrooms"
          name="minBathrooms"
          type="number"
          value={filters.minBathrooms}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          label="Min Parking"
          name="minParking"
          type="number"
          value={filters.minParking}
          onChange={handleFilterChange}
          variant="outlined"
        />
        <TextField
          select
          label="Furnishing Status"
          name="furnishingStatus"
          value={filters.furnishingStatus}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="furnished">Furnished</MenuItem>
          <MenuItem value="semi-furnished">Semi-Furnished</MenuItem>
          <MenuItem value="unfurnished">Unfurnished</MenuItem>
        </TextField>
        <TextField
          select
          label="Main Road"
          name="mainroad"
          value={filters.mainroad}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Guest Room"
          name="guestroom"
          value={filters.guestroom}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Basement"
          name="basement"
          value={filters.basement}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Hot Water Heating"
          name="hotwaterheating"
          value={filters.hotwaterheating}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Air Conditioning"
          name="airconditioning"
          value={filters.airconditioning}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          select
          label="Preferred Area"
          name="prefarea"
          value={filters.prefarea}
          onChange={handleFilterChange}
          variant="outlined"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="true">Yes</MenuItem>
          <MenuItem value="false">No</MenuItem>
        </TextField>
        <TextField
          label="Min Schools"
          name="minSchools"
          type="number"
          value={filters.minSchools}
          onChange={handleFilterChange}
          variant="outlined"
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Text on Review"
          name="textOnReview"
          value={filters.textOnReview}
          onChange={handleFilterChange}
          variant="outlined"
        />
      </div>

      {/* Apply Filters Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={applyFilters}
        disabled={loading}
        style={{ margin: "20px 0" }}
      >
        {loading ? <CircularProgress size={24} /> : "Apply Filters"}
      </Button>

      {/* Error Message */}
      {error && (
        <Typography color="error" style={{ marginBottom: "20px" }}>
          Error: {error}
        </Typography>
      )}

      {/* Results Table */}
      <br />
      <Typography color="success" style={{ marginBottom: "20px" }}>
        There are {filteredApartments.length} results.
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Bedrooms</TableCell>
              <TableCell>Bathrooms</TableCell>
              <TableCell>Parking</TableCell>
              <TableCell>Furnishing</TableCell>
              <TableCell>Main Road</TableCell>
              <TableCell>Guest Room</TableCell>
              <TableCell>Basement</TableCell>
              <TableCell>Hot Water</TableCell>
              <TableCell>AC</TableCell>
              <TableCell>Preferred Area</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApartments.length > 0
              ? filteredApartments.map((apartment) => (
                  <TableRow key={apartment.id}>
                    <TableCell>{apartment.id}</TableCell>
                    <TableCell>${apartment.price}</TableCell>
                    <TableCell>{apartment.area} sq ft</TableCell>
                    <TableCell>{apartment.bedrooms}</TableCell>
                    <TableCell>{apartment.bathrooms}</TableCell>
                    <TableCell>{apartment.parking}</TableCell>
                    <TableCell>{apartment.furnishingStatus || "N/A"}</TableCell>
                    <TableCell>{apartment.mainroad ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.guestroom ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.basement ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.hotwaterheating ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.airconditioning ? "Yes" : "No"}</TableCell>
                    <TableCell>{apartment.prefarea ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell colSpan={14} style={{ textAlign: "center" }}>
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
            {loading && (
              <TableRow>
                <TableCell colSpan={14} style={{ textAlign: "center" }}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ApartmentFilter;
```

## screenshots

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/RENDER-filter-1.png)  

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/RENDER-filter-2.png)

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/RENDER-filter-3.png)

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/RENDER-filter-4.png)

## package.json

### Dependencies Overview

**Runtime Dependencies:**

- axios (^1.13.2): HTTP client for making API requests to fetch apartment data
- `react` (^19.2.0): Core React library for building UI components
- `react-dom` (^19.2.0): Renders React components to the DOM
- `@mui` dependencies

**Development Dependencies:**

- `@vitejs/plugin-react`: Enables React support in Vite bundler
- `babel-plugin-react-compiler`: Optimizes React component compilation
- `eslint` & plugins: Code linting for quality and style enforcement
- `@types/react`: TypeScript type definitions for React
- `vite`: Fast development server and build tool replacing Create React App

### Code .json

```json
{
  "name": "apartmentpredictor-react",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.9",
    "@mui/material": "^7.3.9",
    "axios": "^1.13.2",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "babel-plugin-react-compiler": "^1.0.0",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

## Tech Stack

- IDE: Visual Code Studio
- `nvm` Node Version Manager 0.39.7: [GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm)
- `NodeJS 22.2.0`
- Create project by **VITE**
  - https://vite.dev/ / [Getting Started | Vite](https://vite.dev/guide/)
  - `npm create vite@latest`
- `axios` library
- <mark>MUI</mark> components librar
