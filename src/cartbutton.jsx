const Cartbutton = (props) => {

    function handleClick() {

        fetch(`http://localhost:8080/carts/${props.id}/add_pet/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${props.token}`
            },
            body: JSON.stringify({ pet_id : props.pet.id })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                        .then((addcart) => {
                        props.setYourCart(addcart.pets)
                        })
                }
            })
      }

    return(
        <button onClick={() => handleClick()}>Add to cart</button>
    )
}

export default Cartbutton;

