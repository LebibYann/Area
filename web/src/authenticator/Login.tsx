import React, { MutableRefObject, useEffect, useRef } from 'react';
import './Authenticator.css';
import { login, useLogin } from '../utils';
import queryString from 'query-string';
import { LoginFormData } from '../types';

const Login = (): JSX.Element => {

    const [form, setForm] = React.useState<LoginFormData>({
        email: '',
        password: ''
    });

    const [error, setError] = React.useState<string>("");

    useEffect(() => {
        const isLogged = useLogin();

        if (isLogged) {
            window.location.replace(window.location.origin);
        }
    }, [])

    const handleChange = (
        key: string, 
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setForm({...form, [key]: event.target.value});
    }

    const handleConnection = async (): Promise<void> => {
        const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
              "email": form.email,
              "password": form.password
            }),
        })
        const responsejson = await response.json();
        if (response.status !== 201){
            console.error(responsejson.message);
            setError(responsejson.message)
        }else {
            console.log(responsejson.access_token);
            login(responsejson.access_token);
            window.location.replace(window.location.origin);
        }
    };

    return (
        <section className='login-container'>
            <h2 className='form-title'>
                Log in
            </h2>
            <div className='form-container'>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("email", e)} value={form.email} type="email" placeholder='Email'/>
                </div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("password", e)} value={form.password} type="Password" placeholder='Password'/>
                </div>
                {error && <p className='error'>{error}</p>}
                <div className='form-submit'>
                    <input type='button' value={"Log in"} onClick={handleConnection}/>
                </div>
            </div>
        </section>
    );
}

export default Login;