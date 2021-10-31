import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import "./Shipping.css";
const axios = require('axios').default;
const Shipping = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useAuth();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;
        axios.post('https://possessed-spell-91387.herokuapp.com/orders', data)
            .then(res => {
                if(res.data.insertedId){
                    console.log(res.data);
                    alert("Order Successful");
                    clearTheCart();
                }
            
            });
        
    };

    return (
        <div>
            <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={user.displayName} {...register("name")} />


                <input placeholder="email" defaultValue={user.email} {...register("email", { required: true })} />
                <input placeholder="address" {...register("address")} />
                <input placeholder="phone-no" {...register("phone-no")} />
                <input placeholder="city" {...register("city")} />

                {errors.email && <span className="error">This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;