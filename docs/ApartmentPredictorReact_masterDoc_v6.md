# ApartmentPredictor-React masterDoc v6

## Summary

### Version Goal

> The **SchoolMapPage** feature enables users to <mark>create new schools</mark> and visualize them on an <mark>interactive map</mark> using a **grid-based layout.**

Core Components:

- **Page Container**: Entry point that renders the feature
  - **Grid Layout**: Responsive two-column layout using Material-UI Grid (desktop) that stacks vertically on mobile devices
    - **School Creation Form**: Left panel with form interface for inputting new school data (currently placeholder)
    - **Interactive Map**: Right panel featuring Leaflet map with OpenStreetMap tiles, centered on Manhattan with zoom controls and marker support

> Users can input school information through the creation form and see schools displayed as interactive markers with popups on the <mark> Leaflet map</mark>. 
> 
> The grid layout provides simultaneous access to both creation and visualization interfaces.

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

## MUI Grid

The [SchoolMap](cci:1://file:///home/albert/MyProjects/Sandbox/ApartmentPredictorProject-React/ApartmentPredictor-React/src/school/SchoolMap.jsx:5:0-16:2) component creates a **responsive two-column layout** using <mark>Material-UI's Grid system.</mark>

Structure Breakdown

**`<Grid container spacing={2} sx={{ width: '100%' }}>`**

- `container`: Defines this as the parent grid container
- `spacing={2}`: Adds 16px gaps (2 × 8px theme units) between grid items
- `sx={{ width: '100%' }}`: Ensures full-width layout

**Left Column: `<Grid size={{ xs: 12, md: 6 }}>`**

- `xs: 12`: On extra-small screens (mobile), takes full width (12/12 columns)
- `md: 6`: On medium+ screens (desktop), takes half width (6/12 columns)
- Contains `<SchoolCreate />` - the school creation form

**Right Column: `<Grid size={{ xs: 12, md: 6 }}>`**

- Same responsive sizing as left column
- Contains `<SchoolMapView />` - the `Leaflet` <mark>map</mark> visualization

### Responsive Behavior

- **Mobile (xs)**: Both components stack vertically, each taking 100% width
- **Desktop (md+)**: Components sit side-by-side, each taking 50% width with spacing between them

> This creates a classic **form-beside-map** pattern where users can input school data on the left and immediately see visual feedback on the map to the right, with automatic mobile optimization.

```jsx
const SchoolMap = () => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SchoolCreate />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SchoolMapView />
      </Grid>
    </Grid>
  );
};

export default SchoolMap;
```

## LeafLet map

- [leafletjs](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org)

> <mark>Leaflet</mark> is the leading **open-source JavaScript library for mobile-friendly interactive maps**. Weighing just about 42 KB of JS, it has all the mapping [features](https://leafletjs.com/#features) most developers ever need.

<mark>Leaflet</mark> is designed with *simplicity*, *performance* and *usability* in mind. It works efficiently across all major desktop and mobile platforms, can be extended with lots of [plugins](https://leafletjs.com/plugins.html), has a beautiful, easy to use and [well-documented API](https://leafletjs.com/reference.html "Leaflet API reference") and a simple, readable [source code](https://github.com/Leaflet/Leaflet "Leaflet source code repository on GitHub") that is a joy to [contribute](https://github.com/Leaflet/Leaflet/blob/main/CONTRIBUTING.md "A guide to contributing to Leaflet") to.

### Leaflet Map Components

**`<MapContainer>`**

- Core wrapper that initializes the Leaflet map instance
- `center={[40.7831, -73.9712]}`: Sets initial map viewport center (latitude, longitude)
- `zoom={13}`: Controls initial zoom level (1-18 scale, where 13 shows neighborhood-level detail)
- `scrollWheelZoom={false}`: Prevents accidental zooming while scrolling the page
- Must have defined height/width to render properly

**`<TileLayer>`**

- Loads the actual map imagery as tiles
- `url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"`: 
  - `{s}`: Subdomain (a, b, or c) for load balancing
  - `{z}`: Zoom level
  - `{x}`, `{y}`: Tile coordinates at that zoom level
- Tiles are fetched dynamically as you pan/zoom the map
- Different providers (Google, Mapbox, etc.) use different URL patterns

**`<Marker>`**

- Places a pin/icon at specific coordinates
- `position={[40.7831, -73.9712]}`: Where the marker appears on the map
- Interactive by default (clickable)

**`<Popup>`**

- Child of `<Marker>` that displays information when marker is clicked
- Can contain HTML content (`<br />` for line breaks)
- Automatically positioned above the marker with a pointer

**How They Work Together**

→`MapContainer` creates the <mark>map</mark> canvas 

→ `TileLayer` fills it with <mark>imagery</mark> 

→ `Markers` <mark>overlay</mark> location pins 

→ `Popups` provide <mark>interactivity</mark> *when markers are clicked.*

```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SchoolMapView = () => {
    const manhattanPosition = [40.7831, -73.9712];

    return (
        <div style={{ height: '680px', width: '80%' }}>
            <p>School Map</p>
            <MapContainer center={manhattanPosition} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={manhattanPosition}>
                    <Popup>
                        This is a popup. <br /> for a school map.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default SchoolMapView
```

## Screeshoots

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/screenshots/RENDER-map-1.png)

## package.json

### Dependencies Overview

**Runtime Dependencies:**

- axios (^1.13.2): HTTP client for making API requests to fetch apartment data
- `react` (^19.2.0): Core React library for building UI components
- `react-dom` (^19.2.0): Renders React components to the DOM
- `@mui` dependencies
- `leafLet 5.0.0`

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
    "leaflet": "^1.9.4",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-leaflet": "^5.0.0",
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
- `leafLet` library for React
- <mark>MUI</mark> components library
