import { useEffect, useState } from "react";
import { login, readRequestStatus, useLogin } from "../utils";
import queryString from "query-string";

/**
 *
 *
 * @return {JSX.Element} the page used to send the code return by the oauth2 authentication to the api
 * and redirect the user to the home page
 */
const Callback = (): JSX.Element => {
  const url = window.location;
  const token = useLogin()

  const handleOauth2 = async (service: string, code: string): Promise<void> => {
    if (service == "spotify" || service == "google") {
      try {
        console.log(code);
        const response = await fetch(`http://localhost:8080/oauth2/${service}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            redirectUri: "http://localhost:8081/login/auth/" + service,
          }),
        });
        const responsejson = await response.json();
        console.log(response.status);
        if (readRequestStatus(response.status, responsejson.message)) {
          login(responsejson.access_token);
          window.location.replace(window.location.origin);
        } else {
          window.location.replace(window.location.origin + "/join");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        console.log("test", token);
        const response = await fetch(`http://localhost:8080/oauth2/${service}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({
            code,
            redirectUri: "http://localhost:8081/login/auth/" + service,
          }),
        });
        const responsejson = await response.json();
        console.log(response.status);
        if (readRequestStatus(response.status, responsejson.message)) {
          login(responsejson.access_token);
          window.location.replace(window.location.origin);
        } else {
          window.location.replace(window.location.origin + "/join");
        }
      } catch (error) {
        console.error(error);
      }
    }
    
  }

  useEffect(() => {
    const isLogged = useLogin();

    if (isLogged) {
      window.location.replace(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const service = url.pathname.split("/")[3];
    const query = queryString.parse(url.search);

    if (query.code !== null) {
      handleOauth2(service, query.code as string);
    }
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Callback;
