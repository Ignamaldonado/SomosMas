import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

let publicAxios = axios.create({
    baseURL: SERVER_BASE_URL
})

const publicService = {
    newsList: async () => {
        return await publicAxios.get('/news')
    },
    newsDetail: async (id) => {
        return await publicAxios.get(`/news/${id}`)
    },
    activitiesList: async () => {
        return await publicAxios.get('/activities')
    },
    activityDetail: async (id) => {
        return await publicAxios.get(`/activities/${id}`)
    }
}

export default publicService;