import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const artifactsAdapter = createEntityAdapter({})

const initialState = artifactsAdapter.getInitialState()

export const artifactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtifacts: builder.query({
            query: () => '/artifacts',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedArtifacts = responseData.map(artifact => {
                    artifact.id = artifact._id
                    return artifact
                });
                return artifactsAdapter.setAll(initialState, loadedArtifacts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Artifact', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Artifact', id }))
                    ]
                } else return [{ type: 'Artifact', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetArtifactsQuery,
} = artifactsApiSlice

// returns the query result object
export const selectArtifactsResult = artifactsApiSlice.endpoints.getArtifacts.select()

// creates memoized selector
const selectArtifactsData = createSelector(
    selectArtifactsResult,
    artifactsResult => artifactsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllArtifacts,
    selectById: selectArtifactById,
    selectIds: selectArtifactIds
    // Pass in a selector that returns the artifacts slice of state
} = artifactsAdapter.getSelectors(state => selectArtifactsData(state) ?? initialState)