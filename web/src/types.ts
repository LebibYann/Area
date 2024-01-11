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
    param1: string;
    param2: string;
    param3: string;
    param4: string;
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