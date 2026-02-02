<template>                                                                                   
    <div class="container-fluid mainDiv">                                                      
      <div class="card-group">                                                                 
        <!-- Left Card: Form -->                                                               
        <div class="card">                                                                     
          <div class="card-header">Add New Property</div>                                      
          <div class="card-body">                                                              
            <form @submit.prevent="onSubmit">                                                  
              <!-- Address with Autocomplete -->                                               
              <div class="mb-3">                                                               
                <label class="form-label">Property address:</label>                            
                <GMapAutocomplete                                                              
                  class="form-control"                                                         
                  placeholder="Enter address"                                                  
                  @place_changed="setPlace"                                                    
                />                                                                             
                <small class="text-muted">Please see the Map for exact location</small>        
              </div>                                                                           
                                                                                               
              <!-- Owner's Name -->                                                            
              <div class="mb-3">                                                               
                <label class="form-label">Owner's Name:</label>                                
                <input                                                                         
                  class="form-control"                                                         
                  v-model="form.full_name"                                                     
                  required                                                                     
                  placeholder="Enter name"                                                     
                />                                                                             
              </div>                                                                           
                                                                                               
              <!-- Price -->                                                                   
              <div class="mb-3">                                                               
                <label class="form-label">Asking price:</label>                                
                <input                                                                         
                  class="form-control"                                                         
                  v-model="form.price"                                                         
                  required                                                                     
                  placeholder="Enter price"                                                    
                />                                                                             
              </div>                                                                           
                                                                                               
              <!-- Description -->                                                             
              <div class="mb-3">                                                               
                <textarea                                                                      
                  class="form-control"                                                         
                  v-model="form.description"                                                   
                  placeholder="Enter Description..."                                           
                  rows="3"                                                                     
                />                                                                             
              </div>                                                                           
                                                                                               
              <!-- Submit Button -->                                                           
              <div class="text-center">                                                        
                <button type="submit" class="btn btn-info">Submit</button>                     
              </div>                                                                           
            </form>                                                                            
          </div>                                                                               
        </div>                                                                                 
                                                                                               
        <!-- Right Card: Map -->                                                               
        <div class="card">                                                                     
          <div class="card-header">Map</div>                                                   
          <div class="card-body">                                                              
            <GMapMap :center="center" :zoom="12" style="width: 100%; height: 500px">           
              <GMapInfoWindow                                                                  
                v-if="currentPlace"                                                            
                :options="infoOptions"                                                         
                :position="infoPosition"                                                       
                :opened="infoOpened"                                                           
              >                                                                                
                <div class="popoverStyle">                                                     
                  Address: {{ currentPlace.formatted_address }}                                
                </div>                                                                         
              </GMapInfoWindow>                                                                
              <GMapMarker                                                                      
                v-for="(m, key) in markers"                                                    
                :key="key"                                                                     
                :position="m.position"                                                         
                :clickable="true"                                                              
                @click="onMarkerClick(m, key)"                                                 
                @mouseover="toggleInfo(m, key)"                                                
                @mouseleave="infoOpened = false"                                               
              />                                                                               
            </GMapMap>                                                                         
          </div>                                                                               
        </div>                                                                                 
      </div>                                                                                   
    </div>                                                                                     
  </template>

<script setup lang="ts">                                                                     
  import { ref, onMounted } from 'vue'                                                         
  import { useRouter } from 'vue-router'                                                       
  import { usePropertiesStore } from '@/stores/properties'                                     
  import { MapPosition, Marker, Property } from '@/types' 

   onMounted(() => {                                                                            
    geolocate()                                                                                
  }) 


interface PlaceResult {
  formatted_address: string
  geometry: {
    location: {
      lat(): number
      lng(): number
    }
  }
}

interface FormData {
  address: PlaceResult | null
  full_name: string
  price: string
  description: string
}

// Router and Store                                                                          
  const router = useRouter()                                                                   
  const propertiesStore = usePropertiesStore() 

