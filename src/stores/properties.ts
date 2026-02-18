import { defineStore } from 'pinia'
import { Property } from '@/types' 
import { getLocations, createLocation } from '@/services/locations' 

export const usePropertiesStore = defineStore('properties', {                     
    state: () => ({                                                          
      properties: [] as Property[],  
      loading: false,
      error: null as string | null                                    
    }),                                                                      
                                                                             
    getters: {                                                               
      allProperties: (state): Property[] => state.properties                                     
    },                                                                       
                                                                             
    actions: {  
      async fetchProperties() {
        this.loading = true
        this.error = null
        try {
          const data = await getLocations()
          this.properties = data
        } catch(error: any) {
          this.error = error.message || 'Failed to load properties'
        } finally {
          this.loading = false
        }
        
      },   
      async addProperty(property: Property) {   
        this.loading = true
        this.error = null
        try {
          const newProperty = await createLocation(property)
          this.properties.unshift(newProperty)
        } catch(error: any) {
          this.error = error.message || 'Failed to add properties'
        } finally {
          this.loading = false
        }
        this.properties.unshift(property)                                    
      },                                                                     
      setProperties(properties: Property[]): void {                          
        this.properties = properties                                         
      }
    }                                                          
                                                                           
  })                                                                         
                                              