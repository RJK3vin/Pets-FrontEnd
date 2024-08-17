import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cartbutton from './cartbutton';

function ShowPets({ pets=[], setYourCart, token, id, effect, setEffect }) {

  return (
    <div>
        {pets.map((pet) => {
          return (
          <>
          <Link to='/description' state={{ pet }}>
            <p key={pet.id} style = {{ color: "blue" }}>{pet.name} - {pet.pettype} </p>
          </Link> 
          <Cartbutton pet={pet} setYourCart={setYourCart} token={token} id={id} effect={effect} setEffect={setEffect}/>
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
  const [yourcart, setYourCart] = useState([])
  const [token, setToken] = useState()
  const [textvalue, setTextValue] = useState()
  const [effect, setEffect] = useState(false)
  const [id, setId] = useState(``)

  // bcd5ecc7e43c0f85cd0c81f7b99f3fd0bd587a1b
  // ccc0dd55eb28b457d46fefd4fa700690ee3c4794
  
  useEffect(() => {
    fetch(`http://localhost:8080/pets/`, {headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },})
      .then(res => res.json())
      .then(json => setPets(json.results))

    fetch(`http://localhost:8080/carts/`, {headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },})
      .then(res => res.json())
      .then(json => setYourCart(json.results[0].pets))
  }, [token, effect])

  function AddPet() {
    fetch(`http://localhost:8080/pets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
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

  function Login() {
    setToken(textvalue)
  }

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0 }}>Shop For Pets:</h1>         
    </div>
    <input placeholder='token' value={textvalue} onChange={(event) => setTextValue(event.target.value)}></input>
    <button onClick={Login}>Log In</button>
    <p style = {{float: 'right'}}>Cart: {yourcart.length}</p>
    <Link to="/cart" state = {{ yourcart }} >
      <button style={{ float: 'right' }}>Go To Cart</button>
    </Link>
    <ShowPets pets={pets} setYourCart={setYourCart} yourcart={yourcart} token={token} id={id} effect={effect} setEffect={setEffect}/>
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
    </>
  )
}

