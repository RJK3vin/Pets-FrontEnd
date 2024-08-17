const Cartbutton = (props) => {

    function handleClick() {
        fetch(`http://localhost:8080/users/me/`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${props.token}`
                }
            })
                .then((res) => {
                  if (res.ok) {
                    return res.json()
                      .then(user => {
                        console.log(user.cart)
                        fetch(`http://localhost:8080/carts/${user.cart}/add_pet/`, {
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
                      })
                  }
                })
      }

    return(
        <button onClick={() => handleClick()}>Add to cart</button>
    )
}

export default Cartbutton;

