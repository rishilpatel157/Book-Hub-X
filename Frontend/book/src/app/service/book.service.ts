import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { BooksDto } from '../book';

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
      `${this.url}/author/bookimage/${bookId}`, formData,{ headers,responseType:'number' as 'json' }
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
      `${this.url}/author/bookpdf/${bookId}`, formData, { headers,responseType:'number' as 'json' }
    );
  }

  getAuthorBooks():Observable<any[]>{
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(`${this.url}/author/books`,{headers}) 
  }
}
