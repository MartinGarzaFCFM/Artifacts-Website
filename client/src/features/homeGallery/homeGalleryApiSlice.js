import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const homeGalleryAdapter = createEntityAdapter({})
const initialState = homeGalleryAdapter.getInitialState()

export const homeGalleryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
    })
})