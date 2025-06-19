import { Link } from "react-router";
import Logins from "../../logins";

const Login = () => {
    return ( <>
    <h1>Реєстрація</h1>
    <Logins />
    <Link to="/register">Sign in</Link>
    </> );
}
 
export default Login;