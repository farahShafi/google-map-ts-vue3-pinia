<template>
  <div id="root">
    <GMapMap ref="mymap" :center="startLocation" :zoom="11" style="width: 100%">
      <GMapInfoWindow
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
      >
        <div class="popoverStyle">
          Address: {{ infoContent.formatted_address }}<br />
          Owner: {{ infoContent.full_name }}<br />
          Price: {{ infoContent.price }}<br />
          Description: {{ infoContent.description }}<br />
        </div>
      </GMapInfoWindow>

      <GMapMarker
        v-for="(item, key) in propertiesStore.allProperties"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @mouseover="toggleInfo(item, key)"
        @mouseleave="infoOpened = false"
        @click="toggleInfo(item, key)"
      />
    </GMapMap>
  </div>
</template>

<script setup lang="ts">                                                                     
  import { ref } from 'vue'                                                                    
  import { usePropertiesStore } from '@/stores/properties'                                     
  import { Property, MapPosition } from '@/types'                                              
                                                                                               
  // Store                                                                                     
  const propertiesStore = usePropertiesStore()                                                 
                                                                                               
  // Reactive state                                                                            
  const startLocation = ref<MapPosition>({ lat: 40.5649781, lng: -111.8389726 })               
  const infoPosition = ref<MapPosition | null>(null)                                           
  const infoContent = ref({                                                                    
    formatted_address: '',                                                                     
    full_name: '',                                                                             
    price: '',                                                                                 
    description: '',                                                                           
    lat: '',                                                                                   
    lng: ''                                                                                    
  })                                                                                           
  const infoOpened = ref(false)                                                                
  const infoCurrentKey = ref<number | null>(null)                                              
  const infoOptions = ref({                                                                    
    pixelOffset: { width: 0, height: -35 }                                                     
  })                                                                                           
                                                                                               
  // Methods                                                                                   
  const getPosition = (marker: Property): MapPosition => {                                     
    return {                                                                                   
      lat: parseFloat(marker.lat),                                                             
      lng: parseFloat(marker.lng)                                                              
    }                                                                                          
  }                                                                                            
                                                                                               
  const toggleInfo = (marker: Property, key: number): void => {                                
    infoPosition.value = getPosition(marker)                                                   
    infoContent.value.full_name = marker.full_name                                             
    infoContent.value.formatted_address = marker.formatted_address                             
    infoContent.value.price = marker.price                                                     
    infoContent.value.description = marker.description                                         
                                                                                               
    if (infoCurrentKey.value === key) {                                                        
      infoOpened.value = !infoOpened.value                                                     
    } else {                                                                                   
      infoOpened.value = true                                                                  
      infoCurrentKey.value = key                                                               
    }                                                                                          
  }                                                                                            

// interface InfoContent {
//   formatted_address: string
//   full_name: string
//   price: string
//   description: string
//   lat: string
//   lng: string
// }

// export default Vue.extend({
//   name: 'MapView',
//   data() {
//     return {
//       startLocation: {
//         lat: 40.5649781,
//         lng: -111.8389726
//       } as MapPosition,
//       infoPosition: null as MapPosition | null,
//       infoContent: {
//         formatted_address: '',
//         full_name: '',
//         price: '',
//         description: '',
//         lat: '',
//         lng: ''
//       } as InfoContent,
//       infoOpened: false,
//       infoCurrentKey: null as number | null,
//       infoOptions: {
//         pixelOffset: {
//           width: 0,
//           height: -35
//         }
//       }
//     }
//   },
//   computed: {
//     ...mapGetters('allProperties', ['allProperties'])
//   },
//   methods: {
//     getPosition(marker: Property): MapPosition {
//       return {
//         lat: parseFloat(marker.lat),
//         lng: parseFloat(marker.lng)
//       }
//     },
//     toggleInfo(marker: Property, key: number): void {
//       this.infoPosition = this.getPosition(marker)
//       this.infoContent.full_name = marker.full_name
//       this.infoContent.formatted_address = marker.formatted_address
//       this.infoContent.price = marker.price
//       this.infoContent.description = marker.description

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
