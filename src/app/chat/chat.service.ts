import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { ApiAiClient} from 'api-ai-javascript/es6/ApiAiClient';
import { AuthService } from '../core/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  projectId = 'saga-1f81f';

  //Setup Credentials
  credentialObject =  environment.dialogflow;
  client = new ApiAiClient (this.credentialObject);


  constructor(private auth: AuthService){  }

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
