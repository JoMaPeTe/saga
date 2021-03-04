import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages= <any>[];
  loading = false;
  dialogflowURL = 'https://5a71258e3c44.ngrok.io/gateway'; //'https://YOUR-CLOUDFUNCTION/dialogflowGateway';
  // Random ID to maintain session with server
  sessionId = Math.random().toString(36).slice(-5);
  imageURL:any ;
  darkSubscription: Subscription;

  constructor(private http: HttpClient, public auth: AuthService ) {

  }

  ngOnInit(): void {
    this.darkChat();
    this.auth.afAuth.onAuthStateChanged(()=>{
     this.imageURL= this.auth.getImageURL()})

  //  this.addBotMessage('Human presence detected 🤖. How can I help you? ');
  }
darkChat(){

  this.darkSubscription = this.auth.getSwitch().get('switch').valueChanges.subscribe((value) => {

      const chat = document.getElementById('msg-inbox');

      if(value){
        chat.setAttribute('class', 'bg-dark');
      }else{
        chat.setAttribute('class', 'msg-inbox');
      }

  });


}

  handleUserMessage(event: any) {
    console.log(event);
    const text = event.message;
    this.addUserMessage(text);

    this.loading = true;

    // Make the request
    this.http.post<any>(
      this.dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'es-ES>'
          }
        }
      }
    )
    .subscribe(res => {
      const { fulfillmentText } = res;
      this.addBotMessage(fulfillmentText);
      this.loading = false;
    });
  }

  addUserMessage(text: any) {
    this.messages.push({
      text,
      sender: 'You',
      reply: true,
      date: new Date()
    });
  }

  addBotMessage(text: string) {
    this.messages.push({
      text,
      sender: 'Bot',
      avatar: '../assets/bot.jpg',
      date: new Date()
    });
  }
}
