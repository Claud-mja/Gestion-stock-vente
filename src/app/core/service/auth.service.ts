import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'
import { User } from '../helpers/fake-backend'
import { of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null
  public readonly authSessionKey = '_RIZZ_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const simulatedUser: User = {
      id: 1,               
      email: email,        
      token: 'fake-jwt-token',  
  };

  return of(simulatedUser).pipe(
    map((user) => {
      if (user && user.token) {
        this.user = user;
        this.saveSession(user.token);
      }
      return user;
    })
  );
  
    // return this.http.post<User>(`/api/login`, { email, password }).pipe(
    //   map((user) => {
    //     if (user && user.token) {
    //       this.user = user
    //       this.saveSession(user.token)
    //     }
    //     return user
    //   })
    // )
  }

  logout(): void {
    this.removeSession()
    this.user = null
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token)
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }

  getSessionActif(): string{
    return this.cookieService.get(this.authSessionKey)
  }

  isUserConnected(): boolean {
    const token = this.session;
    return token !== null && token !== ''; 
  }

  isConnected(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.isUserConnected());
    });
  }
}
