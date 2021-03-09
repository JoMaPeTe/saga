import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {ChatService} from '../chat.service';
@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
   messages: Observable<Message[]>;
   formValue: string;
  constructor(public chat: ChatService) { }

  ngOnInit() {
    // this.messages = this.chat.conversation.asObservable();
    // .scan((acc,val)=> acc.concat(val));

  }

}
