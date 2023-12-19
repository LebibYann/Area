import { ClientInt } from "./client.interface";
import { ServiceInt } from "./service.interface";

export interface AboutInt {
    client: ClientInt;
    server: {
        current_time: number;
        services: ServiceInt[];
    };
}