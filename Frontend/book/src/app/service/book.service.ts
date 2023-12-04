import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Page } from '../page.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  url: string = 'http://localhost:8080';
  constructor(private http: HttpClient, private userService: UserService) {}

  uploadBook(books: any): Observable<any> {
    //  formData.append('books',);
    console.log(books);

    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.url}/author/book`, books, { headers });
  }

  uploadBookImage(image: File, bookId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      `${this.url}/author/bookimage/${bookId}`,
      formData,
      { headers, responseType: 'number' as 'json' }
    );
  }

  uploadBookPDF(file: File, bookId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const token = this.userService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      `${this.url}/author/bookpdf/${bookId}`,
      formData,
      { headers, responseType: 'number' as 'json' }
    );
  }

  getAuthorBooks(): Observable<any[]> {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.url}/author/books`, { headers });
  }

  getBookImage(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<any[]>(`${this.url}/author/bookImage`, {
      headers,
      responseType: 'arraybuffer' as 'json',
    });
  }

  publishBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<string>(`${this.url}/author/bookpublish/${id}`, {
      headers,
      responseType: 'text',
    });
  }

  unpublishBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.patch<any>(`${this.url}/author/bookunpublish/${id}`, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  deleteBook(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.delete<any>(`${this.url}/author/deletebook/${id}`, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  getPublishedBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/publishedbooks`);
  }
  getPagedItems(page: number, size: number): Observable<Page<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.url}/paged`, { params });
  }

  getAuthorPagedItems(page: number, size: number): Observable<Page<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.url}/authorbookspaged`, {headers, params });
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/book/${id}`);
  }

  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/downloadpdf/${id}`, {
      responseType: 'blob',
    });
  }

  getAllBook():Observable<any[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any[]>(`${this.url}/booklist`,{headers})
  }

  
}
