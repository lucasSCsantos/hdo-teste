import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NzFlexModule, NzFormModule, NzInputModule, ReactiveFormsModule, NzButtonModule, NzCheckboxModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private notificationService = inject(NzNotificationService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    if (!this.form.valid) {
      this.notificationService.error('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    const payload = this.form.getRawValue();

    this.authService.login(payload).subscribe({
      next: () => this.notificationService.success('Sucesso', 'Login realizado com sucesso!'),
      error: () => this.notificationService.error('Erro', 'Falha ao fazer login. Verifique suas credenciais e tente novamente.'),
    });
  }
}
