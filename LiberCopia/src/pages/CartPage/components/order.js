import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useMakeOrderMutation} from "../../../redux/orderApi";
import {Book} from "../../../components/Book/Book";
export const Order = (props) => {

    const items = useSelector((state) => Object.values(state.cart));
    const totalPrice = items.reduce((total, item) => {
        return total += item.book.price * item.amount;
    }, 0)

    return (
        <div className="books">
            <div className="book__container">
                {items ? items.map(book => <Book key={book.book.id} book={book.book} amount={book.amount}
                                                 isInOrder={true}/>) : null}
            </div>
            <div className='order-container'>
                <div className="total-price">
                    <b>Total price:</b> {totalPrice}$
                </div>
                {items.length !== 0 ? <button className="make-order-btn" >Order</button> : null}
            </div>
        </div>
    )
}
