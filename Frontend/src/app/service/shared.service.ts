import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private isloggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isloggedIn$: Observable<boolean> = this.isloggedInSubject.asObservable();


  updateIsLoggedInStatus(status: boolean) {
    this.isloggedInSubject.next(status);
  }
}
