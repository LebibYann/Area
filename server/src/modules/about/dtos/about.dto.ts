import { ClientDto } from "./client.dto";
import { ServiceDto } from "./service.dto";

export class AboutDto {
    client: ClientDto;
    server: {
        current_time: number;
        services: ServiceDto[];
    };
}
