import React, { MutableRefObject, useEffect, useRef } from 'react';
import './Authenticator.css';
import { login, useLogin } from '../utils';

export interface LoginFormData {
    email: string;
    password: string;
}

const Login = (): JSX.Element => {

    const domain = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "http://localhost:8081/login/auth/google";
    const responseType = "authorization_codde";
    const scope = "https://www.googleapis.com/auth/drive.metadata.readonly";
    const includeGrantedScopes = "true";
    const state = "pass-through value";

    const googleUrl = domain + 
    `?client_id=` + import.meta.env.VITE_GOOGLE_CLIENT_ID +
    `&redirect_uri=${redirectUri}` +
    `&response_type=${responseType}` +
    `&scope=${scope}` +
    `&include_granted_scopes=${includeGrantedScopes}` +
    `&state=${state}`

    const discordUrl = "https://discord.com/api/oauth2/authorize?client_id=1184305079029878785&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Fauth%2Fdiscord&scope=identify"

    const [form, setForm] = React.useState<LoginFormData>({
        email: '',
        password: ''
    });

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

    const handleConnection = (): void => {
        fetch("http://localhost:8080/auth/login", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
              "email": form.email,
              "password": form.password
            }),
        }).then((response) => {
            console.log(response.status);
            return (response.json());
        }).then((data) => {
            login();
        }).catch((error) => console.log(error));
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
                <div>
                    <a href={googleUrl}>Connect with Google</a>
                </div>
                <div>
                    <a href={discordUrl}>Connect with Discord</a>
                </div>
                <div className='form-submit'>
                    <input type='button' value={"Log in"} onClick={handleConnection}/>
                </div>
            </div>
        </section>
    );
}

export default Login;