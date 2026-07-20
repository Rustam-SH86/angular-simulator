import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { IUser } from '../interfaces/user-interface';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [CommonModule, UserCardComponent,UserCreateComponent,UserCreateComponent,UserFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',


})
export class UsersPageComponent {
  private userService = inject(UserService);
  private filterSubject = new BehaviorSubject<string>('');
  public users$ = this.userService.getUsers();

  public filteredUsers$ = combineLatest([
    this.users$,
    this.filterSubject,
  ]).pipe(
    map(([users, searchTerm]: [IUser[], string]) => {
      return users.filter((user: IUser) =>
        user.name
          .trim()
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase()),
      );
    }),
  );
  
  
  public ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  public deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  public addUser(user: IUser): void {
    this.userService.addUser(user);
  }

  public onFilterChange(searchTerm: string): void {
    this.filterSubject.next(searchTerm);
  }
}
