import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';
import { AuthService } from '../core/auth.service';
import { BehaviorSubject } from 'rxjs';

export class Message{
  constructor(public content:string, public sentBy: string){}
}
@Injectable()
export class ChatService {
  projectId = 'saga-1f81f';

  //Setup Credentials
  credentialObject =  environment.dialogflow;
  client = new ApiAiClient (this.credentialObject);
conversation = new BehaviorSubject<Message[]>([]);

  constructor(private auth: AuthService){  }

//Adds message to source
  update(msg:Message){
  this.conversation.next([msg]);
}
//Sends and receives messages via Dialogflow
converse(msg:string){
  const userMessage= new Message(msg, 'user');
  this.update(userMessage);
  return this.client.textRequest(msg)
  .then(res => {
    const speech =res.result.fulfillment.speech;
    const botMessage = new Message(speech, 'bot');
    this.update(botMessage);
  })
}
async getToken(){
 return await this.auth.afAuth.idToken;
}
   talk() {
    // A unique identifier for the given session
    const sessionId = Math.random().toString(36).slice(-5);
   const token= this.getToken();

     this.client.setSessionId(sessionId);
    this.client.textRequest('Quiero reservar')
    .then(res=> console.log(res))
  }
}
