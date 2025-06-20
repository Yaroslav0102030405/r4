import { useState } from "react";
import type { ChangeEvent } from "react";
// 1. Типізуємо пропси компонента Fomr
interface FormProps {
  title: string;
  // handleClick - це функція, яка не приймає аргументів і нічого не повертає.
  // Якщо вона приймає event або інші аргументи, потрібно їх типізувати.
  handleClick: (email: string, password: string) => void;
}

const Form = ({ title, handleClick }: FormProps) => {
    const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки
    handleClick(email, password); // Викликаємо зовнішній обробник
  };

    return ( <>
    <form onSubmit={handleSubmit}>
        <label><input onChange={handleChangeEmail} type="email" value={email}/></label>
        <br />
        <label><input onChange={handleChangePassword} type="password" value={password}/></label>
        <br />
        <button type="submit">{title}</button>
        </form></> );
}
 
export default Form;