import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "./home.css";

const Home = () => {

    // State Variables


    // ComponentDidMount / ComponentWillUnmount
    useEffect(() => {

    }, []);

    // ComponentWillUpdate
    useEffect(() => {

    }, [])

    return (
        <>
            <Link to="/cpu">
                <Button>CPU Dashboard</Button>
            </Link>
        </>
    );

};

export default Home;