import { useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";
import "./Join.css";
import Google from "../assets/images/GoogleIcon.png";
import Discord from "../assets/images/DiscordIcon.png";
import Spotify from "../assets/images/SpotifyIcon.png"


const Join = (): JSX.Element => {

    const [display, setDisplay] = useState<boolean>(false);

    const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth" + 
    `?client_id=` + import.meta.env.VITE_GOOGLE_CLIENT_ID +
    "&redirect_uri=http://localhost:8081/login/auth/google" +
    "&access_type=offline" +
    "&response_type=code" +
    "&scope=openid%20profile%20email" +
    "&include_granted_scopes=true";

    const spotifyUrl = "https://accounts.spotify.com/authorize?" + queryString.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email",
        redirect_uri: "http://localhost:8081/login/auth/spotify"
    })

    const twitterUrl = "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=RDd4M0owY3k1emZmQmR5aFlENmU6MTpjaQ&redirect_uri=http://localhost:8081/login/auth/twitter&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain"

    const githubUrl = "https://github.com/login/oauth/authorize?client_id=fee6c82e9e3f4aa4c447&redirect_uri=http://localhost:8081/login/auth/github&response_type=code"

    const updateDisplay = () => {
      setDisplay(!display);
    };

    return (
        <section className="join-container">
            <h1 className="title">Get Started</h1>
            <section className="oauth-container">
                <a href={googleUrl} className='oauth-button google'>
                    <img src={Google} className="service-icon"/>
                    Connect with Google
                </a>
                <a href={spotifyUrl} className='oauth-button spotify'>
                    <img src={Spotify} className="service-icon"/>
                    Connect with Spotify
                </a>
            </section>
            <p className="text">Or use your email to <Link to={"/register"} className="link">sign up</Link> or <Link to={"login"} className="link">log in</Link></p>
        </section>
    );
};

export default Join;