import LoginForm from "./testLogin";
import RegisterForm from "./testregister";
import { useState } from "react";

export interface ILoginData {
    username?: string;
  email?: string; // email може бути відсутнім або рядком
  password?: string; // password може бути відсутнім або рядком
}

export interface IRegisterData {
  username?: string;
  email?: string;
  password?: string;
}

export interface IFormProps<T> {
  handleChange: (key: string, value: string | number | boolean) => void;
  hangleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: T; // Використовуємо дженерик T для типу formData
}

const Test = () => {
    // Login
    const [loginData, setLoginData] = useState<ILoginData>({})

    const handleLoginChange = (key: string, value: string | number | boolean) => {
setLoginData({...loginData, [key]: value})
    }

    const hangleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() 
            console.log("Login Data:", loginData);
    }

    // Register
      const [registerData, setRegisterData] = useState<IRegisterData>({})

    const handleRegisterChange = (key: string, value: string | number | boolean) => {
setRegisterData({...registerData, [key]: value})
    }

    const hangleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault() 
            console.log("Register Data:", registerData); 
       
    }

    return ( <><h1>Test</h1>
    <h2>Авторизація</h2>
    <LoginForm handleChange={handleLoginChange} 
    hangleSubmit={hangleLoginSubmit} formData={loginData} />
    <h3>Реєстрація</h3>
    <RegisterForm handleChange={handleRegisterChange} 
    hangleSubmit={hangleRegisterSubmit} formData={registerData}  />
    </> );
}
 
export default Test;