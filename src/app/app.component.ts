import { Component, NgModule } from '@angular/core';
import { AuthService } from './core/auth.service';
import { FirestorageService } from './core/firestorage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'proyectoFinal';

  constructor (public  auth: AuthService,
    public firestorage : FirestorageService){}

  }