import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Activity } from '../models/activity.model';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FireDBService {
  constructor(
    private db: AngularFireDatabase,
    private fns: AngularFireFunctions,
    private toastr: ToastrService
  ) {}

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
    return this.db.list(path).snapshotChanges();
  }

  removeUser(userUid: any) {
    let removeUser = null;
    if (confirm('Are you sure you want to delete')) {
      const path = 'users/' + userUid;
      removeUser = this.db.object(path).remove();
      this.toastr.success('Success', 'User deleted');
    }
    return removeUser;
  }

  makeAdmin(user: any) {
    //añadimos al user en la base de datos de admins en Real Time
    const path = 'admins/' + user.key;
    const u = {
      email: user.email,
    };
    this.db
      .object(path)
      .update(u)
      .catch((error) => console.log(error));
    //Hacemos la custom claim
    const addAdminRole = this.fns.httpsCallable('addAdminRole');
    addAdminRole({ email: user.email }).subscribe((result) => {
      this.toastr.success('', `${result.message}`);
    });
  }
  removeAdmin(user: any) {
    const path = 'admins/' + user.key;
    this.db.object(path).remove();
    const removeAdminRole = this.fns.httpsCallable('removeAdminRole');
    removeAdminRole({ email: user.email }).subscribe((result) => {
      this.toastr.success('', `${result.message}`);
    });
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
    const pathRes = `users/${userId}/Reserva/`;
    let activityReserved: Activity = new Activity();
    //Primero modificamos la actividad planificada para el usuario y luego la eliminamos de su página reserva
    this.db
      .list(pathRes)
      .snapshotChanges().pipe(take(1))
      .subscribe((item) => {
        item.forEach((element) => {
          let pay = element.payload.val();
          activityReserved[element.key] = pay;
        });

        const message = `cancelada por ${userId}`;
        this.updateActivity(activityReserved, message);
        this.db.object(pathRes).remove();
      });
  }

  // Planned Activities CRUD
  createActivity(activity: Activity) {
    const path = `actividad/${activity.type}/${activity.day}/`;
    const text = `{"${activity.hour}":"libre"}`;
    const obj = JSON.parse(text);

    this.db
      .object(path)
      .update(obj) //Posible adaptación: usar push en vez de update, en una list me permitiría varias horas iguales, tendría que añadirle una key
      .catch((error) => console.log(error));
  }
  getActivities() {
    const path = 'actividad/';
    return this.db.list(path).snapshotChanges();
  }
  removeActivity(activity: Activity) {
    const path = `actividad/${activity.type}/${activity.day}/${activity.hour}`;
    return this.db.object(path).remove();
  }

  updateActivity(activity: Activity, value: string) {
    const path = `actividad/${activity.type}/${activity.day}/`;
    const key = activity.hour;
    const obj = {};
    obj[key] = value;

    this.db
      .object(path)
      .update(obj)
      .catch((error) => console.log(error));
  }
}
