export enum LocalStorageKeysEnum {
    LOGIN = 'login',
    SERVICES = 'services',
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    email: string;
    created: string;
    updated: string;
}

export interface Area {
    id: number;
    name: string;
    description: string;
    param1: string | undefined;
    param2: string | undefined;
    param3: string | undefined;
    param4: string | undefined;
}

export interface Service {
    id: number;
    name: string;
    actions: Area[];
    reactions: Area[];
}

export interface AppletArea {
    service: string;
    area: Area;
    id?: number | undefined;
}