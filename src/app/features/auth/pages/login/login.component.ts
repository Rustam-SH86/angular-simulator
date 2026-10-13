import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../../../core/auth/auth.facade';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../../core/feedback/messages/message.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      return;
    }

    this.authFacade
      .login({
        username,
        password,
      })
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

          this.router.navigateByUrl(returnUrl);
        },

        error: () => {
          this.messageService.showError('Invalid username or password');
        },
      });
  }
}
