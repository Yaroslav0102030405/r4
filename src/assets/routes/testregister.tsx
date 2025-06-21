import type { IRegisterData, IFormProps } from "./test"; 

const RegisterForm: React.FC<IFormProps<IRegisterData>> = ({hangleSubmit, formData, handleChange}) => {

    return ( <>
    <form onSubmit={hangleSubmit}>
        <label> Ім'я<input value={formData.username || ""} onChange={(e) => handleChange("username", e.target.value)} type="text" /></label>
        <br />
        <label>Email<input value={formData.email || ""} onChange={(e) => handleChange("email", e.target.value)} type="emeil" /></label>
        <br />
        <label>Пароль<input value={formData.password || ""} onChange={(e) => handleChange("password", e.target.value)} type="password" /></label>
        <br />
        <button type="submit">Зареєструватися</button>
        </form></> );
}
 
export default RegisterForm;