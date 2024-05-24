import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'https://artifacts-api-kdx3.onrender.com' }),
    tagTypes: ['Artifact', 'User'],
    endpoints: builder => ({})
})