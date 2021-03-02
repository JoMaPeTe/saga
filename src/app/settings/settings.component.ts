import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireDBService } from '../core/fire-db.service';
import { FirestorageService } from '../core/firestorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private route:Router,
    public firestorage : FirestorageService,
    private db: FireDBService) { }

  ngOnInit(): void {
  }
  goHome(){
    this.route.navigate(['/']);
  }


}
