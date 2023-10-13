export class Server {
    id!: number;
    name!: string;
    ipAddress!: string;
    sites!: Host[];
}

export class Host {
    id!: number;
    name!: string;
    domainName!: string;
    ipAddress!: string;
    active!: boolean
}