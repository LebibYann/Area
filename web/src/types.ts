export enum LocalStorageKeysEnum {
    LOGIN = 'login',
    FULLSCREEN = 'fullscreen',
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