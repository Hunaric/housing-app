import { Injectable } from '@angular/core';
import { CookieService as CookieManager} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService: CookieManager) { }

  handleLogin(userId: string, accessToken: string, refreshToken: string): void {
    this.cookieService.set('session_userid', userId, 7, '/', '', false, 'Lax');
    this.cookieService.set('session_access_token', accessToken, 1/144, '/', '', false, 'Lax');
    this.cookieService.set('session_refresh_token', refreshToken, 7, '/', '', false, 'Lax');
  }
}
