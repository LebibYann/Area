import { LocalStorageKeysEnum } from "./types";

export function useLogin (): boolean {
    const login = localStorage.getItem('login');
    if (localStorage.getItem(LocalStorageKeysEnum.LOGIN) === 'true')
        return (true);
    return (false);
}

export function login (): void {
    localStorage.setItem(LocalStorageKeysEnum.LOGIN, 'true');
}

export function logout (): void {
    localStorage.removeItem(LocalStorageKeysEnum.LOGIN);
}