// src/pages/trainings.tsx
import React, { useState, useEffect } from 'react';
import CustomerCard from '../components/CustomerCard';

const TrainingsCardView: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        // Fetch data from an API or data source
        fetch('/api/trainings')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const editItem = (item: any) => {
        // Define the logic to edit the item
        console.log("Edit item", item);
    };

    return (
        <div>
            {items.map((item, index) => (
                <CustomerCard key={index} item={item} editItem={editItem} />
            ))}
        </div>
    );
};

export default TrainingsCardView;
