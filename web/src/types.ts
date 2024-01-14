
/**
 *
 *
 * @export
 * @enum {number} LocalStorageKeysEnum the keys of the local storage
 */
export enum LocalStorageKeysEnum {
    LOGIN = 'login',
    SERVICES = 'services',
}

/**
 *
 *
 * @export
 * @interface LoginFormData the data structure of the login form
 */
export interface LoginFormData {
    email: string;
    password: string;
}

/**
 *
 *
 * @export
 * @interface User the data structure of a user
 */
export interface User {
    id: number;
    email: string;
    created: string;
    updated: string;
}

/**
 *
 *
 * @export
 * @interface Area the data structure of an area
 */
export interface Area {
    id: number;
    name: string;
    description: string;
    param1: string | undefined;
    param2: string | undefined;
    param3: string | undefined;
    param4: string | undefined;
}

/**
 *
 *
 * @export
 * @interface Service the service of an applet
 */
export interface Service {
    id: number;
    name: string;
    actions: Area[];
    reactions: Area[];
}

/**
 *
 *
 * @export
 * @interface AppletArea the area of an applet
 */
export interface AppletArea {
    service: string;
    area: Area;
    id?: number | undefined;
}