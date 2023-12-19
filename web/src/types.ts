export enum LocalStorageKeysEnum {
    LOGIN = 'login',
    FULLSCREEN = 'fullscreen',
}

export interface ServiceAction {
    name: string;
    description: string;
}

export interface ServiceReaction {
    name: string;
    description: string;
}

export interface Service {
    name: string;
    actions: ServiceAction[];
    reactions: ServiceReaction[];
}
