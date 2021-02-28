import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TiendaComponent } from './tienda/tienda.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventosComponent } from './eventos/eventos.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { AuthService } from './core/auth.service';
import { FireDBService } from './core/fire-db.service';
import { FirestorageService } from './core/firestorage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    TiendaComponent,
    CabeceraComponent,
    RegisterComponent,
    EventosComponent,
    LoginComponent,
    UserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center'
     }), // ToastrModule added
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, FireDBService, FirestorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
