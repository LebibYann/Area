import React, { useState } from 'react';
import './appHeader.css';
import { Link } from 'react-router-dom';
import { logout, useLogin } from './authenticator/utils';

const NavigationHeader = (): JSX.Element => {
    const isLogged = useState<boolean>(useLogin());

    return (
        <header className='unified-header'>
            <section className='title-section'>
                <h1>Area</h1>
            </section>
            <section className='links-section'>
                <Link to={"/"}>Explore</Link>
                {!isLogged[0] &&
                <>
                    <Link to={"/login"}>Log in</Link>
                    <Link to={"/join"}>Get Started</Link>
                </>
                }
                {isLogged[0] &&
                    <input type='button' value={"Log out"} onClick={() => {
                        logout();
                        window.location.reload();
                    }}/>
                }
            </section>
        </header>
    )
}

export default NavigationHeader;