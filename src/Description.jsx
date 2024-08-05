import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Cartstate from './Cartstate';
import { useState } from 'react';

function Description() {
    const location = useLocation();
    const pet = location.state?.pet;

    return (
    <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '15px' }}>Description of {pet.name}: {pet.description}</p> 
        </div>
        <Link to="/"><button style = {{ fontSize: '15px' }}>Go back to pets</button></Link>
        <button onClick={() => setCart(cart + 1)}>Add to Cart</button>
    </>
    )
}

export default Description;