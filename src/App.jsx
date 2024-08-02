import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ShowPets({pets}) {
  return (
    <div>
        {pets.map((pet) => {
          return (
          <>
          <p key={pet.id}>{pet.name} - Type: {pet.pettype}</p> 
          <Link to='/description' state={{ pet: pet }}>
            <button >Click to show description</button>
          </Link> 
          </>
          )
        })}
    </div>
  )
}


export default function App() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pettype, setPetType] = useState('Select an option')
  const [pets, setPets] = useState([])
  const options = ['dog', 'cat', 'bird', 'fish', 'reptile', 'hamster']

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
    setPetType('Select an option')
  }


  return (
    <>
    <h1>List of Pets:</h1>
    <ShowPets pets={pets}/>
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

