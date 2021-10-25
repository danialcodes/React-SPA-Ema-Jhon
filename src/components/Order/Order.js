import React from 'react';
import "./Order.css"
const Order = (props) => {
    const { cart } = props;
    // console.log("From Order: ",cart);
    // console.log(cart);
    let items = 0;
    let shipping = 0;
    let tItem = 0;
    cart.forEach(e => {
        const quantity = e.quantity ? e.quantity : 1;
        items += (e.price * quantity);
        shipping += (e.shipping * quantity);
        tItem += quantity;

    });
    // const calTol = (pre,cur,check)=>{
    //     console.log(cur[check]);
    //         const t = pre+ (cur[check] * (cur.quantity?cur.quantity:1));
    //     return t;
    // }

    // const items = cart.reduce((pre,cur)=>calTol(pre,cur,"price"),0);
    // let shipping= cart.reduce((pre,cur)=>calTol(pre,cur,"shipping"),0);

    let btax = items + shipping;
    let tax = btax * .20;
    let total = btax + tax;
    return (
        <div className="cart">
            <div className="text-center">
                <h1>Order Summary</h1>
                <h3>Item ordered: {tItem}</h3>
            </div>
            <div>
                <div className="cost">
                    <span>Items:</span>
                    <span>${items.toFixed(2)}</span>
                </div>
                <div className="cost">
                    <span>Shipping & Handling:</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="cost">
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
                <div className="text-center">
                    {
                        props.children
                    }
                </div>

            </div>

        </div>
    );
};

export default Order;