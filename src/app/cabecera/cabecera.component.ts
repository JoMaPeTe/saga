import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
imageURL:any =null ;
myUser:any;
images:any[]=[];
users:any[]=[];
swithValue:boolean;
  constructor(
    public auth: AuthService,
    public db:  FireDBService,
    private fb: FormBuilder,
    public firestorage : FirestorageService
  ) {  }
/////////////////////////////////////




/////////////////////////////////////
  ngOnInit(): void {
    this.createSwitch();
    this.darkLight();
    this.auth.afAuth.onAuthStateChanged((user)=>{ if(user){
      this.auth.fillAdmins();
   this.imageURL = this.db.getUserImage( user).pipe(
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
  })



  }

  createSwitch() {
    this.darkForm = this.fb.group({ switch: false });

  }
  darkLight() {
    const body = document.getElementById('body');
    this.auth.setSwitch(this.darkForm);
    this.darkForm.get('switch').valueChanges.subscribe((value) => {
      if (value) {
        body.setAttribute('class', 'bg-dark text-white');

      } else {
        body.setAttribute('class', 'bg-img');
      }

    });


  }

readURL(user){

    //Las siguientes 2 lineas, son 2 dias de trabajo, recupera url de la imagen de realtime database



      this.db.getUserImage(user) .subscribe(snap => {
       console.log('images: ',snap.payload.val());
       this.imageURL = snap.payload.val(); }
 ,
 (err)=>console.log(err))
   }

}
