const Cartbutton = (props) => {

    function handleClick() {
        props.setYourCart(prevYourCart => [...prevYourCart, props.pet])
      }

    return(
        <button onClick={() => handleClick()}>Add to cart</button>
    )
}

export default Cartbutton;

