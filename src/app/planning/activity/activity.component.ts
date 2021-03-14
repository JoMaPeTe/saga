import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { FireDBService } from 'src/app/core/fire-db.service';
import { Activity } from 'src/app/models/activity.model';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
})
export class ActivityComponent implements OnInit {
  planningForm: FormGroup;
  darkSubscription: Subscription;
  constructor(
    public auth: AuthService,
    public db: FireDBService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.darkForm();
  }
  //Método para que si se toca el switch de modo oscuro, cambie el fondo del formulario
  darkForm() {
    this.darkSubscription = this.auth
      .getSwitch()
      .get('switch')
      .valueChanges.subscribe((value) => {
        const formCard = document.getElementById('formCard');
        if (value && formCard) {
          formCard.setAttribute('class', 'card bg-dark  text-white');
        } else {
          formCard.setAttribute('class', 'card text-dark bg-info');
        }
      });
  }

  /**
   *  Métodos para obtener validadores
   *  Devuelven boolean
   */
  get activityTypeNoValid() {
    return (
      this.planningForm.get('activityType').invalid &&
      this.planningForm.get('activityType').touched
    );
  }
  get activityDayNoValid() {
    return (
      this.planningForm.get('activityDay').invalid &&
      this.planningForm.get('activityDay').touched
    );
  }

  get activityHourNoValid() {
    return (
      this.planningForm.get('activityHour').invalid &&
      this.planningForm.get('activityHour').touched
    );
  }
  //Metodos crear y resetear formulario
  createForm() {
    this.planningForm = this.fb.group({
      activityType: ['tenis', Validators.required], //Valor por defecto tenis al crearse
      activityDay: ['', Validators.required],
      activityHour: ['', Validators.required],
    });
  }

  resetForm() {
      if (this.planningForm != null) {
   this.planningForm.reset({
    activityType: 'tenis'});
   //this.createForm();
 }
}
  /**
   * Actualizamos la Base de datos con nueva actividad a partir del formulario
   */
  updateActivities() {
    if (this.planningForm.invalid) {
      Object.values(this.planningForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.planningForm.value.activityHour.forEach((hour) => {
        const activity = new Activity();
        activity.type = this.planningForm.value.activityType;
        activity.day = this.planningForm.value.activityDay;
        activity.hour = hour;
        //  console.log("activity al hacer update en form, ver $key:  "+JSON.stringify(activity));
        this.db.createActivity(activity);
        this.toastr.success('Success', 'Activity successfully added');
      });
    }
  }
}
