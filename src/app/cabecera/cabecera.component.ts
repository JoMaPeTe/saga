import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';
import { FirestorageService } from '../core/firestorage.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  darkForm: FormGroup;
  imageURL: any = null;

  constructor(
    public auth: AuthService,
    public db: FireDBService,
    private fb: FormBuilder,
    public firestorage: FirestorageService
  ) {}

  ngOnInit(): void {
    this.createSwitch();
    this.darkLight();
    this.readURL();
  }

  createSwitch() {
    this.darkForm = this.fb.group({ switch: false });
  }
  darkLight() {
    const body = document.getElementById('body');
    const cabecera = document.getElementById('cabecera');
    this.auth.setSwitch(this.darkForm);
    this.darkForm.get('switch').valueChanges.subscribe((value) => {
      if (value) {
        body.setAttribute('class', 'bg-dark text-white');
        cabecera.setAttribute(
          'class',
          'navbar navbar-expand-md my-0 h5 bg-dark text-white'
        );
      } else {
        body.setAttribute('class', 'bg-img');
        cabecera.setAttribute(
          'class',
          'navbar navbar-expand-md bg-primary my-0 h5'
        );
      }
    });
  }

  readURL() {
    this.auth.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.auth.fillAdmins(); //permite mostrar a los admin el link a users
        this.imageURL = this.db.getUserImage(user).pipe(
          map((data) => {
            console.log('DATA: ', data.payload.val());
            let img;
            if (data) {
              img = data.payload.val();
            } else {
              img = null;
            }
            this.auth.setImageURL(img);
            return img;
          })
        );
      }
    });
  }
}
