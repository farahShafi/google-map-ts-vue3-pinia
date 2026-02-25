import { defineStore } from 'pinia'
import { Property } from '@/types' 
import { getLocations, createLocation, deleteLocation } from '@/services/locations' 

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
          this.properties.unshift(newProperty)   // Only insert once
        } catch (error: any) {
          this.error = error.message || 'Failed to add property'
        } finally {
          this.loading = false
        }
      },                                                                     
      async deleteProperty(id: string | number) {
        try {
          this.loading = true

          await deleteLocation(id);

          // ✅ Remove from state after successful delete
          this.properties = this.properties.filter(p => p.id !== id);

        } catch (error: any) {
          console.error(error);
          alert(
            error?.response?.data?.message ||
            "Failed to delete property"
          );
        } finally {
          this.loading = false
        }
      },
      setProperties(properties: Property[]): void {
        this.properties = properties
      }
    }                                                          
                                                                           
  })                                                                         
                                              