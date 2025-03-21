import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { Page } from '../page.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient, private userService: UserService) {}

  uploadBook(books: any): Observable<any> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.url}/author/book`, books, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  uploadBookImage(image: File, bookId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.url}/author/bookimage/${bookId}`, formData, { headers, responseType: 'number' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  uploadBookPDF(file: File, bookId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.url}/author/bookpdf/${bookId}`, formData, { headers, responseType: 'number' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  getAuthorBooks(): Observable<any[]> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.url}/author/books`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getBookImage(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any[]>(`${this.url}/author/bookImage`, { headers, responseType: 'arraybuffer' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  publishBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.patch<string>(`${this.url}/author/bookpublish/${id}`, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  unpublishBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.patch<any>(`${this.url}/author/bookunpublish/${id}`, { headers, responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete<any>(`${this.url}/author/deletebook/${id}`, { headers, responseType: 'text' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  getPublishedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/publishedbooks`).pipe(
      catchError(this.handleError)
    );
  }

  getPagedItems(page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<any>>(`${this.url}/paged`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getAuthorPagedItems(page: number, size: number): Observable<Page<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<any>>(`${this.url}/authorbookspaged`, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  getBookById(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(`${this.url}/book/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/downloadpdf/${id}`, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  getAllBook(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any[]>(`${this.url}/booklist`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
