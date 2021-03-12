import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';
//Activity class
import { Activity } from '../models/activity.model';
@Component({
  selector: 'planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css'],
})
export class PlanningComponent implements OnInit, OnDestroy {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;
  planning = [];
  activities = [];
  // al recuperar las actividades las iré insertando aquí
  planningForm: FormGroup;
  planningSubscription: Subscription;

  constructor(
    public auth: AuthService,
    public db: FireDBService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.planning = [''];

    this.createForm();
    this.fillPlanning();
  }

  ngOnDestroy() {
    this.planningSubscription.unsubscribe();
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
      Object.keys(this.planningForm.controls).forEach((key) => {
        this.planningForm.controls[key].setErrors(null);
      });
    }
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.planningForm.controls[controlName].hasError(errorName);
  };

  updateActivities() {
    if (this.planningForm.valid) {
      this.planningForm.value.activityHour.forEach((hour) => {
        const activity = new Activity();
        activity.type = this.planningForm.value.activityType;
        activity.day = this.planningForm.value.activityDay;
        activity.hour = hour;
        console.log(activity);
        this.db.createActivity(activity);
      });
    }
  }

  fillPlanning() {
    this.planning = [''];
    //obtenemos valores de la BD en forma de objeto JSON
    this.planningSubscription = this.db.getActivities().subscribe((snap) => {
      snap.forEach((u) => {
        const plan: any = u.payload.val();
        plan.key = u.key;
        this.planning.push(plan);
      }); //Fin snap forEach
      console.log('planning ' + JSON.stringify(this.planning));
      //Reordenamos
      for (const x in this.planning) {
        //x es 0,1, según se grabe puede corresponder a tenis o a pádel
        console.log('x' + JSON.stringify(x));

        for (const element in this.planning[x]) {
          console.log('element ' + JSON.stringify(element));
          let activityType: string; //se declara aqui para poder llamarla fuera del if
          // let activityDay: string;
          activityType = this.planning[x].key;
          console.log('tipoActividad ' + activityType);
          if (element != 'key') {
            const activityDay = element;
            console.log(activityDay);
            for (const activityHour in this.planning[x][activityDay]) {
              const activityValue = this.planning[x][activityDay][activityHour];
              const activity = {
                type: activityType,
                day: activityDay,
                hour: activityHour,
                value: activityValue,
              };
              console.log(activityDay);
              this.activities.push(activity);
            }
          }
        }
      }
      console.log('planning keys ' + Object.keys(this.planning[1]));
    }); //Fin subscribe
  }

  removeActivity(activity) {
    if (confirm('Are you sure you want to delete')) {
      this.db.removeActivity(activity);
      this.toastr.success('Succes', 'Activity deleted');
    }
  }
}
