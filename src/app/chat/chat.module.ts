import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ChatDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.dialogflow),
    HttpClientModule
  ],
  providers: [ChatService],
  exports:[ChatDialogComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule { }
