import { useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import "./Join.css";
import Google from "../assets/images/GoogleIcon.png";
import Discord from "../assets/images/DiscordIcon.png";
import Spotify from "../assets/images/SpotifyIcon.png"


const Join = (): JSX.Element => {

    const [display, setDisplay] = useState<boolean>(false);

    const domain = "https://accounts.google.com/o/oauth2/v2/auth";
    const redirectUri = "http://localhost:8081/login/auth/google";
    const responseType = "code";
    const accessType = "offline";
    const scope = "openid%20profile%20email";
    const includeGrantedScopes = "true";

    const googleUrl = domain + 
    `?client_id=` + import.meta.env.VITE_GOOGLE_CLIENT_ID +
    `&redirect_uri=${redirectUri}` +
    `&access_type=${accessType}` +
    `&response_type=${responseType}` +
    `&scope=${scope}` +
    `&include_granted_scopes=${includeGrantedScopes}`;

    const discordUrl = "https://discord.com/api/oauth2/authorize?client_id=1184305079029878785&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Fauth%2Fdiscord&scope=email"

    const spotifyUrl = "https://accounts.spotify.com/authorize?" + queryString.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri: "http://localhost:8081/login/auth/spotify"
    })

    const updateDisplay = () => {
      setDisplay(!display);
    };

    return (
        <section className="join-container">
            <h1 className="title">Get Started</h1>
            <section className="oauth-container">
                <a href={googleUrl} className='oauth-button google'>
                    <img src={Google}/>
                    Connect with Google
                </a>
                <a href={discordUrl} className='oauth-button discord'>
                    <img src={Discord}/>
                    Connect with Discord
                </a>
                <a href={spotifyUrl} className='oauth-button spotify'>
                    <img src={Spotify}/>
                    Connect with Spotify
                </a>
            </section>
            <p className="text">Or use your email to <Link to={"/register"} className="link">sign up</Link> or <Link to={"login"} className="link">log in</Link></p>
        </section>
    );
};

export default Join;