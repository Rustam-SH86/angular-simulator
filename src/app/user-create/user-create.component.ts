import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../interfaces/user-interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BoldOnHoverDirective } from '../directives/bold-on-hover.directive';
import { AnimatedGradientBorderDirective } from '../directives/animated-gradient-border.directive';

@Component({
  selector: 'app-user-create',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    BoldOnHoverDirective,
    AnimatedGradientBorderDirective,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  private fb = inject(FormBuilder).nonNullable;

  @Output()
  createUser = new EventEmitter<IUser>();

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],

    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],

    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],

    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],

    website: ['', [Validators.maxLength(100)]],

    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],

      street: ['', [Validators.required, Validators.maxLength(100)]],

      suite: ['', [Validators.maxLength(50)]],

      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],

      geo: this.fb.group({
        lat: [''],
        lng: [''],
      }),
    }),

    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],

      catchPhrase: ['', [Validators.maxLength(200)]],

      bs: ['', [Validators.maxLength(100)]],
    }),
  });

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const newUser: IUser = {
      id: Date.now(),
      ...this.userForm.getRawValue(),
    };

    this.createUser.emit(newUser);

    this.userForm.reset();
  }
}
