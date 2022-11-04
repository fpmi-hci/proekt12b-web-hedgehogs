import "./book.css";
import image from "../../images/book.png";
import editIcon from "../../images/editIcon.svg"
import removeIcon from "../../images/removeIcon.svg"
import {useDeleteBookByIdMutation, useAddBookToCartMutation} from "../../redux/bookFetcher";
import {useDispatch, useSelector} from "react-redux";
import {addBookToCard, decreaseBookAmount, increaseBookAmount, removeBookFromCart} from "../../redux/cartSlice";
import {addBookToMore, removeBookFromMore} from "../../redux/moreSlice";
import {openMore, closeMore} from "../../redux/openmoreSlice";
import React, {useState} from 'react';


export const Book = (book) => {
    const {isAuth} = useSelector((state) => state.auth);
    const dispatch = useDispatch();



    const [deleteBook] = useDeleteBookByIdMutation();
    const [addToCart] = useAddBookToCartMutation();

    const [inOrder, setInOrder] = useState(false)



    const {title, authors, price, amount, year, publisher, description} = book.book;

    const handleDelete = async () => {
        dispatch(removeBookFromCart({book: book.book}));
        await deleteBook(book.book.id);
    }

    const handleAddToMore = () => {
        dispatch(removeBookFromMore({book: book.book}));
        dispatch(addBookToMore({book: book.book}));
        dispatch(openMore())
    }

    const [isInCart, setIsInCart] = useState(book.isInCart)
    const handleAddToCart = async () => {
        await addToCart(book.book.id);
        setIsInCart(true)
    }

    const handleRemove = () => {
        dispatch(removeBookFromCart({book: book.book}));
    }

    const increaseAmount = () => {
        if (book.amount < book.book.amount) {
            dispatch(increaseBookAmount(book.book.id));
        }
    }

    const decreaseAmount = () => {
        if (book.amount > 1) {
            dispatch(decreaseBookAmount(book.book.id));
        }
    }

    const handleAddToOrder = () => {
        if (inOrder){
            dispatch(removeBookFromCart({book: book.book}));
        }
        if (!inOrder){
            dispatch(addBookToCard({book: book.book}));
        }
        setInOrder(!inOrder)
    }

    return (
        <div className="book">
            {book.isInCart && !book.isInOrder? <div>
                <Checkbox label="In order" value={inOrder} onChange={handleAddToOrder}></Checkbox>
            </div> : null}
            <div className="book__header">
                <img src={image}/>
                <div className="book__title">
                   {title}
                </div>
                {book.isInCart && !book.isInOrder ? <div className="book__remove">
                    <img className="remove-icon" src={removeIcon} onClick={handleDelete}/>
                </div>: null}
            </div>
            <div className="book__text">
                <b>Authors:</b> {authors}
            </div>
            <div className="book__text">
                <b>Publisher:</b> {publisher}
            </div>
            <div className="book__text">
                <b>Price:</b> {`${price} $`}
            </div>
            <div className="book__text">
                <b>Amount:</b> {amount > 0 ? `${amount} left`: 'out of stock'}
            </div>
            <div className="book__text">
                <b>Description:</b> {description != null ? description: ' '}
            </div>
            <div className="book__button">
                {!book.isInMore && !isInCart && !book.isInOrder ?
                    <button className="addToCartBtn animated-btn" onClick={handleAddToMore}> More </button> : null}
                {book.isInMore && !isInCart && amount > 0 && isAuth?
                    <button className="addToCartBtn animated-btn" onClick={handleAddToCart}> Add To Cart </button> : null}
                {!book.isInMore && book.isInOrder ? <div className="amount__options">
                    <button className="decrease" onClick={decreaseAmount}>-</button>
                    <span className="amount">{book.amount}</span>
                    <button className="increase" onClick={increaseAmount}>+</button>
                </div> : null}
                {book.isInMore && isInCart ? <span> In Cart</span> : null}
            </div>
        </div>
    );
}
const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};