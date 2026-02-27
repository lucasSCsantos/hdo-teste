import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-auth',
  imports: [RouterModule, NzCardComponent],
  templateUrl: './auth.layout.html',
  styleUrl: './auth.layout.scss',
})
export class AuthLayout {}
