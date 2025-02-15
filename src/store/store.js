import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import editPostSlice from './editPostSlice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        postData: editPostSlice
    }
})

export default store;