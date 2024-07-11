import React from "react";

export default async Getusername () {
    try {
        const token = localStorage.getItem('authToken');
        const res = await fetch("http://localhost:5000/api/user", {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}