import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { MessageService } from '../../../core/feedback/messages/message.service';
import { LocalStorageService } from '../../../core/storage/local-storage.service';
import { UsersApiService } from '../data-access/users-api.service';
import { IUser } from '../models/user.model';

@Injectable()
export class UsersFacade {
  private readonly usersApi = inject(UsersApiService);
  private readonly messageService = inject(MessageService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly usersStorageKey = 'users';

  private readonly usersState = signal<IUser[]>([]);
  readonly users = this.usersState.asReadonly();

  private readonly filterState = signal('');
  readonly filter = this.filterState.asReadonly();

  readonly filteredUsers = computed(() => {
    const searchTerm = this.filterState().trim().toLowerCase();

    return this.usersState().filter((user) => user.name.trim().toLowerCase().includes(searchTerm));
  });

  loadUsers(): void {
    const storedUsers = this.localStorageService.getValue<IUser[]>(this.usersStorageKey);

    if (storedUsers !== null) {
      this.usersState.set(storedUsers);
      return;
    }

    this.usersApi
      .getUsers()
      .pipe(
        tap((users) => {
          this.usersState.set(users);
          this.localStorageService.setValue(this.usersStorageKey, users);
        }),
        catchError(() => {
          this.messageService.showError('Не удалось загрузить пользователей');
          this.usersState.set([]);
          return of([]);
        }),
      )
      .subscribe();
  }

  setFilter(searchTerm: string): void {
    this.filterState.set(searchTerm);
  }

  deleteUser(id: number): void {
    const users = this.usersState().filter((user) => user.id !== id);

    this.updateUsers(users);
  }

  addUser(user: IUser): void {
    this.updateUsers([...this.usersState(), user]);
  }

  private updateUsers(users: IUser[]): void {
    this.usersState.set(users);
    this.localStorageService.setValue(this.usersStorageKey, users);
  }
}
