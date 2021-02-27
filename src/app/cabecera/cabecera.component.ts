import { Component,  OnInit, ɵɵresolveBody } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { FirestorageService } from '../core/firestorage.service';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  darkForm: FormGroup;
  constructor(public auth: AuthService,
              public firestorage : FirestorageService,
              private fb: FormBuilder,) { }

  ngOnInit(): void {
  this.createSwitch();
  this.darkLight();
  }
createSwitch(){
this.darkForm = this.fb.group({switch:false});

}
darkLight(){
  const body=document.getElementById('body');

  this.darkForm.get('switch').valueChanges.subscribe((value)=> {
    if(value){
      body.setAttribute("class","bg-dark text-white")
    }else{
      body.setAttribute("class","bg-img")
    }

  }
  )




}

}
