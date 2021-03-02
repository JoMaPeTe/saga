import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireDBService {

  constructor(private db: AngularFireDatabase,

    )  { }

  makeAdmin(user:any){
    const path = 'admins/' + user.key;
    const u = {
      email: user.email
    }
    this.db.object(path).update(u)
    .catch( error => console.log(error));
  }
  removeAdmin(userUid: any){
    const path = 'admins/' + userUid;
    return this.db.object(path).remove();
  }


  updateUserData(user: any){
    console.log('user: ', user);
    const path = 'users/' + user.uid;
    const u = {
      email: user.email
    }
    this.db.object(path).update(u)
    .catch( error => console.log(error));

  }
  updateUserImageURL(url: any,user){

    const path = 'users/' + user.uid ;
    const u = {
      image: url
    }
    this.db.object(path).update(u)
    .catch( error => console.log(error));

  }
  getUserImage(user){

    const path = 'users/'+ user.uid + '/image';
    console.log(path);

     return  this.db.object(path).snapshotChanges();
  }
  getUsers(){
    const path = 'users/';
    //return this.db.list(path).valueChanges();
    return this.db.list(path).snapshotChanges();
  }
  getAdmins(){
    const path ="admins/";
    return this.db.list(path).snapshotChanges()
  }

  removeUser(userUid: any){
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }
}
