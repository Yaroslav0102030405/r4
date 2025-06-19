import { Link } from "react-router";
import SignUp from "../../signUp";

const Register = () => {
    return ( <>
    <h1>Register Page</h1>
    <SignUp />
    <Link to="/login">Register</Link>
    </> );
}
 
export default Register;