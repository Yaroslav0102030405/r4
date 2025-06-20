import { Link } from "react-router";
import Logins from "../../logins";

const Login = () => {
    

    return ( <>
    <h1>Війти</h1>
    <Logins />
    <Link to="/register">Log in</Link>
    
    </> );
}
 
export default Login;