import React from 'react';
import useProducts from '../../hooks/useProducts';
import OrderItems from '../OrderItems/OrderItems';
import useCart from "../../hooks/useCart"
import Order from '../Order/Order';
import { deleteFromDb } from '../../utilities/fakedb';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart,setCart] = useCart(products);
    const removeItem =(key)=>{
        const newCart = cart.filter(product=>product.key!==key);
        setCart(newCart);
        deleteFromDb(key);
    }
    return (


        <div className="shop-container">

            <div className="product-container">
                {
                    cart.map(product=><OrderItems product={product} key={product.key} removeItem = {removeItem}></OrderItems>)

                }
            </div>
            <Order cart={cart}></Order>
        </div>
    );
};

export default OrderReview;