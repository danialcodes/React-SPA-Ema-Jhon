import { useEffect } from "react";
import { useState } from "react"

const useProducts = ()=>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        fetch("https://possessed-spell-91387.herokuapp.com/products")
        .then(res=>res.json())
        .then(data=>setProducts(data.products))
    },[]);
    return [products,setProducts];
}
export default useProducts;