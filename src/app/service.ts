import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

export class Message{
  constructor(public requestText:String){}
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageIntro = new BehaviorSubject<Array<any>>([]);
  private messages = new BehaviorSubject<Array<any>>([]);
  introMessage = this.messageIntro.asObservable();
  currentMessages = this.messages.asObservable();
  message:any={}
  constructor(private http: HttpClient) { }

  addMessage(message: any) {
    this.messages.next([...this.messages.getValue(), message]);
  }

  sendMessage(data: string) {
    this.message = new Message(data)
    this.http.post<BotMessage>('http://localhost:3000/api/requestText/', this.message)
      .subscribe(response => {
        // this.addMessage({ sender: 'Chatbot', text: response.botResponse });
        console.log(response.responseMessage)
        // this.addMessage({ "sender": 'Chatbot', "text": response.responseMessage});
        this.messageIntro.next([...this.messageIntro.getValue(),{"sender":'Chatbot',"text":response.responseMessage}])
      }, error => {
        console.log(error);
      });
  }
  sendUserMessage(data: string) {
    this.addMessage({ sender: 'User', text: data });
    this.message = new Message(data)
    this.http.post<BotMessage>('http://localhost:3000/api/requestText/', this.message)
      .subscribe(response => {
        console.log(response.responseMessage)
        this.addMessage({ sender: 'Chatbot', text: response.responseMessage});
      }, error => {
        console.log(error);
      });
  }
}
export interface BotMessage{
  "id":string,
  "responseMessage":string,
  "originalQuery":string
}