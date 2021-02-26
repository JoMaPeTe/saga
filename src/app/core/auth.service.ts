import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FireDBService } from './fire-db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: any = null;

  constructor(
    public afAuth: AngularFireAuth, //atributo publico de la clase del tipo AngularFireAuth
    private router: Router,
    private firedb: FireDBService
  ) {}

  //Observador para asegurar que la autenticación no está en proceso
  //Si esta logado, authuser no será null
  user: any = this.afAuth.authState.pipe(
    map((authState) => {
      //console.log('authState: ', authState);
      if (authState) {
        this.authUser = authState;
        return authState;
      } else {
        return null;
      }
    })
  );

  // Send email verification when new user sign up
  // var actionCodeSettings = {
  //   url: 'http://localhost:4200/',
  // };

  async doRegister(value) {
    //createUserWithEmailAndPassword comprueba formato email y contraseña (6 caracteres mínimo)
    //Si es correcto devuelve objeto user
    //Documentacion https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (user) => {
            var actionCodeSettings = {
                url: 'https://saga-1f81f.web.app/',
             };
            this.authUser = user.user;
            console.log('user logado con mail: ', user.user.email);
            console.log(user.user.emailVerified);
            user.user.sendEmailVerification(actionCodeSettings);

            resolve(user);
          },
          (err) => reject(err)
        );
    });
  }

  login(value) {
    console.log('Login!!');

    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        (res) => {
          console.log('user logado con mail: ', res.user.email);
          console.log(res.user.emailVerified);
          this.authUser = res.user;
          this.firedb.updateUserData(res.user);
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  glogin() {
    return new Promise<any>((resolve, reject) => {
      console.log('google login!');
      let provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          console.log('user logado: ', res);

          this.authUser = res.user;
          this.firedb.updateUserData(res.user);
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  logout() {
    console.log('logout!');
    this.afAuth.signOut();

    this.router.navigate(['/']);
  }
}
