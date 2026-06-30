import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private http:HttpClient = inject(HttpClient);

  public getUsers(): Observable<IUser[]>  {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
