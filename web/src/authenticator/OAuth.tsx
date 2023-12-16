import { useEffect, useState } from "react";
import { login } from "./utils";

const OAuth = (): JSX.Element => {
    const url = window.location;

    useEffect(() => {
        const service = url.pathname.split('/')[3];
        if (service === "google") {
            const accessToken = url.hash.split('&')[1].split('=')[1];
            const tokenType = url.hash.split('&')[2].split('=')[1];
            const expiresIn = url.hash.split('&')[3].split('=')[1];
            const scope = url.hash.split('&')[4].split('=')[1];
            const body = JSON.stringify({code: accessToken});

            fetch(`http://localhost:8080/oauth2/google`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: body
            })
            .then(res => res.json())
            .then(data => {
               console.log(data);
            })
            .catch(err => console.log(err));
        } else if (service === "discord") {
            const code = url.href.split('=')[1].split('&')[0];
            const body = JSON.stringify({code});

            //fetch(`http://localhost:8080/login/auth/${service}`, {
            //   method: 'POST',
            //   headers: {
            //       'Content-Type': 'application/json'
            //   },
            //   body: body
            //})
            //.then(res => res.json())
            //.then(data => {
            //   console.log(data);
            //})
            //.catch(err => console.log(err));
        }
        login();
        window.location.replace(url.origin)
    }, []);

   
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default OAuth;