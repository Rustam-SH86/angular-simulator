import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public login(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    if (!username || !password) {
      return;
    }

    this.authService
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
