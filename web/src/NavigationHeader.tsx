import React, { useState } from 'react';
import './NavigationHeader.css';
import { Link } from 'react-router-dom';
import { logout, useLogin } from './utils';

const NavigationHeader = (): JSX.Element => {
    const isLogged = useLogin();

    return (
        <header className='unified-header'>
            <section className='title-section'>
                <h1>Area</h1>
            </section>
            <section className='links-section'>
                <Link to={"/"}>Explore</Link>
                {!isLogged &&
                    <>
                        <Link to={"/login"}>Log in</Link>
                        <Link to={"/join"}>Get Started</Link>
                    </>
                }
                {isLogged &&
                    <> 
                        <Link to={"/my_applets"}>My Applets</Link>
                        <Link to={"/create"}>Create</Link>
                        <input type='button' value={"Log out"} onClick={() => {
                            logout();
                            window.location.reload();
                        }}/>
                    </>
                }
            </section>
        </header>
    )
}

export default NavigationHeader;