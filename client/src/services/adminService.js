import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

let adminAxios = axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
    }
})

const adminService = {
    categoriesPanel: async () => {
        return await adminAxios.get(`/categories`)
    },
    createTestimonial: async (data) => {
        return await adminAxios.post(`/testimonials/add`, data)
    },
    updateTestimonial: async (data, id) => {
        return await adminAxios.put(`/testimonials/${id}`, data)
    },    
    deleteTestimonial: async (data, id) => {
        return await adminAxios.delete(`/testimonials/delete/${id}`, data)
    }
}

export default adminService;