import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public afAuth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private firedb: FireDBService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryRegister(value: any) {
    this.afAuth
      .doRegister(value)
      .then((user) =>{
        this.afAuth.authUser = user.user;


          this.toastr.success(
            'Hemos enviado un correo de verificacion a ' +
              user.user.email +
              ' Compruebe su correo antes entrar',
            'Gracias por registrarse'), {
              timeOut: 10000,
            }

         }
        )
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          //alert('Contraseña no válida');
          this.toastr.error(' Email ya en uso ', 'ERROR REGISTRO');
        } else if (error.code === 'auth/weak-password') {
          // alert('El usuario no existe');
          this.toastr.error(
            'La contraseña debe tener al menos 6 caracteres',
            'ERROR REGISTRO'
          );
        } else if (error.code === 'auth/invalid-email') {
          //alert('Formato de email no valido');
          this.toastr.error('Formato de email no válido', 'ERROR REGISTRO');
        }else{
          console.log(error);
        }
      });
  }
}
