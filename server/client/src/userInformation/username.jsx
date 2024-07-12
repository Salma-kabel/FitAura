import React from "react";

export default async Getusername () {
    try {
        const res = await fetch("http://localhost:5000/api/auth/request-reset-password", {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(email),
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}