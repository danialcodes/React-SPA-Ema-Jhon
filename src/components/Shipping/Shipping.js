import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import "./Shipping.css";
const axios = require('axios').default;
const Shipping = () => {
    const location = useLocation();
    const redirect_url = location.state?.from || '/';
    const history = useHistory();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user } = useAuth();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;

        const liveUrl = "https://possessed-spell-91387.herokuapp.com";
        const localUrl = "http://localhost:5000";
        axios.post(`${localUrl}/orders`, data)
            .then(res => {
                if (res.data.insertedId) {
                    console.log(res.data);
                    alert("Order Successful");
                    clearTheCart();
                    history.push(redirect_url);
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