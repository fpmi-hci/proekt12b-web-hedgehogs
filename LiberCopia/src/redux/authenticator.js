import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const authApi = createApi(
    {
        reducerPath: "authApi",
        baseQuery: fetchBaseQuery({
            baseUrl: "https://proekt12b-hedgehogs.herokuapp.com/",
        }),
        tagTypes: ['token', 'user'],
        endpoints: (build) => ({
            signUp: build.mutation({
                query: (creds) => {
                    return ({
                        url: 'auth/sign-up',
                        method: 'POST',
                        body: creds
                    })
                }
            }),
            signIn: build.mutation({
                query: (creds) => {
                    return ({
                        url: 'auth/sign-in',
                        method: 'POST',
                        body: creds
                    })
                }
            }),

        })

    }
)


export const {useSignUpMutation, useSignInMutation} = authApi