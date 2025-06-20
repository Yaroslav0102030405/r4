import { useAuth } from "../../hooks/user-auth"
import { useDispatch } from "react-redux"
import { removeUser } from "../components/store/slices/user"
import { Navigate } from "react-router-dom"; 

const Home = () => {
  const {isAuth, email} = useAuth()
  const dispatch = useDispatch()

  return (
    <>
            {isAuth ? (
        <div>
          <h1>Welcome</h1>
          <button onClick={() => dispatch(removeUser())} type="button">
            Log out {email}
          </button>
        </div>
      ) : (
        <Navigate to="/register" replace />
      )}
          </>
  )
}

export default Home
