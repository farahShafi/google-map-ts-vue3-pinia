import { defineStore } from 'pinia'

export const useLoggedInStore = defineStore('loggedIn', {                     
    state: () => ({                                                          
      loggedIn: false                                           
    }),                                                                      
                                                                             
    getters: {                                                               
      isLoggedIn: (state): boolean => state.loggedIn                                             
    },                                                                       
                                                                             
    actions: {                                                               
      setLoggedIn(value: boolean): void {
            this.loggedIn = value
        }                      
    }                                                                        
  })                                                                         
                                              