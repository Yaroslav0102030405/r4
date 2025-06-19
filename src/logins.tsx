import Form from "./form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "./assets/components/store/slices/user";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Logins: React.FC = () => {
    const dispatch = useDispatch()
      const navigate = useNavigate();


    const handleLogin = (email: string, password: string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(async ({user}) => {
            const token = await user.getIdToken();
            dispatch(setUser({email: user.email, id: user.uid, token: token }));
            navigate("/")
        }).catch(console.error)
    }

    return ( <>
    <Form title="sign in"  handleClick={handleLogin}/>
    </> );
}
 
export default Logins;