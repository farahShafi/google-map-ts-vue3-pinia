# Google Maps Property Listing App

A Vue 3 + TypeScript property listing application with Google Maps integration for viewing, adding, and managing real estate properties.

## Tech Stack

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Type-safe development
- **Pinia** - State management (migrated from Vuex)
- **Vue Router 4** - Client-side routing
- **Google Maps** - @fawmi/vue-google-maps
- **Bootstrap 5** - UI styling

## Features

- Interactive Google Map displaying all properties as markers
- Info windows showing property details on hover/click
- Add new properties with address autocomplete
- Property list view with delete support
- Properties fetched once on app load and shared across views

## Project Structure

```
src/
├── main.ts                 # App entry point, router setup
├── App.vue                 # Root component - fetches properties on load
├── components/
│   ├── NavBar.vue          # Navigation (Map / View List / Add Property)
│   ├── MapView.vue         # Map view displaying all property markers
│   ├── NewProperty.vue     # Property submission form
│   └── PropertyList.vue    # Table view with delete per property
├── stores/
│   └── properties.ts       # Pinia store - properties state, fetch, add, delete
├── services/
│   ├── api.ts              # Axios instance (base URL: http://localhost:4000)
│   └── locations.ts        # API calls: getLocations, createLocation, deleteLocation
└── types/
    └── index.ts            # TypeScript interfaces
```

## Backend Setup

This app requires the **map-services** backend running via Docker on port `4000`.

> If the API is unreachable the Property List view will show an error prompting you to check your Docker setup.
> Last item cannot be deleted in backend

```bash
git clone <https://github.com/farahShafi/map-service>
```

Follow the `map-services` README to:
1. Build and run the Docker container
2. Start the database container
3. Confirm the API is available at `http://localhost:4000`

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/locations` | Fetch all properties |
| POST | `/locations` | Create a new property |
| DELETE | `/locations/:id` | Delete a property |

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run serve

# Build for production
npm run build
```

## Routes

| Path | Name | Description |
|------|------|-------------|
| `/` | Map | Google Map with property markers |
| `/properties` | PropertyList | Table of all properties with delete |
| `/new-property` | NewProperty | Form to add a new property |

## Environment

Requires a Google Maps API key with the Places library enabled. The key is configured in `main.ts`.

## Migration Notes

This project was migrated from Vue 2 + Vuex to Vue 3 + Pinia:

| Before | After |
|--------|-------|
| Vue 2.7 | Vue 3.5 |
| Vuex 3 | Pinia 3 |
| Options API | Composition API |
| vue2-google-maps | @fawmi/vue-google-maps |
| Bootstrap-Vue | Bootstrap 5 (plain CSS) |
| vue-router 3 | vue-router 4 |

## License

MIT
