import React from 'react';
import useProducts from '../../hooks/useProducts';
import OrderItems from '../OrderItems/OrderItems';
import useCart from "../../hooks/useCart"
import Order from '../Order/Order';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
// import { Link} from 'react-router-dom';
// import { useHistory} from 'react-router';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    // const history = useHistory();
    const removeItem = (key) => {
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }
    const placeOrder = ()=>{
        // history.push("/placeorder");
        setCart([]);
        clearTheCart();

    }
    return (


        <div className="shop-container">

            <div className="product-container">
                {
                    cart.map(product => <OrderItems product={product} key={product.key} removeItem={removeItem}></OrderItems>)

                }
            </div>
            <Order cart={cart}>
                
                    <button onClick={placeOrder} className="purchase-button">Place Order</button>
                
            </Order>
        </div>
    );
};

export default OrderReview;