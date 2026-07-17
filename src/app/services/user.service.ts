import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/user-interface';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly USERS_STORAGE_KEY = 'users';

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

    const storedUsers = this.localStorageService.getValue<IUser[]>(this.USERS_STORAGE_KEY);

    if (storedUsers !== null) {
      this.setUsers(storedUsers);
      this.loaderService.hideLoader();

      return of(storedUsers);
    }

    return this.userApiService.getUsers().pipe(
      tap((users: IUser[]) => {
        this.setUsers(users);

        this.localStorageService.setValue(this.USERS_STORAGE_KEY, users);
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

  public deleteUser(id: number): void {
    const users = this.usersSubject.value;
    const updatedUsers = users.filter((user) => user.id !== id);
    this.usersSubject.next(updatedUsers);

    this.localStorageService.setValue(this.USERS_STORAGE_KEY, updatedUsers);
  }

  public addUser(user: IUser): void {
    const updatedUsers = [...this.usersSubject.value, user];

    this.usersSubject.next(updatedUsers);

    this.localStorageService.setValue(this.USERS_STORAGE_KEY, updatedUsers);
  }
}
