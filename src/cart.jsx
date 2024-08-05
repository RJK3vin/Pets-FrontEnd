import { useLocation, Link } from 'react-router-dom';
import Cartstate from "./Cartstate";

export default function Cart() {
    const location = useLocation();
    const pet = location.state?.pet;
    console.log(pet)
    return (
    <>
        <Cartstate />
        <p>Not done yet</p>
        <Link to="/">
            <button>Back To Pets</button>
        </Link>
    </>
    )
}