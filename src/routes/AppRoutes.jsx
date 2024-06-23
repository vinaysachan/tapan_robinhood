import Home from '../pages/public/Home';
import Verify from '../pages/public/Verify';
import Error from '../pages/public/Error';


export default [
    { path: "/", element: <Home /> },
    { path: "/verify", element: <Verify /> },
    { path: "/error", element: <Error /> }
]