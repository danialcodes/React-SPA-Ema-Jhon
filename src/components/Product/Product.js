import React from 'react';
import Features from '../Features/Features';
import Purchase from '../Purchase/Purchase';
import "./Product.css"
const Product = (props) => {
    const {img,price,seller,stock,star,url,name,features,shipping} = props.product;
    const {updateCart} = props;
    return (
        <div className="product">
            <div className='product-img'>
            <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h2 className='product-name' ><a rel="noreferrer" target="_blank" href={url}>{name}</a></h2>
                <h5>by: {seller}</h5>
                <div className="beGrid">
                    <Purchase product={props.product} price={price} shipping={shipping} stock={stock} updateCart={updateCart}></Purchase>
                    <Features star={star} features={features}></Features>
                </div>
            </div>
        </div>
    );
};

export default Product;