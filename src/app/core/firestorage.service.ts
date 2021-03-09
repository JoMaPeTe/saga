import { Injectable } from '@angular/core';
import {  AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage'
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FireDBService } from './fire-db.service';


@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

    path = '';
    task: AngularFireUploadTask | undefined ;
    uploadProgress = new Observable();
    downloadURL$: Observable<string> = of(''); //observable, permite que se actualice la plantilla hmtl
    imageURL = '';//string que vamos a guardar en firedb asociado al user
  constructor(public firestorage: AngularFireStorage,
              public auth: AuthService,
              private db: FireDBService ) { }

  uploadFile(event: any) {


    let ext = '.jpg';
    if (event.target.files[0].type === 'image/png'){
      ext = '.png';
    }else if (event.target.files[0].type === 'image/jpeg'){
      ext = '.jpeg';
    }

    const path = this.path + this.auth.authUser.uid  + ext;
    const ref = this.firestorage.ref(path);

    this.task = this.firestorage.upload(  path, event.target.files[0]);

    this.uploadProgress = this.task.percentageChanges(); //Rellena barrita progreso <progress>

     this.task.snapshotChanges().pipe( finalize ( ()=> {
       this.downloadURL$ = ref.getDownloadURL();
       this.downloadURL$.subscribe((url) => {
         this.imageURL = url;
        this.db.updateUserImageURL(this.imageURL, this.auth.authUser);
      });
     })
     ).subscribe();
  }






}
