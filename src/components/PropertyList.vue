<template>
  <div class="container mt-4">
    <h2>Properties</h2>

    <div v-if="store.properties.length === 0" class="alert alert-info mt-3">
      No properties available.
    </div>

    <table v-else class="table table-striped mt-3">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Price</th>
          <th>Description</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(property, index) in store.properties" :key="index">
          <td>{{ property.full_name }}</td>
          <td>{{ property.formatted_address }}</td>
          <td>{{ property.price }}</td>
          <td>{{ property.description }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="deleteProperty(property.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { usePropertiesStore } from '@/stores/properties'

const store = usePropertiesStore()

const deleteProperty = (id: string | number) => {
  store.deleteProperty(id)
}
</script>
