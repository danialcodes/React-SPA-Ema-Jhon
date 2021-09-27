import React from 'react';
import "./Order.css"
const Order = (props) => {
    const {cart} = props;
    const calTol = (pre,cur,check)=>pre+cur[check];
    const items = cart.reduce((pre,cur)=>calTol(pre,cur,"price"),0);
    let shipping= cart.reduce((pre,cur)=>calTol(pre,cur,"shipping"),0);
    
    // cart.forEach(product => {
    //     shipping+=product.shipping;
    // });
    let btax=items+shipping;
    let tax=btax*.20;
    let total=btax+tax;
    return (
        <div className="cart">
            <div style={{ textAlign: "center" }}>
                <h1>Order Summary</h1>
                <h3>Item ordered: {cart.length}</h3>
            </div>
            <div>
                <div  className="cost">
                    <span>Items:</span>
                    <span>${items.toFixed(2)}</span>
                </div>
                <div  className="cost">
                    <span>Shipping & Handling:</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div  className="cost">
                    <span>Total before tax</span>
                    <span>${btax.toFixed(2)}</span>
                </div>
                <div className="cost">
                    <span>Estimated Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <h1 className="cost total">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                </h1>
            </div>

        </div>
    );
};

export default Order;