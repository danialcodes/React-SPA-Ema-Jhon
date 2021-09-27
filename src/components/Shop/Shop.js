import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Order from '../Order/Order';
import Product from '../Product/Product';
import "./Shop.css";
const Shop = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('/products.JSON')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    // console.log(products);
    
    const [cart,setCart]=useState([]);
    const updateCart = (product)=>{
        const newCart = [...cart,product]
        setCart(newCart);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product=><Product key={product.key} product={product} updateCart={updateCart}></Product>)
                }
            </div>
            <Order cart={cart}></Order>
        </div>
    );
};

export default Shop;