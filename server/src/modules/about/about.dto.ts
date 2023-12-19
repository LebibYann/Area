export class ClientDto {
    host: string;
}

export class AReaDto {
    name: string;
    description: string;
}

export class ServiceDto {
    name: string;
    actions: AReaDto[];
    reactions: AReaDto[];
}

export class AboutDto {
    client: ClientDto;
    server: {
        current_time: number;
        services: ServiceDto[];
    };
}
