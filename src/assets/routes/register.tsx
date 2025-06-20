import { Link } from "react-router";
import SignUp from "../../signUp";

const Register = () => {
    return ( <>
    <h1>Реєстрація</h1>
    <SignUp />
    <Link to="/login">Sign in</Link>
    </> );
}
 
export default Register;