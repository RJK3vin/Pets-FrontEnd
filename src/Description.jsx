import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Description() {
    const location = useLocation();
    const pet = location.state?.pet;
    console.log(pet)
    return (
    <>
        <p>Description of {pet.name}: {pet.description}</p> <Link to="/">Click to go back</Link>
    </>
    )
}
