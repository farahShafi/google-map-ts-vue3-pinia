import { defineStore } from 'pinia'
import { Property } from '@/types' 

export const usePropertiesStore = defineStore('properties', {                     
    state: () => ({                                                          
      properties: [
        {
        formatted_address: '412 West 9000 South, Sandy, UT 84070\nSandy Sandy Utah United States',
        full_name: 'Timcoat Tim',
        price: '350k',
        description: 'Single Home, Built in 1998',
        lat: '40.5886089',
        lng: '-111.9034992'
        },
        {
        formatted_address: 'South Salt Lake, UT 84115\nSouth Salt Lake South Salt Lake, Salt Lake City Utah United States',
        full_name: 'Chris Hornok',
        price: '470k',
        description: 'Twin home, Built in 2010',
        lat: '40.6973223',
        lng: '-111.8784961'
        }
        ] as Property[]                                      
    }),                                                                      
                                                                             
    getters: {                                                               
      allProperties: (state): Property[] => state.properties                                     
    },                                                                       
                                                                             
    actions: {     
      addProperty(property: Property): void {                                
        this.properties.unshift(property)                                    
      },                                                                     
      setProperties(properties: Property[]): void {                          
        this.properties = properties                                         
      }
    }                                                          
                                                                           
  })                                                                         
                                              