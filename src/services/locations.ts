import api from "./api";
 
import { Property } from '@/types' 

export async function getLocations() {
    const response = await api.get('/locations');
    return response.data
}

export async function createLocation(data: Property) {
    const response = await api.post('/locations', data)
    return response.data
}

export async function deleteLocation(id: string | number) {
    const response = await api.delete(`/locations/${id}`)
    return response.data
}