import { useEffect, useState } from "react"
import { getStoredCart } from "../utilities/fakedb";


const useCart = (products)=>{
    const [cart,setCart] = useState([]);
    useEffect(() => {
        const cart = getStoredCart();
        const cartItem=[];
        if (products.length) {
            
            for (const key in cart) {
                const item = products.find(product => product.key === key);
                const quantity = cart[key];
                item.quantity = quantity;
                cartItem.push(item)
            }
            setCart(cartItem);
        }

    }, [products]);
    return [cart,setCart];
}
export default useCart;