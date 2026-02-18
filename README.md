# Google Maps Property Listing App

A Vue 3 + TypeScript property listing application with Google Maps integration for viewing and adding real estate properties.

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
- User authentication state management
- Geolocation support for map centering

## Project Structure

```
src/
├── main.ts                 # App entry point - Vue 3 setup
├── App.vue                 # Root component
├── components/
│   ├── NavBar.vue          # Navigation with auth controls
│   ├── MapView.vue         # Main map displaying all properties
│   ├── NewProperty.vue     # Property submission form
│   └── LoginView.vue       # Login placeholder
├── stores/                 # Pinia stores
│   ├── loggedIn.ts         # Authentication state
│   └── properties.ts       # Property data management
└── types/
    └── index.ts            # TypeScript interfaces
```

## Backend Setup

This app requires a Node.js backend API running on port `4000`. The frontend uses the following endpoints:

- `GET /locations` - Fetch all properties
- `POST /locations` - Create a new property

Clone and run the backend repo:

```bash
# Clone the backend repo
git clone <https://github.com/farahShafi/map-service>

# Install dependencies
npm install

# Start the server (must be running on port 4000)
follow the readme of map-services to set up and run
```

The API base URL is configured in `src/services/api.ts` as `http://localhost:4000`. Update this if your backend runs on a different port.

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run serve

# Build for production
npm run build
```

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

### Key Changes

**App Initialization:**
```typescript
// Vue 2
new Vue({ store, router, render: h => h(App) }).$mount('#app')

// Vue 3
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
```

**State Management:**
```typescript
// Vuex
mapGetters('moduleName', ['getter'])
commit('MUTATION', payload)

// Pinia
const store = useStore()
store.property = value  // Direct mutation
```

**Component Structure:**
```vue
<!-- Vue 2 Options API -->
<script lang="ts">
export default Vue.extend({
  data() { return { count: 0 } },
  methods: { increment() { this.count++ } }
})
</script>

<!-- Vue 3 Composition API -->
<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++
</script>
```

## Environment

Requires a Google Maps API key with Places library enabled. The key is configured in `main.ts`.

## License

MIT
