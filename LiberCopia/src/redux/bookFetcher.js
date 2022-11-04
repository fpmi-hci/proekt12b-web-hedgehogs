import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import TokenStorage from "../utils/storage/TokenStorage";

const token = TokenStorage.getToken().toString().replace(/^"(.*)"$/, '$1');
export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://proekt12b-hedgehogs.herokuapp.com/",
        prepareHeaders(headers) {
            headers.set("Authorization", `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['Books', 'OwnedBooks'],
    endpoints(build) {
        return {
            getAllBooks: build.query({
                query(arg) {
                    return ({
                        url: `api/books/g`,
                        method: 'GET',
                        params: {...arg}
                    })
                },
                providesTags: ['Books'],
            }),
            getBooksForCart: build.query({
                query() {
                    return ({
                        url: `api/books/cart`,
                        method: 'GET',
                    })
                },
                providesTags: ['Books'],
            }),
            deleteBookById: build.mutation({
                query(id) {
                    return ({
                        url: `api/books/${id}`,
                        method: 'DELETE'
                    })
                },
                invalidatesTags: ['Books', 'OwnedBooks'],
            }),
            updateBookById: build.mutation({
                query(body) {
                    return ({
                        url: `api/books/${body.id}`,
                        method: 'PUT',
                        body: body.body,
                    })
                },
                invalidatesTags: ['Books', 'OwnedBooks'],
            }),
            addBookToCart: build.mutation({
                query(id) {
                    return ({
                        url: `api/books/p/${id}`,
                        method: 'POST',
                    })
                },
                invalidatesTags: ['Books', 'OwnedBooks'],
            })
        }
    }

})

export const {
    useGetAllBooksQuery, useGetAllUserBooksQuery, useDeleteBookByIdMutation,
    useUpdateBookByIdMutation, useGetBooksForCartQuery, useAddBookToCartMutation,
} = bookApi
