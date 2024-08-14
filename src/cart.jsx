import { useLocation, Link } from 'react-router-dom';

export default function Cart() {
    const location = useLocation();
    const yourcart = location.state?.yourcart;
    return (
    <>
        {yourcart.map((yourcart, index) => (
        <p key={`${yourcart.id}-${index}`}>{yourcart.name} - {yourcart.pettype} - {yourcart.description}</p>
        ))}       
        <p>Cart: {yourcart.length}</p> 
        <Link to="/">
            <button>Back To Pets</button>
        </Link>
    </>
    )
}