// Reactive state (convert all data() properties)                                            
  const form = ref<FormData>({                                                                 
    address: null,                                                                             
    full_name: '',                                                                             
    price: '',                                                                                 
    description: ''                                                                            
  })                                                                                           
  const center = ref<MapPosition>({ lat: 40.7607793, lng: -111.8910474 })                      
  const markers = ref<Marker[]>([])                                                            
  const places = ref<PlaceResult[]>([])                                                        
  const currentPlace = ref<PlaceResult | null>(null)                                           
  const infoPosition = ref<MapPosition | null>(null)                                           
  const infoOptions = ref({                                                                    
    pixelOffset: { width: 0, height: -35 }                                                     
  })                                                                                           
  const infoOpened = ref(false)                                                                
  const infoCurrentKey = ref<number | null>(null)   
  
  // Lifecycle hook                                                                            
  onMounted(() => {                                                                            
    geolocate()                                                                                
  })  
  
  // Methods (convert this.x to x.value)                                                       
  const onSubmit = (): void => {                                                               
    if (form.value.address?.formatted_address) {                                               
      const propertyNew: Property = {                                                          
        formatted_address: form.value.address.formatted_address,                               
        full_name: form.value.full_name,                                                       
        price: form.value.price,                                                               
        description: form.value.description,                                                   
        lat: form.value.address.geometry.location.lat().toString(),                            
        lng: form.value.address.geometry.location.lng().toString()                             
      }                                                                                        
      propertiesStore.addProperty(propertyNew)                                                 
      router.push({ name: 'Map' })                                                             
    } else {                                                                                   
      alert('Please complete the Form to submit')                                              
    }                                                                                          
  }                                                                                            
                                                                                               
  const setPlace = (place: PlaceResult): void => {                                             
    currentPlace.value = place                                                                 
    addMarker()                                                                                
  }                                                                                            
                                                                                               
  const addMarker = (): void => {                                                              
    if (currentPlace.value) {                                                                  
      const marker: MapPosition = {                                                            
        lat: currentPlace.value.geometry.location.lat(),                                       
        lng: currentPlace.value.geometry.location.lng()                                        
      }                                                                                        
      markers.value = []                                                                       
      markers.value.push({ position: marker })                                                 
      places.value.push(currentPlace.value)                                                    
      center.value = marker                                                                    
      form.value.address = currentPlace.value                                                  
    }                                                                                          
  }                                                                                            
                                                                                               
  const geolocate = (): void => {                                                              
    navigator.geolocation.getCurrentPosition((position) => {                                   
      center.value = {                                                                         
        lat: position.coords.latitude,                                                         
        lng: position.coords.longitude                                                         
      }                                                                                        
    })                                                                                         
  }                                                                                            
                                                                                               
  const getPosition = (marker: Marker): MapPosition => {                                       
    return {                                                                                   
      lat: marker.position.lat,                                                                
      lng: marker.position.lng                                                                 
    }                                                                                          
  }                                                                                            
                                                                                               
  const onMarkerClick = (m: Marker, key: number): void => {                                    
    center.value = m.position                                                                  
    toggleInfo(m, key)                                                                         
  }                                                                                            
                                                                                               
  const toggleInfo = (marker: Marker, key: number): void => {                                  
    infoPosition.value = getPosition(marker)                                                   
    if (infoCurrentKey.value === key) {                                                        
      infoOpened.value = !infoOpened.value                                                     
    } else {                                                                                   
      infoOpened.value = true                                                                  
      infoCurrentKey.value = key                                                               
    }                                                                                          
  }  

// export default Vue.extend({
//   name: 'NewProperty',
//   data() {
//     return {
//       form: {
//         address: null,
//         full_name: '',
//         price: '',
//         description: ''
//       } as FormData,
//       center: { lat: 40.7607793, lng: -111.8910474 } as MapPosition,
//       markers: [] as Marker[],
//       places: [] as PlaceResult[],
//       currentPlace: null as PlaceResult | null,
//       infoPosition: null as MapPosition | null,
//       infoOptions: {
//         pixelOffset: {
//           width: 0,
//           height: -35
//         }
//       },
//       infoOpened: false,
//       infoCurrentKey: null as number | null
//     }
//   },
//   mounted() {
//     this.geolocate()
//   },
//   computed: {
//     ...mapGetters('allProperties', ['allProperties'])
//   },
//   methods: {
//     ...mapActions('allProperties', ['addProperty']),
//     onSubmit(): void {
//       if (this.form.address?.formatted_address) {
//         const propertyNew: Property = {
//           formatted_address: this.form.address.formatted_address,
//           full_name: this.form.full_name,
//           price: this.form.price,
//           description: this.form.description,
//           lat: this.form.address.geometry.location.lat().toString(),
//           lng: this.form.address.geometry.location.lng().toString()
//         }
//         this.addProperty(propertyNew)
//         this.$router.push({ name: 'Map' })
//       } else {
//         alert('Please complete the Form to submit')
//       }
//     },
//     setPlace(place: PlaceResult): void {
//       this.currentPlace = place
//       this.addMarker()
//     },
//     addMarker(): void {
//       if (this.currentPlace) {
//         const marker: MapPosition = {
//           lat: this.currentPlace.geometry.location.lat(),
//           lng: this.currentPlace.geometry.location.lng()
//         }
//         this.markers = []
//         this.markers.push({ position: marker })
//         this.places.push(this.currentPlace)
//         this.center = marker
//         this.form.address = this.currentPlace
//       }
//     },
//     geolocate(): void {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.center = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         }
//       })
//     },
//     getPosition(marker: Marker): MapPosition {
//       return {
//         lat: marker.position.lat,
//         lng: marker.position.lng
//       }
//     },
//     onMarkerClick(m: Marker, key: number): void {
//       this.center = m.position
//       this.toggleInfo(m, key)
//     },
//     toggleInfo(marker: Marker, key: number): void {
//       this.infoPosition = this.getPosition(marker)
//       if (this.infoCurrentKey === key) {
//         this.infoOpened = !this.infoOpened
//       } else {
//         this.infoOpened = true
//         this.infoCurrentKey = key
//       }
//     }
//   }
// })
</script>
