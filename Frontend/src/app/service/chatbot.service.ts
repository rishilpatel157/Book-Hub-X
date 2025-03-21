import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService implements PipeTransform{

  url :string = "http://localhost:8080";
  constructor(private http :HttpClient,private sanitizer: DomSanitizer) { }
  
  userPrompt(message:any):Observable<any>{

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    console.log(message)
    return this.http.get<any>(`${this.url}/prompt/${message}`,{headers,responseType:'text' as 'json'})

  }
  transform(value: string): any {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }

}
