import { Component,  OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FirestorageService } from '../core/firestorage.service';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(public auth: AuthService,
              public firestorage : FirestorageService) { }

  ngOnInit(): void {
  }


}
