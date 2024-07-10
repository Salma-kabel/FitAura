import React from "react";
import './product.css'

export default function Product({productName, revenue, stock, action}) {
    return(
        <tr className="product-cell">
            <th>
                <div>{productName}</div>
            </th>
            <th>
                <div>{revenue}</div>
            </th>
            <th>
                <div>{stock}</div>
            </th>
            <th>
                <div className="product-action">{action}</div>
            </th>
        </tr>
    );
}