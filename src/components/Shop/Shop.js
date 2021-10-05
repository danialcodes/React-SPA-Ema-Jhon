import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Order from '../Order/Order';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/products.JSON')
            .then(res => res.json())
            .then(data => {
                setSrcPdt(data);
                setProducts(data)})
    },[]);


    // console.log(products);
    useEffect(() => {
        const cart = getStoredCart();
        const cartItem=[];
        if (products.length) {
            
            for (const key in cart) {
                const item = products.find(product => product.key === key);
                const quantity = cart[key];
                item.quantity = quantity;
                cartItem.push(item)
            }
            setCart(cartItem);
        }

    }, [products]);

    const [cart, setCart] = useState([]);
    const updateCart = (product) => {
        const newCart = [];
        cart.forEach(e => {
            if(e.key!==product.key){
                newCart.push(e)
            }
            else{
                e.quantity+=1;
                newCart.push(e);
            }
        });
        setCart(newCart);
        addToDb(product.key);
    }
    const [srcPdt,setSrcPdt]=useState([]);
    const search=event=>{
        const searchText = event.target.value;
        const matchedProduct = products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        setSrcPdt(matchedProduct);
    }
    return (
        <>
        <div className="search">
            <input type="text" placeholder='search here' onChange={search}/>
        </div>
        <div className="shop-container">
            <div className="product-container">
                {
                    srcPdt.map(product => <Product key={product.key} product={product} updateCart={updateCart}></Product>)
                }
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