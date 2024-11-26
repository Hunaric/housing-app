import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl

  constructor() { }

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
}
