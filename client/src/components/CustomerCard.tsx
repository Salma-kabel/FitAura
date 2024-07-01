// src/components/CustomerCard.tsx
import React from 'react';

interface CustomerCardProps {
    item: any;
    editItem: (item: any) => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ item, editItem }) => {
    const getRandomImage = (item: any) => {
        // Define your logic to get a random image
        return 'path/to/random/image.jpg';
    };

    return (
        <table>
            <tbody>
                <tr>
                    <td rowSpan={4} className="img">
                        <img src={getRandomImage(item)} alt="Random" />
                    </td>
                </tr>
                <tr>
                    <td className="name">
                        <a href="#" onClick={() => editItem(item)}>
                            {item.CustomerID} - {item.CompanyName}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td className="contact">{item.ContactName}, {item.ContactTitle}</td>
                </tr>
                <tr>
                    <td className="country">{item.City}, {item.Country}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CustomerCard;
