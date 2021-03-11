import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root',
})
export class FireDBService {
  constructor(private db: AngularFireDatabase) {}

  //Login
  updateUserData(user: any) {
    console.log('user: ', user);
    const path = 'users/' + user.uid;
    const u = {
      email: user.email,
    };
    this.db
      .object(path)
      .update(u)
      .catch((error) => console.log(error));
  }

  //Admin functions (users CRUD)
  getUsers() {
    const path = 'users/';
    //return this.db.list(path).valueChanges();
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid: any) {
    const path = 'users/' + userUid;
    return this.db.object(path).remove();
  }

  makeAdmin(user: any) {
    const path = 'admins/' + user.key;
    const u = {
      email: user.email,
    };
    this.db
      .object(path)
      .update(u)
      .catch((error) => console.log(error));
  }
  removeAdmin(userUid: any) {
    const path = 'admins/' + userUid;
    return this.db.object(path).remove();
  }

  //User Settings
  updateUserImageURL(url: any, user) {
    const path = 'users/' + user.uid;
    const u = {
      image: url,
    };
    this.db
      .object(path)
      .update(u)
      .catch((error) => console.log(error));
  }
  getUserImage(user) {
    const path = 'users/' + user.uid + '/image';
    console.log(path);
    return this.db.object(path).snapshotChanges();
  }

  // Admins list (CanActive access)
  getAdmins() {
    const path = 'admins/';
    return this.db.list(path).snapshotChanges();
  }

  //User Reservation CRUD
  getUserReservation(userId) {
    const path = `users/${userId}/Reserva/`;
    return this.db.object(path).snapshotChanges();
  }
  removeReservation(userId: any) {
    const path = `users/${userId}/Reserva/`;
    return this.db.object(path).remove();
  }

  //Planned Activities CRUD
  createActivity(activity: Activity) {
    const path = `actividad/${activity.type}/${activity.day}/`;
    const text = `{"${activity.hour}":"true"}`;
    const obj = JSON.parse(text);

    this.db
      .object(path)
      .update(obj)
      .catch((error) => console.log(error));
  }
  getActivities() {
    const path = 'actividad/';
    //return this.db.list(path).valueChanges();
    return this.db.list(path).snapshotChanges();
  }
  removeActivity(activity: Activity) {
    const path = `actividad/${activity.type}/${activity.day}/${activity.hour}`;
    return this.db.object(path).remove();
  }
}
