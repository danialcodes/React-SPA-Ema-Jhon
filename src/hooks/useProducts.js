import { useEffect } from "react";
import { useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const liveUrl = "https://possessed-spell-91387.herokuapp.com";
    const localUrl = "http://localhost:5000";
    useEffect(() => {
        fetch(`${liveUrl}/products`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, []);
    return [products, setProducts];
}
export default useProducts;