import { Landlord, User } from "./user";

export interface Properties {
    data: Property[],
}

export interface Property {
    id: string,
    title: string,
    price_per_night: number,
    image_url: string,
    favorited: string[],
}

export interface PropertyDetail {
    id: string,            // UUID
    title: string,         // Titre de la propriété
    description: string,   // Description
    price_per_night: number,  // Prix par nuit
    bedrooms: number,      // Nombre de chambres
    bathrooms: number,     // Nombre de salles de bain
    guests: number,        // Nombre de personnes qu'elle peut accueillir
    country: string,       // Pays
    country_code: string,  // Code du pays
    category: string,      // Catégorie
    // favorited: boolean,
    image_url: string,     // URL de l'image principale
    landlord: Landlord,
    created_at: string,    // Date de création de la propriété (format ISO 8601)
    additionnal_images?: PropertyImage[],  // Tableau d'images supplémentaires (optionnel)
}

export interface PropertyImage {
    id: string,           // UUID
    property: string,     // ID de la propriété associée
    image_url: string,    // URL de l'image
    created_at: string,   // Date de création de l'image (format ISO 8601)
}

export interface Reservation {
    id: string,
    property:PropertyDetail,
    start_date: string,
    end_date: string,
    number_of_nights: number,
    guests: number,
    total_price: number,
    created_by: User,
    created_at: string,
}

export interface ReservationList {
    data: Reservation[],
}
  