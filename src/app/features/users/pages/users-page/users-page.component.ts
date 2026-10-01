import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UsersFacade } from '../../application/users.facade';
import { IUser } from '../../models/user.model';
import { UserCardComponent } from '../../ui/user-card/user-card.component';
import { UserCreateComponent } from '../../ui/user-create/user-create.component';
import { UserFilterComponent } from '../../ui/user-filter/user-filter.component';
import { PluralPipe } from '../../../../shared/pipes/plural.pipe';

@Component({
  selector: 'app-users-page',
  imports: [UserCardComponent, UserCreateComponent, UserFilterComponent, PluralPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPageComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  readonly filteredUsers = this.usersFacade.filteredUsers;

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  deleteUser(id: number): void {
    this.usersFacade.deleteUser(id);
  }

  addUser(user: IUser): void {
    this.usersFacade.addUser(user);
  }

  onFilterChange(searchTerm: string): void {
    this.usersFacade.setFilter(searchTerm);
  }
}
