import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';

// import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Order from '../Order/Order';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const size = 10;
    const liveUrl = "https://possessed-spell-91387.herokuapp.com";
    const localUrl = "http://localhost:5000";
    useEffect(() => {
        fetch(`${liveUrl}/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setSrcPdt(data.products);
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                console.log(pageNumber);
                setPageCount(pageNumber);
            })
    }, [page]);


    // console.log(products);
    const [cart, setCart] = useCart();
    useEffect(() => {
        // console.log("Inside effect");
        const cart = getStoredCart();
        // console.log("IE: Cart: ",cart);
        const cartItem = [];
        if (cart.length) {

            for (const key in cart) {
                const item = products.find(product => product.key === key);
                const quantity = cart[key];
                item.quantity = quantity;
                cartItem.push(item);
            }
            setCart(cartItem);
        }

    }, [cart]);
    const updateCart = (product) => {
        const newCart = [];
        if (cart.length) {
            cart.forEach(e => {
                if (e.key !== product.key) {
                    newCart.push(e);
                }
                else {
                    e.quantity += 1;
                    newCart.push(e);
                }
            });
        }

        else {
            products.forEach(e => {
                if (e.key === product.key) {
                    newCart.push(e);
                }
            });
        }

        setCart(newCart);
        // console.log("From function: ",cart);
        addToDb(product.key);
    }
    const [srcPdt, setSrcPdt] = useState([]);
    const search = event => {
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setSrcPdt(matchedProduct);
    }
    return (
        <>
            <div className="search">
                <input type="text" placeholder='search here' onChange={search} />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        srcPdt.map(product => <Product key={product.key} product={product} updateCart={updateCart}></Product>)
                    }
                    <div className="pagination">
                        {
                            [...Array(pageCount).keys()].map(number => <button onClick={() => {
                                setPage(number + 1)
                            }} className={(number + 1) === page ? "selected" : ""}>{number + 1}</button>)
                        }
                    </div>
                </div>
                <Order cart={cart}>
                    <Link to="/review">
                        <button className="purchase-button">Review Order</button>
                    </Link>
                </Order>
            </div>
        </>
    );
};

export default Shop;