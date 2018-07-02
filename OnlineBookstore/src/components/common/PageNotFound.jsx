import React from 'react';
import { Link } from 'react-router-dom'; 

const PageNotFound = () => (
    <div className="container">
        <img src={require('./not-found.jpg')} alt=""/>
        <div className="text-center">
            <Link to="/" type="button" className="btn btn-sm btn-secondary mt-3">Go to Home Page</Link>
        </div>
    </div>
);

export default PageNotFound;