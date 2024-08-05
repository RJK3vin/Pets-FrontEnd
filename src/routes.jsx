import App from "./App";
import Description from "./Description"
import Cart from "./cart";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/description",
        element: <Description />,
    },
    {
        path: "/cart",
        element: <Cart />
    }
]

export default routes