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

  async onLogedIn(username: string, password: string): Promise<any> {
    const url = `${this.apiUrl}/authentication/login`;
    const options = {
      method: 'POST',
      body: '{"username":"'+username+'","password":"'+password+'"}',
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
