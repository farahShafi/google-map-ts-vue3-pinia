<template>                                                                                   
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">                                  
      <div class="container-fluid">                                                            
        <router-link class="navbar-brand" :to="{ name: 'Map' }">HOME</router-link>             
                                                                                               
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"                 
  data-bs-target="#navbarNav">                                                                 
          <span class="navbar-toggler-icon"></span>                                            
        </button>                                                                              
                                                                                               
        <div class="collapse navbar-collapse" id="navbarNav">                                  
          <ul class="navbar-nav ms-auto">                                                      
            <!-- When logged in: show dropdown -->                                             
            <li v-if="store.loggedIn" class="nav-item dropdown">                               
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">          
                <em>User</em>                                                                  
              </a>                                                                             
              <ul class="dropdown-menu">                                                       
                <li><router-link class="dropdown-item" :to="{ name: 'NewProperty' }">Add       
  Property</router-link></li>                                                                  
                <li><a class="dropdown-item" href="#" @click="signOut">Sign Out</a></li>       
              </ul>                                                                            
            </li>                                                                              
                                                                                               
            <!-- When logged out: show sign in button -->                                      
            <li v-else class="nav-item">                                                       
              <button class="btn btn-outline-info" @click="signIn">Sign In</button>            
            </li>                                                                              
          </ul>                                                                                
        </div>                                                                                 
      </div>                                                                                   
    </nav>                                                                                     
  </template>


<script setup lang="ts">
// New Composition API with <script setup> 
// import Vue from 'vue'
 import { useRouter } from 'vue-router'
 import { useLoggedInStore } from '@/stores/loggedIn'

const router = useRouter()
const store = useLoggedInStore()

const signIn = () => {                                                                       
    store.setLoggedIn(true)                                           
    router.push({ name: 'NewProperty' })  // Add navigation!                                                                    
  }                                                                                            
                                                                                               
  const signOut = () => {                                                                      
    store.setLoggedIn(false)                                                                   
  }
</script>
