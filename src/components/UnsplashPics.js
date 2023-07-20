import { useState, useEffect } from "react";

export const UnsplashPics = () => {

    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const baseUrl = 'https://api.unsplash.com/search/photos/?client_id=' + accessKey;

    useEffect(() => {
        console.log(process.env.REACT_APP_ACCESS_KEY);
    }, []);

    return (
        <div>
            <p>Unsplash pictures here...</p>
        </div>
    )
}