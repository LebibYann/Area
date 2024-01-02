import React, { useEffect, useState } from 'react';
import './NavigationHeader.css';
import { Link } from 'react-router-dom';
import { logout, useLogin, useServices } from './utils';
import RedirectionButton from './components/RedirectionButton';
import './components/Button.css';

const NavigationHeader = (): JSX.Element => {
    const isLogged = useLogin();

    return (
        <header className='unified-header'>
            <section className='title-section'>
                <h1>Area</h1>
            </section>
            <section className='links-section'>
                <Link to={"/"} className='text'>Explore</Link>
                {!isLogged &&
                    <>
                        <Link to={"/login"} className='text'>Log in</Link>
                        <RedirectionButton href='/join' className='button black-button'>
                            Get Started
                        </RedirectionButton>
                    </>
                }
                {isLogged &&
                    <> 
                        <Link to={"/my_applets"} className='text'>My Applets</Link>
                        <RedirectionButton href={"/create"} className='button black-button'>
                            Create
                        </RedirectionButton>
                        <RedirectionButton onClick={() => {
                            logout();
                            window.location.reload();
                        }} className='button white-button border'>
                            Log out
                        </RedirectionButton>
                    </>
                }
            </section>
        </header>
    )
}

export default NavigationHeader;