import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { FireDBService } from 'src/app/core/fire-db.service';
//Activity class
import { Activity } from '../../models/activity.model';
@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
})
export class ActivityListComponent implements OnInit, OnDestroy {
  planning = [];
  activities: Activity[] = [];
  planningSubscription: Subscription;

  constructor(
    public auth: AuthService,
    public db: FireDBService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fillPlanning();
  }
  ngOnDestroy() {
    this.planningSubscription.unsubscribe();
  }

  removeActivity(activity: Activity) {
    if (confirm('Are you sure you want to delete')) {
      this.db.removeActivity(activity);
      this.toastr.success('Success', 'Activity deleted');
    }
  }

  updateActivity(activity: Activity) {
    const esLibre =this.activities.find((item)=>item == activity);
    console.log(esLibre.value)
    if (esLibre.value!="libre") {
      if (confirm('Are you sure you want to release this activity?')) {
        this.db.updateActivity(activity, 'libre');
        this.toastr.success('Success', 'Activity released');
      }else{ this.toastr.info('OK', 'Take your time'); }
    }else{
      this.toastr.info('Really Jorge??', 'That activity was already released');
    }
  }

  fillPlanning() {
    //obtenemos valores de la BD en forma de objeto JSON
    this.planningSubscription = this.db.getActivities().subscribe((snap) => {
      this.planning.length = 0;
      this.activities.length = 0;
      snap.forEach((u) => {
        const plan: any = u.payload.toJSON();
        plan.key = u.key; //tenis o padel
        this.planning.push(plan);
      });
      //Fin snap forEach
      console.log('planning ' + JSON.stringify(this.planning));
      //Reordenamos
      for (const x in this.planning) {
        // x es 0,1, según se grabe puede corresponder a tenis o a pádel
        console.log('x' + JSON.stringify(x));

        for (const element in this.planning[x]) {
          console.log('element ' + JSON.stringify(element)); //element corresponde añ dia o a key(tenis o padel)
          let activityType: string; //se declara aqui para poder llamarla fuera del if
          let activityDay: string;
          activityType = this.planning[x].key;
          console.log('tipoActividad ' + activityType);
          if (element != 'key') {
            activityDay = element;
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
    }); //Fin subscribe
  }
}
