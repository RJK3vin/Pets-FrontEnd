import { useLocation, Link } from 'react-router-dom';

export default function Cart() {
    const location = useLocation();
    const yourcart = location.state?.yourcart;
    console.log(yourcart)
    return (
    <>
        {yourcart.map((item, index) => (
        <p key={`${item.id}-${index}`}>{item.name} - {item.pettype} - {item.description}</p>
        ))}       
        <p>Cart: {yourcart.length}</p> 
        <Link to="/">
            <button>Back To Pets</button>
        </Link>
    </>
    )
}