import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../class/users';
import { concatMap,tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'http://localhost:8080';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  // registerUser(user: any): Observable<string> {
  //   return this.http.post<any>(`${this.url}/users`, user, {
  //     responseType: 'text' as 'json',
      
  //   });
  // }

  registerUser(user: any): Observable<string> {
    return this.http.post<any>(`${this.url}/users`, user, {
      observe: 'response', // Observe the full HTTP response
      responseType: 'text' as 'json', // Expect text response
    }).pipe(
      tap((response: HttpResponse<any>) => {
        const jwtToken = response.headers.get('Authorization');
        if (jwtToken) {
          localStorage.setItem('jwtToken', jwtToken); // Store the token
          console.log('JWT stored:', jwtToken);
        } else {
          console.error('JWT not found in response headers.');
        }
      }),
      // Now return the response body message
      tap(response => console.log('Registration Message:', response.body)),
      tap(response => {
        if(response.body === null){
          throw new Error('No Response Body');
        }
      }),
      map(response => response.body)
    );
  }

  getJwtToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  removeJwtToken(): void {
    localStorage.removeItem('jwtToken');
  }


  uploadProfilePicture(file: File, email: string): Observable<String> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.url}/upload/${email}`, formData, {
      responseType: 'text' as 'json',
    });
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(email + ':' + password)}`,
    });

    return this.http.get<any>(`${this.url}/signIn`, {
      headers,
      observe: 'response',
    });
  }

  getUser(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.url}/user`, { headers });
  }

  getProfilePicture(): Observable<ArrayBuffer> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get<ArrayBuffer>(`${this.url}/profile-picture`, {
      headers,
      responseType: 'arraybuffer' as 'json',
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
