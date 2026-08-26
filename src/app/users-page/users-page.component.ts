import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { IUser } from '../interfaces/user-interface';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { PluralPipe } from '../pipes/plural.pipe';

@Component({
  selector: 'app-users-page',
  imports: [CommonModule, UserCardComponent, UserCreateComponent, UserFilterComponent, PluralPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  private userService = inject(UserService);
  private filterSubject = new BehaviorSubject<string>('');
  users$ = this.userService.getUsers();

  filteredUsers$ = combineLatest([this.users$, this.filterSubject]).pipe(
    map(([users, searchTerm]: [IUser[], string]) => {
      return users.filter((user: IUser) =>
        user.name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()),
      );
    }),
  );

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  addUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onFilterChange(searchTerm: string): void {
    this.filterSubject.next(searchTerm);
  }
}
