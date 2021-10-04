import React from 'react';
import "./OrderItems.css";
const OrderItems = (props) => {
    const { key, img, name, price, seller, quantity, url } = props.product;
    return (
        <div className="reviewItem">
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div>
                <h2 className='product-name' ><a rel="noreferrer" target="_blank" href={url}>{name}</a></h2>
                <div className="">
                    <div>
                        <h4>${price}</h4>
                        <p>sold by:{seller}</p>
                        <p>Quantity: {quantity}</p>
                        <button onClick={()=>{
                            props.removeItem(key)
                        }} className="purchase-button"><i className="fas fa-shopping-cart"></i>Remove</button>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItems;