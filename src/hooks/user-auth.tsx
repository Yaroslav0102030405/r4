import { useSelector} from "react-redux";
import type { RootState } from '../assets/components/store/index'

export function useAuth() {
    const {email, token, id} = useSelector((state: RootState) => state.user)

    return {
        isAuth: !!email,
        email,
        token,
        id,
    }
}