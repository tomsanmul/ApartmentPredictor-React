# ApartmentPredictor-React: project management

## Summary Product Goal

> The **ApartmentPredictor** application evolves through **sprints (seven incremental versions)**, building <mark>from a minimal proof-of-concept into a full-featured real-estate platform</mark> with modern UX, security, monetization, AI, and geospatial capabilities.

## Vesions Updated

Quick Evolution Summary

- **v1** → Proof of concept: just apartments list (coupled → decoupled fetch)
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v1](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v1.md)
- **v2** → Backend becomes rich domain model with relations and CRUD Apartment
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v2](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v2.md)
- **v3** → UI/UX jump: professional look + shared global state
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v3](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v3.md)
- **v4** → Reviews Create/Update and stars at Apartment Card dynamic route
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v4](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v4.md)
- **v5** → FilterApartments ~~Contractual visualization: detailed property/contract views~~
  - [ApartmentPredictor-React/docs/ApartmentPredictorReact_masterDoc_v5](https://github.com/AlbertProfe/ApartmentPredictor-React/blob/master/docs/ApartmentPredictorReact_masterDoc_v5.md)
- **v6** → Spatial visualization: maps views
- **v7** → Intelligence layer: AI prediction (Java-based ML)
- **v8** → Auth Production readiness: real user management & protection
- **v9** → Business model: payments / monetization

## Component tree

![](https://raw.githubusercontent.com/AlbertProfe/ApartmentPredictor-React/refs/heads/master/docs/diagrams/TREE-ApartmentPredictor_v2.png)

## Versions detail

**Version 1** delivers a simple read-only apartments list: React frontend fetches data via **axios** + **useEffect** from a basic Spring Boot REST endpoint (`GET /api/apartments`), starting coupled then refactored to decoupled services/hooks.

**Version 2** expands the backend into a rich domain model with full **CRUD** for apartments and relations (Schools, Property Contracts, Reviews, Owners, Reviewers), while frontend gains detailed forms and relational views.

**Version 3** brings professional polish: **Material-UI** components, persistent **Drawer** navigation, and **React Context** for shared global state (apartments list, user profile, light/dark theme).

### To evaluate order

**Version** achieves production readiness with **AWS Cognito** authentication, JWT tokens, protected routes, and login/register pages.

**Version** introduces business value via **Stripe** payments: frontend checkout flows, backend session creation, payment intents, and webhooks to manage premium access.

**Version** layers intelligence: an **AI Predictor** page using Java ML libraries (Smile/Weka regression, Deeplearning4j/Tribuo neural nets) to forecast rent/sale prices via `/api/predict`.

**Version** finalizes visualization: **Leaflet** Map page with apartment/school markers and a detailed **Property/Contract** view.

> This progression mirrors mature real-estate platforms — starting with listings, maturing through management, security, monetization, smart predictions, and spatial/contractual insights — creating a scalable, user-centric solution.

### Core Implementation Progression

| Version | Focus / Milestone                     | Frontend (React) Key Changes                                                                                                                        | Backend (Spring Boot) Key Changes                                                                                                                       |
| ------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1**   | Simple read-only apartments view      | `useEffect` + **axios** fetching apartments list from REST API (coupled logic)<br>→ Later refactor: move fetch to custom hook / service (decoupled) | Minimal REST endpoint: `GET /api/apartments`                                                                                                            |
| **2**   | Full Apartment CRUD + rich relations  | List → full **CRUD** forms<br>Display relations: Schools, Property Contract, Reviews, Owners, Reviewers                                             | Full **CRUD** endpoints for Apartment + related entities<br>JPA entities & repositories for relations (OneToMany/ManyToMany)                            |
| **3**   | Professional UI + global shared state | Introduce **MUI** (Material-UI)<br>**Drawer** (navigation) for all pages<br>**useContext** for: user data, apartments list, theme (light/dark)      | No major change (still serves full data)                                                                                                                |
| **x**   | Secure user authentication            | Login / Register pages<br>Protected routes (private route wrapper)<br>Store token in context / localStorage                                         | Integrate **AWS Cognito** (via Amplify or direct SDK)<br>JWT validation filter / security config                                                        |
| **x**   | Monetization via payments             | Payment form / checkout page<br>Handle Stripe session creation & redirect                                                                           | **Stripe API** integration: create payment intent / session endpoint<br>Webhook for payment success → update DB (e.g. premium property access)          |
| **x**   | AI-powered price / demand predictor   | New page / section: **Predictor**<br>Input form → show regression / prediction result                                                               | ML service layer: Java regression (Smile, Weka), simple ANN (Deeplearning4j / Tribuo)<br>Endpoint `/api/predict` (features → predicted rent/sale price) |
| **x**   | Geospatial + contract visualization   | **Map** page with **Leaflet** → markers for apartments & schools<br>**Property** page for detailed contract view                                    | Possible geo-indexing (if Postgres+PostGIS) or simple lat/lng filtering                                                                                 |

### More

> This progression mirrors common real-estate / property platforms: start with listings → add full management → secure access → payments → smart features → maps/contracts.
