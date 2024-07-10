import React from "react";
import './productsCart.css';
import Product from "./Product/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";


const productList = [
    {
        id: 1, productName: "Product 1",
        revenue: "Revenue 1", stockStatus: "Stock status",
        action: (<FontAwesomeIcon className = "modify-product" icon={fas.faPen} />), style: {width: "100%"},
    },
    {
        id: 2, productName: "Product 2",
        revenue: "Revenue 2", stockStatus: "Stock status",
        action: (<FontAwesomeIcon className = "modify-product" icon={fas.faPen} />), style: {width: "100%"},
    },
    {
        id: 3, productName: "Product 3",
        revenue: "Revenue 3", stockStatus: "Stock status",
        action: (<FontAwesomeIcon className = "modify-product" icon={fas.faPen} />), style: {width: "100%"},
    },
    {
        id: 4, productName: "Product 4",
        revenue: "Revenue 4", stockStatus: "Stock status",
        action: (<FontAwesomeIcon className = "modify-product" icon={fas.faPen} />), style: {width: "100%"},
    },
]

export default function ProductsCart() {
    return(
        <div className="products-cart">
            <h1>Your Routines</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Exercises Count</th>
                        <th>Edit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList.map(({id, productName, revenue, stockStatus, action, style}) => {
                            return(
                                <Product
                                    key = {id}
                                    productName = {productName}
                                    revenue = {revenue}
                                    stock = {stockStatus}
                                    action = {action}
                                    style = {style}
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
} 