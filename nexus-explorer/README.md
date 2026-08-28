# Nexus Explorer — Character Intelligence Dashboard

Nexus Explorer is an internal research console used by a media-analytics team to browse a large public character database, keep a personal watchlist, and view real-time data seamlessly. The application strictly adheres to provided design mockups and uses React, React Router, Context API, and TanStack React Query to fetch data from the public Rick and Morty API.

## Screenshots
*(Replace with actual screenshots in submission)*
- Dashboard: `[Screenshot Placeholder]`
- Detail Page: `[Screenshot Placeholder]`
- Dark Theme: `[Screenshot Placeholder]`

## Setup Instructions
1. Ensure Node.js is installed.
2. Clone this repository and navigate into the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the Vite development server.
5. Open the local address (e.g. `http://localhost:5173`) in your browser.

## Folder Structure
```text
src/
├── api/          # API endpoint constants and HTTP fetch wrappers
├── app/          # React Router and React Query client configuration
├── components/   # Reusable UI elements grouped by layout, ui, stats, characters, etc.
├── contexts/     # Global state management using React Context API
├── hooks/        # Custom React hooks
├── pages/        # Route-level components for each screen
├── utils/        # Formatting and logger utilities
├── App.jsx       # Root component providing global providers
├── main.jsx      # Application entry point with global error listeners
└── index.css     # Global CSS styles including theme variables and layout
```

## Features
- **Dashboard**: Live summary counters, recently viewed list, and greetings.
- **Characters List**: Paginated grid, status/species/gender filtering, debounced search.
- **Character Detail**: In-depth character info and episode appearances using batch API calls.
- **Episodes & Locations**: Manually implemented fetching (Promises and Async/Await) with loading and error states.
- **Watchlist**: Persisted character tracking.
- **Compare Tool**: Side-by-side character comparison via URL queries.
- **Settings**: Dynamic theme switching (Light/Dark) and runtime React Query caching configurations.

## React Concepts Used (REQ Table)
| # | Requirement | Implementation Location |
|---|---|---|
| REQ-1 | useRef to touch the DOM | `src/components/layout/Topbar.jsx` |
| REQ-2 | useRef as a persisted mutable value | `src/hooks/useDebouncedValue.js` |
| REQ-3 | useRef used to cache an expensive computation | `src/hooks/useExpensiveCache.js` |
| REQ-4 | Immutable state updates (spread operator) | `src/contexts/watchlist/WatchlistProvider.jsx` & `CharacterFilters.jsx` |
| REQ-5 | Controlled inputs & single state object form | `src/components/characters/CharacterFilters.jsx` & `ComparePage.jsx` |
| REQ-6 | useEffect with 3 dependency array forms | `Topbar.jsx`, `Breadcrumbs.jsx`, `EpisodeListPage.jsx` |
| REQ-7 | Calling API with Promises (.then/.catch) | `src/pages/EpisodeListPage.jsx` |
| REQ-8 | Calling API with async/await + try/catch | `src/pages/LocationListPage.jsx` |
| REQ-9 | React Router setup | `src/app/router.jsx` |
| REQ-10| Link and NavLink | `src/components/layout/Sidebar.jsx` & `CharacterCard.jsx` |
| REQ-11| BrowserRouter vs HashRouter | `src/app/router.jsx` (Switch via `VITE_ROUTER_MODE`) |
| REQ-12| Passing parameters via navigation | `CharacterDetailPage.jsx`, `CharacterListPage.jsx`, `ComparePage.jsx` |
| REQ-13| Context API for a low-frequency value | `src/contexts/theme/ThemeContext.jsx` |
| REQ-14| Split Context (state & actions) | `src/contexts/watchlist/WatchlistContext.jsx` |
| REQ-15| Modular context structure | `src/contexts/theme/` & `src/contexts/watchlist/` folders |
| REQ-16| Context performance pitfall (demonstrated/fixed) | `src/components/characters/CharacterCard.jsx` & `WatchlistProvider.jsx` |
| REQ-17| Co-located state vs global state | *See table below* |
| REQ-18| React Query setup | `src/app/queryClient.js` & `src/app/AppProviders.jsx` |
| REQ-19| React Query loading/error handling | `src/pages/CharacterListPage.jsx` & `DashboardPage.jsx` |
| REQ-20| Auto caching + background sync | `src/pages/SettingsPage.jsx` & `DashboardPage.jsx` |
| REQ-21| Prefetching on card/pagination hover | `src/components/characters/CharacterCard.jsx` & `Pagination.jsx` |
| REQ-22| Error Boundary + Fallback UI + logger | `src/components/error/ErrorBoundary.jsx` & `src/main.jsx` |

