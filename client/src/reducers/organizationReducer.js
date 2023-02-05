import { createSlice } from "@reduxjs/toolkit"
import { customFetch } from '../services/fetch'
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

const initialState = {
    loading: false,
    data: null,
    error: ''
}

export const fetchOrganization = createAsyncThunk('organization/fetchOrganization', async () => {
    try {
        const url = `${SERVER_BASE_URL}/organization`
        const properties = {
            method: 'get',
        }

        const res = await customFetch(url, properties)

        //Parse JSON socialLinks
        const organizationData = {...res.data}

        if (typeof organizationData.socialLinks === 'string') {
            organizationData.socialLinks = JSON.parse(res.data.socialLinks)
        }

        return organizationData
   }
   catch (error) {
       return error.message
   }
})

export const organizationSlice = createSlice({
    name: "organization",
    initialState,
    reducers: {
        update: (state, action) => {
            state.name = action.payload.name
            state.image = action.payload.image
            state.phone = action.payload.phone
            state.address = action.payload.address
            state.welcomeText = action.payload.welcomeText
            state.socialLinks  = action.payload.socialLinks
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchOrganization.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchOrganization.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ''
        })
        builder.addCase(fetchOrganization.rejected, (state, action) => {
            state.loading = false
            state.data = null
            state.error = action.error.message
        })
    }
})

export const { update } = organizationSlice.actions
export default organizationSlice.reducer