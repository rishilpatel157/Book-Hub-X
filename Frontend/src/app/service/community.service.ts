import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../page.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  url:string = "http://localhost:8080"

  constructor(private http:HttpClient) { }


  createCommunity(title:string,id:number):Observable<any>{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(`${this.url}/community/${id}`,title,{headers,responseType:'text' as 'json'})
  }

  getPagedItems(page: number, size: number): Observable<Page<any>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<any>>(`${this.url}/community/pages`, {headers, params });
  }

  getCommunityById(id:number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.url}/communitybyid/${id}`,{headers})
  }

  joinCommunity(id:number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.url}/communityjoin/${id}`,{headers})
  }
  
  getMessage(id:number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.get<any>(`${this.url}/communityallMessage/${id}`,{headers})
  }

  sendMessage(id:number,message:string):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(`${this.url}/communitydiscussion/${id}`,message,{headers})
  }


}