## Router Mode (REQ-11)
The application dynamically selects between `BrowserRouter` and `HashRouter` based on the `VITE_ROUTER_MODE` environment variable. `BrowserRouter` (default) uses standard URL paths (e.g., `/characters/1`), providing a cleaner structure but requires specific server configuration for SPA routing on static hosts (like Netlify or GitHub Pages). `HashRouter` uses hash portions of the URL (e.g., `/#/characters/1`), which avoids server configuration issues entirely, making it highly reliable for GitHub Pages. 

## State Placement (REQ-17)
| State Type | Location | Justification |
|---|---|---|
| Search Filters & Page | URL (useSearchParams) | Allows sharing the exact filtered/paginated view directly via link. Survives refreshes automatically. |
| Theme & Watchlist | Context API / localStorage | Global requirements across multiple disparate components. Read-heavy, write-light. Needs persistence across sessions. |
| Recently Viewed | Component State / localStorage | Only required inside the Dashboard. Co-locating it reduces global context clutter, while localStorage keeps the history active between sessions. |
| API Data | React Query Cache | Provides automatic refetching, deduping, background sync, and loading state management without polluting React's virtual DOM state. |

## Context Performance (REQ-16)
- **Naive Implementation renders (estimated)**: Toggling a watchlist item would re-render the entire grid of 20 cards because the context value object identity changes on every toggle, failing React's equality check.
- **Fixed Implementation renders**: After splitting into `WatchlistStateContext` and `WatchlistActionsContext`, memoizing values, and wrapping the card in `React.memo`, toggling a character only causes **1** re-render (the exact card that changed its watchlisted state), effectively improving performance exponentially on a large grid.

## React Query vs useEffect + fetch
| Feature | React Query (Characters Page) | plain useEffect + fetch (Episodes Page) |
|---|---|---|
| **Caching** | Automatic based on staleTime/gcTime. Instant paint on revisit. | None natively. Navigating back forces a full re-fetch + loading spinner. |
| **Duplicate Requests** | Automatically deduped. | Requires manual tracking/guards to prevent double firing. |
| **Loading/Error States** | Native `isLoading`, `isError`, `isFetching` flags provided. | Must manually define and toggle multiple `useState` boolean flags. |
| **Stale Data / Background Refetch** | Built-in via `refetchOnWindowFocus` and placeholder data. | Requires manual intervals or event listeners for window focus + tracking logic. |
| **Pagination** | Handled gracefully with query keys; easily pre-fetched. | Fetch triggers new effect sequence on every page click. |
| **Request Cancellation** | Out-of-the-box support for query aborting. | Requires explicit `AbortController` integration inside `useEffect` cleanup. |
| **Prefetching** | Trivial `queryClient.prefetchQuery` calls. | Highly complex to manually build a reliable cache system that shares pre-fetched data. |
| **Code Volume** | Minimal boilerplate. | High boilerplate (managing state, abort controllers, try/catch, etc.). |

**Conclusion**: I would choose `useEffect + fetch` only when interacting with legacy REST endpoints that don't fit the caching paradigm, or for very isolated one-off requests (like submitting a simple POST contact form) where adding the React Query bundle overhead isn't justified. For any read-heavy, data-driven dashboard, React Query is indispensable.

## Error Handling Explanation (REQ-22)
An Error Boundary catches UI rendering errors, lifecycle errors, and errors during component updates. However, it **does not** catch:
1. Asynchronous code errors (e.g., `setTimeout`, unhandled promise rejections).
2. Errors thrown inside event handlers (e.g., button `onClick`).
3. Server-side rendering errors or errors thrown in the root scope outside the React tree.

Therefore, we register `window.onerror` and `window.addEventListener('unhandledrejection')` in `main.jsx` to route these uncovered errors into our unified `logError` utility, ensuring no silent failures escape tracking.
