import { Link } from "react-router";
import Logins from "../../logins";
import Product from "../components/products/products";
import Counter from "../components/custom-hook/counter";

const Login = () => {
    

    return ( <>
    <h1>Війти</h1>
    <Logins />
    <Link to="/register">Log in</Link>
    <Product />
    <Counter/>
    </> );
}
 
export default Login;