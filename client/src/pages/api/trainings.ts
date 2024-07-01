// src/pages/api/trainings.ts
import { NextApiRequest, NextApiResponse } from 'next';

const trainings = [
    {
        CustomerID: 'ALFKI',
        CompanyName: 'Alfreds Futterkiste',
        ContactName: 'Maria Anders',
        ContactTitle: 'Sales Representative',
        City: 'Berlin',
        Country: 'Germany'
    },
    // Add more training items here
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(trainings);
}
