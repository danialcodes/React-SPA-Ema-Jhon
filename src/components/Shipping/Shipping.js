import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import "./Shipping.css";
const Shipping = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {user} = useAuth();
  const onSubmit = data => console.log(data);
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