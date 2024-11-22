export interface Properties {
    data: Property[];
}

export interface Property {
    id: string;
    title: string;
    price_per_night: number;
    image_url: string;
}