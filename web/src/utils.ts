import { LocalStorageKeysEnum, Service } from "./types";
import google from "./assets/images/GoogleIcon.png";
import discord from "./assets/images/DiscordIcon.png";

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
    console.log(data.server.services);
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