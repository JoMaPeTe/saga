import { Component, OnInit } from '@angular/core';
import { FireDBService } from '../core/fire-db.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users : any = [];
  constructor(public db: FireDBService) { }

  ngOnInit(): void {
    this.db.getUsers().subscribe( snap => {
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
