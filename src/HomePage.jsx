import './homepage.css';
import React from 'react';

const HomePage = () => {

    return (
        <div className="home_page" >
            <h1>Welcome to the Relation Diagram HomePage</h1>
            <p>The relation diagrams viewed are based on the URL. <br />
            Adding "/" + "table name" will lead to that "table name" relation diagram. <br />
            For example: "http://localhost:5173/dvd" would bring us to the relation diagram for the DVD table.</p>
        </div>
    )
};

export default HomePage;