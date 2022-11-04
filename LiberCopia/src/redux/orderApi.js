import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import TokenStorage from "../utils/storage/TokenStorage";

const token = TokenStorage.getToken().toString().replace(/^"(.*)"$/, '$1');

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://proekt12b-hedgehogs.herokuapp.com/",
        prepareHeaders(headers) {
            headers.set("Authorization", `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints(build) {
        return {
            makeOrder: build.mutation({
                query(body) {
                    return ({
                        url: "/api/orders",
                        method: "POST",
                        body: body
                    });
                }
            })
        }
    }
})


export const {useMakeOrderMutation} = orderApi;