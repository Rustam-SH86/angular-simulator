import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../interfaces/user-interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-card',
  imports: [CardModule,ButtonModule],
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true })
  user!: IUser;

  @Output()
  deleteUser = new EventEmitter<number>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.user.id);
  }
}
