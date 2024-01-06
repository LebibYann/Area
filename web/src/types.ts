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
    name: string;
    description: string;
}

export interface Service {
    name: string;
    actions: Area[];
    reactions: Area[];
}

export interface AppletArea {
    service: string;
    area: Area;
}