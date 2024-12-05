import { Landlord } from "./user";

export interface Properties {
    data: Property[],
}

export interface Property {
    id: string,
    title: string,
    price_per_night: number,
    image_url: string,
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
  