import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Properties, Property } from '../interfaces/properties';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl
  private accessToken = localStorage.getItem('tokenAccess');

  constructor(private http: HttpClient) { }

  async onSignedIn(email: string, password1: string, password2: string): Promise<any> {
    const url = `${this.apiUrl}/api/auth/register/`;
    const options = {
      method: 'POST',
      body: '{"email":"'+email+'","password1":"'+password1+'","password2":"'+password2+'"}',
      // body: JSON.stringify({
      //   email,
      //   password1,
      //   password2
      // }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      return data ?? [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async onLogedIn(email: string, password: string): Promise<any> {
    const url = `${this.apiUrl}/api/auth/login/`;
    const options = {
      method: 'POST',
      body: '{"email":"'+email+'","password":"'+password+'"}',
      // body: JSON.stringify({
      //   email,
      //   password1,
      //   password2
      // }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      return data ?? [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async onLogedOut(): Promise<any> {
    const url = `${this.apiUrl}/api/auth/logout/`;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      return data ?? [];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  
  // Properties

  async getAllHouses(filters: { landlord_id?: string, [key: string]: any } = {}) {
    let url = `${this.apiUrl}/api/properties/`;

    if (filters.landlord_id) {
      url += `?landlord_id=${encodeURIComponent(filters.landlord_id)}`;
    } else {

    // Construire les autres filtres dynamiquement
    const queryString = Object.entries(filters)
      .filter(([key, value]) => key !== 'landlord_id' && value !== undefined) // Exclure landlord_id
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    
    if (queryString) {
      url += `?${queryString}`;
    }
    }

    const options = { 
      method: 'GET', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      } 
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error(error);
      throw error;      
    }
  }

  getHouses(): Observable<Properties> {
    return this.http.get<Properties>(`${this.apiUrl}/api/properties/`);
  }

  async getPropertyDetail(id: string) {
    const url = `${this.apiUrl}/api/properties/${id}`;
    const options = { 
      method: 'GET', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      } 
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch property details, status: ${response.status}`);
      }
  
      // Si la réponse est au format JSON
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Expected JSON response, but got a different content type');
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
      throw error;
    }
  }
  

  async setProperty(propertyForm: FormGroup) {
    const url = `${this.apiUrl}/api/properties/create/`;
  
    const formData = new FormData();
    for (const field in propertyForm.controls) {
      
      if (field === 'additionnal_images') {
        const images = propertyForm.controls[field].value as File[];
        images.forEach((file) => {
            formData.append('additionnal_images[]', file); // Utilisez 'additionnal_images[]' ici
        });
        console.log('Service formData for additionnal images:', formData);
      } else if (field !== 'favorited' && propertyForm.controls[field].value) {
          formData.append(field, propertyForm.controls[field].value);
      }
    }
  
    try {  
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}` // Ajout du token d'accès ici
        },
        body: formData
      };
  
      console.log('Envoi des données à l\'API avec fetch:', url, options);
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return await response.json();
  
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      throw error;
    }
  }


  async toggleFavorite(propertyId: string): Promise<any> {
    const url = `${this.apiUrl}/api/properties/${propertyId}/toggle_favorite/`;


    try {  
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}` // Ajout du token d'accès ici
        },
      };
  
      console.log('Envoi des données à l\'API avec fetch:', url, options);
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return await response.json();
  
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      throw error;
    }

  }


  // Reservations 

  async onPerformingBooking(propertyId: string, formData: FormData): Promise<any> {
    const url = `${this.apiUrl}/api/properties/${propertyId}/book/`;


    try {  
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}` // Ajout du token d'accès ici
        },
        body: formData,
      };
  
      console.log('Envoi des données à l\'API avec fetch:', url, options);
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return await response.json();
  
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      throw error;
    }

  }


  async getPropertyReservation(propertyId: string) {
    const url = `${this.apiUrl}/api/properties/${propertyId}/reservations/`;
    const options = { 
      method: 'GET', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      } 
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error(error);
      throw error;      
    }
  }


async getUserReservations() {
    const url = `${this.apiUrl}/api/auth/myreservations/`;
    const options = { 
      method: 'GET', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${this.accessToken}` // Ajout du token d'accès ici
      } 
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error(error);
      throw error;      
    }
  }


  // Landlord

  async getLandlordInfo(landlordId: string) {
    const url = `${this.apiUrl}/api/auth/${landlordId}/`;
    const options = { 
      method: 'GET', 
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json', 
      } 
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;  
    } catch (error) {
      console.error(error);
      throw error;      
    }
  }


}
