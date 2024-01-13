import { LocalStorageKeysEnum, Service } from "./types";
import google from "./assets/images/GoogleIcon.png";
import discord from "./assets/images/DiscordIcon.png";
import queryString from "query-string";

export function useLogin(): string | null {
  return localStorage.getItem("login");
}

export function login(access_token: string): void {
  localStorage.setItem(LocalStorageKeysEnum.LOGIN, access_token);
}

export function logout(): void {
  localStorage.removeItem(LocalStorageKeysEnum.LOGIN);
}

export async function useServices(): Promise<Service[]> {
  try {
    const response = await fetch("http://localhost:8080/about.json", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.server.services;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function useService(serviceName: string): Promise<Service | undefined> {
  const services = await useServices();
  return services.find((service) => service.name === serviceName);
}

export function readRequestStatus(status: number, message: string): boolean{
  switch (status) {
    case 200:
    case 201:
      return true;
    case 401:
      logout();
      break;
  }
  console.log(status)
  console.log(message);
  return false;
}

export function getServiceUri(service: string): string | undefined {
  switch (service) {
    case "google":
      return "https://accounts.google.com/o/oauth2/v2/auth" + 
      `?client_id=` + import.meta.env.VITE_GOOGLE_CLIENT_ID +
      "&redirect_uri=http://localhost:8081/login/auth/google" +
      "&access_type=offline" +
      "&response_type=code" +
      "&scope=openid%20profile%20email" +
      "&include_granted_scopes=true";;
    case "spotify":
      return "https://accounts.spotify.com/authorize?" + queryString.stringify({
        response_type: "code",
        client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        scope: "user-read-private user-read-email app-remote-control streaming user-read-playback-state user-modify-playback-state user-read-currently-playing",
        redirect_uri: "http://localhost:8081/login/auth/spotify"
      });
    case "discord":
      return "https://discord.com/api/oauth2/authorize?client_id=1184305079029878785&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Fauth%2Fdiscord&scope=identify%20email";
    case "github":
      return "https://github.com/login/oauth/authorize?client_id=fee6c82e9e3f4aa4c447&redirect_uri=http://localhost:8081/login/auth/github&response_type=code";
    case "twitter":
      return "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=RDd4M0owY3k1emZmQmR5aFlENmU6MTpjaQ&redirect_uri=http://localhost:8081/login/auth/twitter&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain"
    default:
      return undefined;
  }
}