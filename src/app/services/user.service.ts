import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../user-interface';
import { UserApiService } from './user-api.service';
import { LoaderService } from '../loader.service';
import { MessageService } from '../../message.service/message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject = new BehaviorSubject<IUser[]>([]);
  public users$ = this.usersSubject.asObservable();

  public setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  public getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  public loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApiService.getUsers().pipe(
      tap((users: IUser[]) => {
        this.setUsers(users);
      }),

      catchError(() => {
        this.messageService.showError('Не удалось загрузить пользователей');
        this.setUsers([]);
        return of([]);
      }),
      finalize(() => {
        this.loaderService.hideLoader();
      }),
    );
  }
}
