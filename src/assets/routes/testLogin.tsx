import type { ILoginData, IFormProps } from "./test"
import { useId } from "react";

const LoginForm: React.FC<IFormProps<ILoginData>> = ({hangleSubmit, formData, handleChange}) => {
    const nameId: string = useId()

    return ( <>
     <form onSubmit={hangleSubmit}>
        <label htmlFor={nameId}> Ім'я<input value={formData.username || ""} onChange={(e) => handleChange("username", e.target.value)} type="text" id={nameId} /></label>
        <br />
        <label>Email<input value={formData.email || ""} onChange={(e) => handleChange("email", e.target.value)} type="emeil" /></label>
        <br />
        <label>Пароль<input value={formData.password || ""} onChange={(e) => handleChange("password", e.target.value)} type="password" /></label>
        <br />
        <button type="submit">Зареєструватися</button>
        </form></> );
}
 
export default LoginForm;