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

export function useServices(): Service[] {
  return [
    { name: "google", actions: [], reactions: [] },
    { name: "discord", actions: [], reactions: [] },
  ];
}

