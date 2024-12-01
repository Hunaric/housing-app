import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl
  private accessToken = localStorage.getItem('tokenAccess');

  constructor() { }

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

  async getAllHouses() {
    const url = `${this.apiUrl}/api/properties/`;
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
      } else if (propertyForm.controls[field].value) {
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

}
