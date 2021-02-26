import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryGoogleLogin(): void {
    this.authService.glogin().then((res) => {
      // this.router.navigate(['/user']);
    });
  }

  tryLogin(value: any): void {
    this.authService.login(value).catch((error) => {
      if (error.code === 'auth/wrong-password') {
        //alert('Contraseña no válida');
        this.toastr.error('Contraseña no válida', 'Error Login');
      } else if (error.code === 'auth/user-not-found') {
        // alert('El usuario no existe');

        this.toastr.error('El usuario no existe', 'Error Login');
      } else if (error.code === 'auth/invalid-email') {
        //alert('Formato de email no valido');
        this.toastr.error('Formato de email no valido', 'Error Login');
      }
    });
  }
}
