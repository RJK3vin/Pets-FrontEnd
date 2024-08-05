import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cartstate from './Cartstate';

function ShowPets({ pets, handleClick }) {

  return (
    <div>
        {pets.map((pet) => {
          return (
          <>
          <Link to='/description' state={{ pet }}>
            <p key={pet.id} style = {{ color: "blue" }}>{pet.name} - {pet.pettype} </p>
          </Link> 
          <button onClick={(event) => handleClick(event, pet)}>Add to cart</button>
          </>
          )
        })}
    </div>
  )
}


export default function App() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pettype, setPetType] = useState('Select a type')
  const [pets, setPets] = useState([])
  const options = ['dog', 'cat', 'bird', 'fish', 'reptile', 'hamster']
  const [cart, setCart] = useState(0)
  const[yourcart, setYourCart] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/pets/`)
      .then(res => res.json())
      .then(json => setPets(json.results))
  }, [])

  function AddPet() {
    fetch(`http://localhost:8080/pets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name, description: description, pettype: pettype}),
    }) 
      .then((res) => {
        if (res.ok) {
          return res.json()
            .then((pet) => {
            setPets((prevPets) => [...prevPets, pet])
        })
      } else {
        alert("You can't do that boiiii, fill in every information!!!")
      }
    })
    setName('')
    setDescription('')
    setPetType('Select a type')
  }

  function handleClick(event, pet) {
    setYourCart(prevYourCart => [...prevYourCart, pet])
    console.log(yourcart)
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>Shop For Pets:</h1>         
    </div>
    <Link to="/cart" >
      <button style={{ float: 'right' }}>Go To Cart</button>
    </Link>
    <ShowPets pets={pets} handleClick={handleClick}/>
    <h2>Add Pets</h2>
    <input placeholder="Enter Pet Name" value={name} onChange = {(event) => setName(event.target.value)}></input>
    <select value={options} onChange = {(event) => setPetType(event.target.value)}>
      <option>{pettype}</option>
      {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
    </select>
    <input placeholder="Enter Pet Description" value={description} onChange = {(event) => setDescription(event.target.value)}></input>
    <button onClick={AddPet}>Add</button>
    <Cartstate />
    {yourcart.map((yourcart, index) => (
      <p key={`${yourcart.id}-${index}`}>{yourcart.name}{yourcart.pettype}{yourcart.description}</p>
    ))}
    </>
  )
}

