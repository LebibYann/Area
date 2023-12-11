import React from 'react';
import { LoginFormData } from './Login';
import './Authenticator.css';


const Register = (): JSX.Element => {

    const [form, setForm] = React.useState<LoginFormData>({
        email: '',
        password: ''
    });

    const handleChange = (
        key: string, 
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setForm({...form, [key]: event.target.value});
    }

    const handleInscription = (): void => {
    }

    return (
        <section className='login-container'>
            <h2 className='form-title'>
                Sign in
            </h2>
            <div className='form-container'>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("email", e)} value={form.email} type="email" placeholder='Email'/>
                </div>
                <div className='form-input'>
                    <input onChange={(e): void => handleChange("password", e)} value={form.password} type="Password" placeholder='Password'/>
                </div>
                <div className='form-submit'>
                    <input type='button' value={"Get Started"} onClick={handleInscription}/>
                </div>
            </div>
        </section>
    );
}

export default Register;