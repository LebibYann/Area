import { useEffect, useState } from "react";
import { login } from "../utils";
import queryString from "query-string";

const Callback = (): JSX.Element => {
  const url = window.location;

  const handleOauth2 = async (service: string, code: string): Promise<void> => {
    console.log(`http://localhost:8080/oauth2/${service}`)
    const response = await fetch(`http://localhost:8080/oauth2/${service}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code
      }),
    });
    const responsejson = await response.json();
    if (response.status !== 201){
      console.error(responsejson.message);
      window.location.replace(window.location.origin + "/login");
    }else {
      console.log(responsejson.access_token);
      login(responsejson.access_token);
      window.location.replace(window.location.origin);
    }
  }

  useEffect(() => {
    const service = url.pathname.split("/")[3];
    const query = queryString.parse(url.search);

    if (query.code !== null)
      handleOauth2(service, query.code as string);
    window.location.replace(window.location.origin + "/login");
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default Callback;
