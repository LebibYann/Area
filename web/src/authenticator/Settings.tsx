import React, { useEffect } from "react";
import { LocalStorageKeysEnum, LoginFormData, User } from "../types";
import { logout, readRequestStatus } from "../utils";
import './Authenticator.css'
import '../components/Button.css'

const Settings = (): JSX.Element => {
  const token = localStorage.getItem(LocalStorageKeysEnum.LOGIN);
  const [form, setForm] = React.useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchUserData = async (): Promise<void> => {
    try {
      if (token == null) {
        return;
      }
      const response = await fetch("http://localhost:8080/users/me", {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        }
      })
      const json = await response.json();
      if (readRequestStatus(json.statusCode, json.message)) {
        setForm({...form, email: json.data.email});
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    window.history.pushState(null, "", window.location.origin);
    if (!token) {
        window.location.replace(window.location.origin);
    }
    console.log(token);
    fetchUserData();
  }, []);

  const handleChange = (
    key: string, 
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
      setForm({...form, [key]: event.target.value});
  }

  const handleDisconnection = async (): Promise<void> => {
    logout();
    window.location.replace(window.location.origin);
  }

  const handleProfileChange = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/users/me", {
        method: "PATCH",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(
          {
            form
          }
        )
      })
      const json = await response.json();
      if (readRequestStatus(json.statusCode, json.message)) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleAccountDeletion = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/users/me", {
        method: "DELETE",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token,
        }
      })
      const json = await response.json();
      if (readRequestStatus(json.statusCode, json.message)) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    loading ? <div>loading...</div> :
    <section className="login-container">
      <h1 className="form-title">Account Settings</h1>
      <div className='form-input'>
        <input onChange={(e): void => handleChange("email", e)} value={form.email} type="email" placeholder='Email'/>
      </div>
      <div className='form-input'>
        <input onChange={(e): void => handleChange("password", e)} value={form.password} type="Password" placeholder='Password'/>          
      </div>  
      <button className={"button black-button"} onClick={handleProfileChange}>Change profile</button>
      <button className={"button red-button"} onClick={handleAccountDeletion}>Delete Account</button>
      <button className={"button red-button"} onClick={handleDisconnection}>disconnect</button>
    </section>
  )
}

export default Settings;