import {Book} from "../../components/Book/Book";
import React, {useRef,useState} from 'react';
import {bookApi, useGetAllBooksQuery} from "../../redux/bookFetcher";
import './homePage.css'
import {Books} from "./components/books";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch, useSelector} from "react-redux";
import {closeMore} from "../../redux/openmoreSlice";

export const HomePage = () => {
    let filters = {
        author: '',
        title:   '',
        category:'',
        publisher:'',
        sort:'',
    }

    const [category, setCategory] = useState('')
    const [dropDownLabel, setDropDownLabel] = useState("None")

    const [queryParams, setQueryParams] = useState({
        author: '',
        title:   '',
        category:'',
        publisher:'',
    })


    const itemInMore = useSelector((state) => Object.values(state.more));
    const openMore = useSelector((state) => Object.values(state.openmore));


    const author = useRef(null)
    const publisher = useRef(null)
    const title = useRef(null)
    const [novel, setNovel] = React.useState(false);
    const [detectives, setDetectives] = React.useState(false);
    const [classic, setClassic] = React.useState(false);

    const handleNovel = () => {
        setNovel(!novel);
        setDetectives(false);
        setClassic(false);
        if (!novel)
        {
            setCategory("novel")
        }else {
            setCategory("")
        }
    };

    const handleDetectives = () => {
        setDetectives(!detectives);
        setNovel(false);
        setClassic(false);
        if (!detectives)
        {
            setCategory("detectives")
        }else {
            setCategory("")
        }
    };

    const handleClassic = () => {
        setClassic(!classic);
        setNovel(false);
        setDetectives(false);
        if (!classic)
        {
            setCategory("classic")
        }else {
            setCategory("")
        }
    };

    const handleFilter = () => {
        filters.title = title.current.value
        filters.author = author.current.value
        filters.publisher = publisher.current.value
        filters.category = category
        if (dropDownLabel === 'Desc'){
            filters.sort = 2;
        } if (dropDownLabel === 'Asc'){
            filters.sort = 1;
        }
        setQueryParams(filters)
    };

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleMenuOne = () => {
        setDropDownLabel("Desc")
        setOpen(false);
    };

    const handleMenuTwo = () => {
        setDropDownLabel("Asc")
        setOpen(false);
    };

    const handleMenuThree = () => {
        setDropDownLabel("None")
        setOpen(false);
    };
    const dispatch = useDispatch();

    const handleCloseMore = () => {
        dispatch(closeMore())
    };


    return (
        <Container fluid>
            <Row>
                <Col sm={3}>
                    <div  className="bookFilters">
                        <h1>React Search</h1>
                        <div className="search">
                            <input ref={author} placeholder="Author"/>
                        </div>
                        <div className="search">
                            <input ref={publisher} placeholder="Publisher"/>
                        </div>
                        <div className="checkBoxGroup">
                            <Checkbox
                                label="Novel"
                                value={novel}
                                onChange={handleNovel}
                            />
                            <Checkbox
                                label="Detectives"
                                value={detectives}
                                onChange={handleDetectives}
                            />
                            <Checkbox
                                label="Classic"
                                value={classic}
                                onChange={handleClassic}
                            />
                        </div>
                        <div className="searchButton">
                            <button onClick={handleFilter} >Search</button>
                        </div>
                    </div>
                </Col>
                {openMore[0] ? <Col  sm={6}>
                    <div>
                        <div className="filtersMiddle">
                            <input ref={title} placeholder ="Title"/>
                        </div>
                        <div className="sortFilter">
                            <span>Sort by price</span>
                            <Dropdown
                                open={open}
                                trigger={<button onClick={handleOpen}>{dropDownLabel}</button>}
                                menu={[
                                    <button onClick={handleMenuOne}>Desc</button>,
                                    <button onClick={handleMenuTwo}>Asc</button>,
                                    <button onClick={handleMenuThree}>None</button>,
                                ]}
                            />
                        </div>
                        <Books queryParams={queryParams}></Books>
                    </div>
                </Col>
                    :
                    <Col  sm={9}>
                        <div>
                            <div className="filtersMiddle">
                                <input ref={title} placeholder ="Title"/>
                            </div>
                            <div className="sortFilter">
                                <span>Sort by price</span>
                                <Dropdown
                                    open={open}
                                    trigger={<button onClick={handleOpen}>{dropDownLabel}</button>}
                                    menu={[
                                        <button onClick={handleMenuOne}>Desc</button>,
                                        <button onClick={handleMenuTwo}>Asc</button>,
                                        <button onClick={handleMenuThree}>None</button>,
                                    ]}
                                />
                            </div>
                            <Books queryParams={queryParams}></Books>
                        </div>
                    </Col>}
                {openMore[0]  ? <Col  sm={3}>
                    <div className="BookMore">
                        <button onClick={handleCloseMore}> close </button>
                        <div className="books">
                            {itemInMore ? itemInMore.map(book => <Book key={book.book.id} book={book.book} amount={book.amount}
                                                            isInOrder={false} isInMore={true} isInCart={false}/>) : null}
                        </div>
                    </div>
                </Col>: null}
            </Row>
        </Container>
    )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
        <label>
            <input type="checkbox" checked={value} onChange={onChange} />
            {label}
        </label>
    );
};

const Dropdown = ({ open, trigger, menu }) => {
    return (
            <div className="dropdown">
                {trigger}
                {open ? (
                    <ul className="menu">
                        {menu.map((menuItem, index) => (
                            <li key={index} className="menu-item">{menuItem}</li>
                        ))}
                    </ul>
                ) : null}
            </div>
    );
};