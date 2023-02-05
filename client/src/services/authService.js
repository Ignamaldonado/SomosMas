import axios from 'axios'

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

axios.defaults.baseURL = `${SERVER_BASE_URL}/users/auth`

const authService = {
    checkEmail: async (data) => {
        return await axios.post('/checkEmail', data)
    },
    checkPassword: async (data) => {
        return await axios.post("/checkPassword", data)
    },
    register: async (data) => {
        return await axios.post("/register", data)
    },
    login: async (data) => {
        return await axios.post("/login", data)
    }
}

export default authService;