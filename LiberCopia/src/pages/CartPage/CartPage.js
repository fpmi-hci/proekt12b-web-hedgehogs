import {useDispatch, useSelector} from "react-redux";
import {Book} from "../../components/Book/Book";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './cartPage.css'
import {useMakeOrderMutation} from "../../redux/orderApi";
import {useGetBooksForCartQuery,useUpdateBookByIdMutation} from "../../redux/bookFetcher";
import {addBookToCard,removeBookFromCart} from "../../redux/cartSlice";
import React from 'react';
import {Order} from "./components/order";

const CartPage = () => {

    const dispatch = useDispatch();

    const {data, isFetching} = useGetBooksForCartQuery()
    const totalPrice= 0
    // const totalPrice = data.reduce((total, item) => {
    //     return total += item.book.price * item.amount;
    // }, 0)


    const parseDate = (year) => {
        let check = year.toString();
        check = new Date(Date.parse(check));
        return check.toISOString().split('T')[0];
    }
    return (
        <Container fluid>
            <Row>
                <Col sm={8}>
                    <div className="cart__page">
                        <div className="book__container">
                            {!isFetching ? data.map(book => <Book key={book.id} book={book} isInCart={true}/>) : null}
                        </div>
                    </div>
                </Col>
                <Col sm={4}>
                    <div className='order-container'>
                        <Order></Order>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CartPage;