import React from 'react';
import {Book} from "../../../components/Book/Book";
import {useGetAllBooksQuery} from "../../../redux/bookFetcher";

export const Books = (props) => {

    const {data, isFetching} = useGetAllBooksQuery(props.queryParams)

    return (
        <div className="books">
            {!isFetching ? data.map(book => <Book key={book.id} book={book} isInCart={false}/>) : null}
        </div>
    )
}
