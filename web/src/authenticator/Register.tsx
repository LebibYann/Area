import React from "react";
import "./Authenticator.css";
import { LoginFormData } from "../types";

const Register = (): JSX.Element => {
  const [form, setForm] = React.useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = React.useState<string>("");

  const handleChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [key]: event.target.value });
  };

  const handleInscription = async (): Promise<void> => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
    const responsejson = await response.json();
    if (response.status !== 201){
        console.error(responsejson.message);
        setError(responsejson.message)  
    }else {
      window.location.replace(window.location.origin);
    }
  };

  return (
    <section className="login-container">
      <h2 className="form-title">Sign up</h2>
      <div className="form-container">
        <div className="form-input">
          <input
            onChange={(e): void => handleChange("email", e)}
            value={form.email}
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="form-input">
          <input
            onChange={(e): void => handleChange("password", e)}
            value={form.password}
            type="Password"
            placeholder="Password"
          />
        </div>
        {error && <p className='error'>{error}</p>}
        <div className="form-submit">
          <input
            type="button"
            value={"Get Started"}
            onClick={handleInscription}
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
