import { useEffect, useState } from "react";
import { login } from "../utils";
import queryString from "query-string";

const OAuth = (): JSX.Element => {
  const url = window.location;

  useEffect(() => {
    const service = url.pathname.split("/")[3];
    const query = queryString.parse(url.search);

    console.log(query.code);
    fetch(`http://localhost:8080/oauth2/${service}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: query.code }),
    })
      .then((res) => res.json())
      .then((data) => {
        login();
      })
      .catch((err) => console.log(err));
    window.location.replace(url.origin)
  }, []);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
};

export default OAuth;
