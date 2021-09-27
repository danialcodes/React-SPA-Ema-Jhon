import React from 'react';
import "./Purchase.css"
const Purchase = (props) => {
    const {price,stock,updateCart} = props;
    
    return (
        <div className='purchase'>
            <h4>${price}</h4>
            <p>only {stock} left in stock- order soon</p>
            <button onClick={()=>updateCart(props.product)}><i className="fas fa-shopping-cart"></i>add to cart</button>
        </div>
    );
};

export default Purchase;