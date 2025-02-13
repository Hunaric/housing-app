export interface User {
    id: string,               // UUID de l'utilisateur
    email: string,            // Email de l'utilisateur
    name: string,             // Nom de l'utilisateur
    avatar_url: string,       // URL de l'avatar (optionnel)
    is_active: boolean,       // Indicateur si l'utilisateur est actif
    is_superuser: boolean,    // Indicateur si l'utilisateur est un super utilisateur
    is_staff: boolean,        // Indicateur si l'utilisateur est un membre du personnel
    date_joined: string,      // Date d'inscription (format ISO 8601)
    last_login: string | null,  // Dernière connexion (format ISO 8601 ou null si jamais connecté)
}

export interface Landlord {
    id: string,               // UUID de l'utilisateur
    name: string,             // Nom de l'utilisateur
    email: string,             // Nom de l'utilisateur
    avatar_url: string,       // URL de l'avatar (optionnel)
}

export interface UserType {
    id: string,               // UUID de l'utilisateur
    name: string,             // Nom de l'utilisateur
    email: string,             // Nom de l'utilisateur
    avatar_url: string,       // URL de l'avatar (optionnel)
}