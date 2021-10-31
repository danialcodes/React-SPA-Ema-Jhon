import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";
const axios = require('axios').default;


const useCart = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const cart = getStoredCart();
        const cartItem = [];
        const keys = Object.keys(cart);
        console.log(keys);
        axios.post('https://possessed-spell-91387.herokuapp.com/products/bykeys', keys)
            .then(res => {
                console.log("Inside post");
                const products = res.data;
                if (products.length) {

                    for (const key in cart) {
                        const item = products.find(product => product.key === key);
                        const quantity = cart[key];
                        item.quantity = quantity;
                        cartItem.push(item)
                    }
                    setCart(cartItem);
                }
            })
            .catch(err => console.log(err))



    }, []);
    return [cart, setCart];
}
export default useCart;