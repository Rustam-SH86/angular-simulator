import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models/user.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../../../../shared/pipes/phone-format.pipe';
import { BoldOnHoverDirective } from '../../../../shared/directives/bold-on-hover.directive';
import { AnimatedGradientBorderDirective } from '../../../../shared/directives/animated-gradient-border.directive';

@Component({
  selector: 'app-user-card',
  imports: [
    CardModule,
    ButtonModule,
    UpperCasePipe,
    PhoneFormatPipe,
    BoldOnHoverDirective,
    AnimatedGradientBorderDirective,
  ],
  templateUrl: './user-card.component.html',
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
