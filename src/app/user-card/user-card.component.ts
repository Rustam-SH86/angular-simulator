import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { IUser } from '../interfaces/user-interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
import { BoldOnHoverDirective } from '../directives/bold-on-hover.directive';
import { AnimatedGradientBorderDirective } from '../directives/animated-gradient-border.directive';

@Component({
  selector: 'app-user-card',
  imports: [CardModule,ButtonModule,UpperCasePipe,PhoneFormatPipe,BoldOnHoverDirective,AnimatedGradientBorderDirective],
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
