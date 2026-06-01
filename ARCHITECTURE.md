# OFFSET Carbon Credit Platform - Architecture Overview

## 1. Project Summary

`OFFSET` is a React + TypeScript single-page application built with Vite. It presents a carbon credit marketplace with a portfolio tracking experience, mock purchasing flow, and data visualization for climate asset management.

The app supports:
- Landing page, about page, and contact overlay for unauthenticated users
- Auth modal with login/signup behavior
- Workspace for authenticated users with dashboard, marketplace, analysis, and portfolio views
- Local state persistence via `localStorage`
- Mock API data for inventory and purchases

## 2. Technology Stack

- Frontend framework: React 18
- Language: TypeScript
- Bundler / dev server: Vite
- Styling: Tailwind CSS + Tailwind Animate
- UI primitives: Radix UI, Lucide icons
- Animation: Framer Motion, GSAP
- Form validation: React Hook Form + Zod
- Data visualization: Recharts / custom chart components
- Mock backend: browser `localStorage`
- Routing: `react-router-dom` (wrapped around the app, but navigation is mostly view-state driven)

## 3. Repository Structure

Top-level files:
- `package.json` — dependencies and scripts
- `vite.config.ts` — Vite config and alias `@` → `./src`
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript project structure
- `tailwind.config.js` — Tailwind configuration

Key source folders:
- `src/` — application source code
  - `components/` — UI components organized by feature
  - `context/` — React context providers
  - `hooks/` — reusable hooks
  - `lib/` — API, mappers, mock data, shared types
  - `utils/` — utilities such as PDF generation

## 4. Application Entry & Bootstrapping

`src/main.tsx`
- Mounts React app into DOM.
- Wraps `App` with `BrowserRouter` and `PortfolioProvider`.

`src/App.tsx`
- Root UI controller and top-level state container.
- Controls auth modal, view navigation, selected project, and project loading.
- Uses `useEffect` to poll project data every 5 seconds when logged in.
- Lazy-loads major pages using `React.lazy` and `Suspense`.
- Uses localStorage to remember login status and choose initial view.

## 5. State & Context

### Local component state in `App`

`App` manages:
- `isAuthModalOpen`, `authMode`, `showContact`
- `currentView` determines which workspace page is active
- `selectedProject` for project detail view
- `projects` from backend / mock API
- `isProjectsLoading` for loading UX
- `isLoggedIn` persisted in `localStorage`

### Portfolio state in `PortfolioContext`

`src/context/PortfolioContext.tsx`
- Manages owned assets and retirement certificates.
- Exposes `registerPurchase` and `retireCredits` actions.
- Persists portfolio and certificate state to `localStorage`.
- Loads saved portfolio state during initialization.

> This context separates portfolio lifecycle from the app shell and allows portfolio pages/components to access purchase history and retirements globally.

## 6. API Layer & Mock Data

`src/lib/api.ts`
- Contains API helper functions and a local-storage-backed mock API.
- Config values:
  - `API_BASE` from `import.meta.env.VITE_API_BASE`
  - `USE_MOCK_API` from `import.meta.env.VITE_USE_MOCK_API` (currently defaults to `true`)
- Exposed functions:
  - `getBatches()` — fetch list of carbon credit batches
  - `getBatchDetail(batchId)` — fetch batch details
  - `getBatchAvailability(batchId)` — get inventory availability
  - `createPurchase(payload)` — process a purchase request

Mock API behavior:
- inventory is stored in `localStorage` using `INVENTORY_STORAGE_KEY`
- purchase cache is stored in `PURCHASE_CACHE_STORAGE_KEY`
- implements idempotent specific-batch purchase handling
- updates quantity, sold counts, versions, and batch status

`src/lib/mock-data.ts`
- Defines marketplace demo data and filters
- Contains pre-defined carbon credit projects with detailed metadata
- Provides registry options and sorting/filtering values

## 7. Data Mapping & Types

`src/lib/types.ts`
- Defines domain models like `CarbonCredit`, `ViewState`, `CertificateAsset`, and API response shapes.
- Includes both UI model fields and server/mock response fields.

`src/lib/mappers.ts`
- Converts API/market data (`BatchListItem` / `BatchDetail`) into the UI-facing `CarbonCredit` shape.
- Normalizes field names and fills defaults for image, registry, project type, status, etc.

## 8. Navigation Model

The app uses a view-state navigation model instead of URL-based routing for the main workspace:
- `landing`
- `marketplace`
- `portfolio`
- `dashboard`
- `analyze`
- `about`
- `contact`

`App` manages current view and conditionally renders pages.
`WorkspaceShell` provides the workspace panel UI and animated transitions between views.
`Header` renders different navigation controls for authenticated vs non-authenticated users.

## 9. Component Architecture

### Layout components
- `Header.tsx` — top navigation, mobile menu, auth actions, workspace tabs.
- `WorkspaceShell.tsx` — animated view container for dashboard / marketplace / analyze / portfolio.
- `IntroAnimation.tsx` — page-level entry animation wrapper.
- `AuthModal.tsx` — sign-in / sign-up UI.

### Landing & public pages
- `LandingPage.tsx` — marketing homepage.
- `AboutPage.tsx` — product/about content.
- `ContactPage.tsx` — contact overlay.

### Marketplace
- `Explorer.tsx` — marketplace browsing experience with filters, search, pagination.
- `CreditGrid.tsx` — grid of project cards.
- `ProjectDetail.tsx` — detail view for a selected carbon credit project.

### Portfolio
- `Portfolio.tsx` — portfolio dashboard, KPIs, charts, and retirement flow.
- `ActiveProjectsSection.tsx` — active asset listing.
- `AddAssetModal.tsx` / `RetireCreditsModal.tsx` — modal workflows.
- `CertificatePDF.tsx` — PDF generation for retired credits.

### Dashboard & analysis
- `Dashboard.tsx` — overview page for logged-in users.
- `AnalyzePage.tsx` — analytics and insights page.

## 10. Persistence Strategy

- `localStorage` is used for:
  - login state (`offset_isLoggedIn`)
  - mock inventory and purchase cache in the API layer
  - portfolio assets and certificates

This allows the app to behave as a self-contained demo environment without a real backend.

## 11. Build & Development

`package.json` scripts:
- `dev` — `vite`
- `build` — `tsc -b && vite build`
- `preview` — `vite preview`
- `lint` — `eslint .`
- `typecheck` — `tsc --noEmit -p tsconfig.app.json`

Vite alias:
- `@` resolves to `src/`

TypeScript config:
- `tsconfig.json` uses project references to `tsconfig.app.json` and `tsconfig.node.json`
- `baseUrl` is `.` and `paths` maps `@/*` → `./src/*`

## 12. Key Architectural Patterns

- Component-driven design: feature folders under `src/components`
- Separation of concerns: `lib/` for API + domain logic, `context/` for shared state
- Declarative UI state: view state and project selection managed at top-level `App`
- Local-first mock-data API: enables offline demo and easier development
- Session persistence via browser storage for user and portfolio state

## 13. Recommended Enhancements

Potential next steps:
- Add real backend integration by disabling `USE_MOCK_API` and wiring `VITE_API_BASE`
- Introduce URL routes for workspace views using `react-router-dom`
- Extract auth state into a dedicated `AuthContext`
- Add strong schema validation for API responses
- Add unit/integration tests for key data and workflow paths

---

This document describes the current architecture and major implementation details for the `OFFSET` carbon credit platform.
