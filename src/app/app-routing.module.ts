import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { EventosComponent } from './eventos/eventos.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { TiendaComponent } from './tienda/tienda.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'eventos',component:EventosComponent},
  {path:'users',component:UserComponent},
  {path:'settings',component:SettingsComponent},
  {path:'chatbot',component:ChatbotComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
