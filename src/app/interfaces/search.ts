export interface SearchQuery {
    country: string,           
    checkIn: string | null,           
    checkOut: string | null,          
    guests: number,
    bathrooms: number,
    bedrooms: number,
    category: string,      
    last_login: string | null,
}

export interface Landlord {
    id: string,               // UUID de l'utilisateur
    name: string,             // Nom de l'utilisateur
    email: string,             // Nom de l'utilisateur
    avatar_url: string,       // URL de l'avatar (optionnel)
}