import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';
//Activity class
import { Activity } from '../models/activity.model';
@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit {

  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  planning = []; // al recuperar las actividades las iré insertando aquí
  planningForm: FormGroup;


  constructor(
    public auth: AuthService,
    public db: FireDBService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.planningForm = this.fb.group({
      activityType: ['', Validators.required],
      activityDay: ['', Validators.required],
      activityHour: ['', Validators.required],
    });
  }
  resetForm() {
    if (this.planningForm != null) {
      this.planningForm.reset();
      Object.keys(this.planningForm.controls).forEach(key => {
        this.planningForm.controls[key].setErrors(null)
      });
    }
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.planningForm.controls[controlName].hasError(errorName);
  }
  /* Date */
  // formatDate(e) {
  //   var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.planningForm.get('activityDay').setValue(convertDate, {
  //     onlyself: true
  //   })
  // }
  updateActivities() {
    if (this.planningForm.valid){
      this.planningForm.value.activityHour
      .forEach((hour) => {
        const activity = new Activity();
        activity.type = this.planningForm.value.activityType;
        activity.day = this.planningForm.value.activityDay;
        activity.hour = hour;
        console.log(activity);
        this.db.createActivity(activity)
      })}


        // if (error.code === 'auth/wrong-password') {
        //   //alert('Contraseña no válida');
        //   this.toastr.error('Contraseña no válida', 'Error Login');
        // } else if (error.code === 'auth/user-not-found') {
        //   // alert('El usuario no existe');

        //   this.toastr.error('El usuario no existe', 'Error Login');
        // } else if (error.code === 'auth/invalid-email') {
        //   //alert('Formato de email no valido');
        //   this.toastr.error('Formato de email no valido', 'Error Login');
    }

  }
