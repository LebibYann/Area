import { LocalStorageKeysEnum, Service } from "./types";
import google from "./assets/images/GoogleIcon.png";
import discord from "./assets/images/DiscordIcon.png";

export function useLogin(): boolean {
  const login = localStorage.getItem("login");
  if (localStorage.getItem(LocalStorageKeysEnum.LOGIN) === "true") return true;
  return false;
}

export function login(): void {
  localStorage.setItem(LocalStorageKeysEnum.LOGIN, "true");
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

