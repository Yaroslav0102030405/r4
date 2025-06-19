import Form from "./form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./assets/components/store/slices/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp: React.FC = () => {
    const dispatch = useDispatch()
     const navigate = useNavigate();

    const handleRegister = (email: string, password: string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(async({user}) => {
              const token = await user.getIdToken();
                    dispatch(setUser({email: user.email, id: user.uid, token: token}));
                    navigate("/")
                }).catch(console.error)
            }
    return ( <>
    <Form title="register"  handleClick={handleRegister}/>
    </> );
}
 
export default SignUp;