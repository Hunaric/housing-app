export interface Quartier {
    id_quartier: number;
    libelle_quartier: string;
}

export interface Arrondissement {
    id_arrondissement: number;
    libelle_arrondissement: string;
    quartiers: Quartier[];
}

export interface Commune {
    id_commune: number;
    libelle_commune: string;
    arrondissements: Arrondissement[];
}

export interface Departement {
    id_departement: number;
    libelle_departement: string;
    communes: Commune[];
}
