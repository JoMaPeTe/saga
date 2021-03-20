import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { FireDBService } from '../core/fire-db.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  users : any = [];
  userSubscription: Subscription;

  constructor(public db: FireDBService,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.fillUsers();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

 

  fillUsers(){
    this.userSubscription = this.db.getUsers().subscribe( snap => {
      this.users = [];
      snap.forEach ( u => {

        const user: any = u.payload.val();
        user.key = u.key;

        this.users.push(user);
        console.log(u);
      })
    console.log('users: ', this.users);
    })
  }
}
