import { useEffect, useState } from "react";
import axios from "axios";


export interface Product{
    productid: number,
    productname: string,
    quantity: string,
    price: string,
}


export const RestProduct = ():[ (productid:number|undefined)=> void,(productid:number|undefined)=>void,(product:Product)=>void,(product:Product)=>void, Product|undefined, string] => {
    const [product, setProduct] = useState<Product>();
    const [error, setError] = useState("");

    
    function addProduct(product:Product){
        axios.post("http://localhost:8080/product/postProduct",{
            productname: product.productname,
            price: product.price,
            quantity: product.quantity,
        }).then((response) => {
            setProduct(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
  
    }

    function editProduct(product:Product){
        axios.put("http://localhost:8080/product/getByProduct?productid=" + product.productid,{
            productname: product.productname,
            price: product.price,
            quantity: product.quantity,
        }).then((response) => {
            setProduct(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            setError(error.message);
        })
    }

//     function getByProductname (productname:string|undefined){
//         axios.get("http://localhost:8080/product/getByProduct?productname=" + productname,{
//     }).then((response) => {
//         setProduct(response.data);
//         console.log(response.data);
//     })
//     .catch((error) => {
//         setError(error.message);
//     })
// }


function getProductByid (productid:number|undefined){
    axios.get("http://localhost:8080/product/getByProduct?productID=" + productid,{
}).then((response) => {
    setProduct(response.data);
    console.log(response.data);
})
.catch((error) => {
    setError(error.message);
})
}

function deleteByID (productid:number|undefined){
    axios.delete("http://localhost:8081/product/deleteProduct/" + productid,{
    }).then((response) => {
    setProduct(response.data);
    console.log(response.data);    
    })
.catch((error) => {
    setError(error.message);
    })
}
    return[deleteByID,getProductByid,editProduct,addProduct,product,error]
}