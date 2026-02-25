import { createApp } from 'vue'                                            
  import { createRouter, createWebHistory } from 'vue-router'                
  import { createPinia } from 'pinia'                                        
  import VueGoogleMaps from '@fawmi/vue-google-maps'                         
  import App from './App.vue'

 // Styles
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap/dist/js/bootstrap.bundle.min.js'
  import './assets/css/custom.css'

// Components
  import MapView from './components/MapView.vue'
  import NewProperty from './components/NewProperty.vue'
  import PropertyList from './components/PropertyList.vue'

// Create router
const router = createRouter({                                              
    history: createWebHistory(),  // replaces mode: 'history'
    routes: [
  {
    path: '/',
    name: 'Map',
    component: MapView,
    meta: { title: 'Properties' }
  },
  {
    path: '/new-property',
    name: 'NewProperty',
    component: NewProperty,
    meta: { title: 'Add Property' }
  },
  {
    path: '/properties',
    name: 'PropertyList',
    component: PropertyList,
    meta: { title: 'Property List' }
  }
] 
})

// Create Pinia                                                         
  const pinia = createPinia()                                                
                                                                             
// Create and mount app                                                 
  const app = createApp(App)                                                 
                                                                             
  app.use(router)                                                            
  app.use(pinia)                                                             
  app.use(VueGoogleMaps, {                                                   
    load: {                                                                  
      key: 'AIzaSyC4Nm5sj16hCNkuwFOAxtO1j6bAUalevGA',                                                   
      libraries: 'places'                                                    
    }                                                                        
  })                                                                         
                                                                             
  app.mount('#app')
