import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';
@Component({
  selector: 'app-reservas-user',
  templateUrl: './reservas-user.component.html',
  styleUrls: ['./reservas-user.component.css'],
})
export class ReservasUserComponent implements OnInit {
  userId = this.auth.userId;
  reserva = {};
  constructor(public db: FireDBService, public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.userId;

    console.log('userID en reservas' + this.auth.userId);

    this.reserva = this.db.getUserReservation(this.userId).pipe(
      map((data) => {
        console.log('DATA: ', data.payload.val());
        let res;
        if (data) {
          res = data.payload.val();
        } else {
          res = null;
        }
        return res;
      })
    );
  }
}
