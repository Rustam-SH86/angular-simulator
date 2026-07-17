import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { IUser } from '../interfaces/user-interface';
import { UserFilterComponent } from '../user-filter/user-filter.component';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-users-page',
  imports: [CommonModule, UserCardComponent,UserCreateComponent,UserCreateComponent,UserFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  private userService = inject(UserService);
  public users$ = this.userService.getUsers();
  public filteredUsers$ = this.users$
  
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
  this.filteredUsers$ = this.userService.users$.pipe(
    map(users =>
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
      )
    )
  );
}
}
