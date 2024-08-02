import App from "./App";
import Description from "./Description"

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/description",
        element: <Description />,
    }
]

export default routes