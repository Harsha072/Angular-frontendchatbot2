import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Message {
  constructor(public requestText: String) { }
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageIntro = new BehaviorSubject<Array<any>>([]);
  private messages = new BehaviorSubject<Array<any>>([]);
  introMessage = this.messageIntro.asObservable();
  currentMessages = this.messages.asObservable();
  message: any = {}
  constructor(private http: HttpClient) { }
  addMessage(message: any) {
    this.messages.next([...this.messages.getValue(), message]);
  }
  sendMessage(data: any) {

    console.log(data)
    this.message = new Message(data.message)
    this.message.name = data.name
    console.log("this::: ", this.message)
    this.http.post<BotMessage>(`${environment.apiUrl}/requestText/`, this.message)

      .subscribe(response => {

        console.log(response.responseMessage)

        this.messageIntro.next([...this.messageIntro.getValue(), { "sender": 'Chatbot', "text": response.responseMessage }])
      }, error => {
        console.log(error);
      });
  }
  sendUserMessage(data: string) {
    this.addMessage({ sender: 'User', text: data });
    this.message = new Message(data)
    console.log("this.message ", this.message)
    this.http.post<BotMessage>(`${environment.apiUrl}/requestText/`, this.message)
      .subscribe(response => {
        console.log(response);
        console.log(response.responseMessage.length)
        console.log(response.url)
        // this.addMessage({ sender: 'Chatbot', text: response.responseMessage });
        if (response.url) {
          console.log("in url::: ",response.url)
          let message = response.responseMessage;
          console.log("the messagev  ", response.responseMessage);
          if (message.length > 50) {
            console.log("the message ",message)
            const sentences = message.match(/[^\.!\?]+[\.!\?]+/g);
            console.log("the sentence ",sentences)
            if (sentences) {
              sentences.forEach((sentence) => {
                this.addMessage({ sender: 'Chatbot', text: sentence, status: response.status });
              });
            } else {
              this.addMessage({ sender: 'Chatbot', text: message, status: response.status });
            }
          } else {
            this.addMessage({ sender: 'Chatbot', text: message, status: response.status });
          }
          // this.addMessage({ sender: 'Chatbot', text: response.responseMessage,isGif: response.url });
          // this.addMessage({ sender: 'Chatbot', text: response.url, isGif: true });
        } else {
          // this.addMessage({ sender: 'Chatbot', text: response.responseMessage,status:response.status });
          let message = response.responseMessage;
          if (message.length > 50) {
            const sentences = message.match(/[^\.!\?]+[\.!\?]+/g);
            if (sentences) {
              sentences.forEach((sentence) => {
                this.addMessage({ sender: 'Chatbot', text: sentence, status: response.status });
              });
            } else {
              this.addMessage({ sender: 'Chatbot', text: message, status: response.status });
            }
          } else {
            this.addMessage({ sender: 'Chatbot', text: message, status: response.status });
          }
        }
      

      }, error => {
        console.log(error);
      });
  }

  createUser(user: any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/create`, user)

  }
  login(user: any): Observable<any> {
    console.log("calling login new harsha check login",user,environment.apiUrl )
    return this.http.post<any>(`${environment.apiUrl}/login`, user,{ withCredentials: true })
    
  }

  logout(user: any): Observable<any> {
    console.log("calling logout chaheged new ",environment.apiUrl)
    return this.http.post<any>(`${environment.apiUrl}/logout`, user,{ withCredentials: true })

  }
  
  userInfo():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/userinfo`,{ withCredentials: true })
  }
  // startQuiz(questionIndex: number): Observable<any> {
  //   console.log("start quiz", questionIndex);
  //   return this.http.get<any>(`http://localhost:8080/api/quiz-question/${questionIndex}`);
  // }
  startQuiz(questionIndex: number): Observable<any> {
    console.log("start quiz", questionIndex);
    return this.http.get<any>(`${environment.apiUrl}/quiz-question/${questionIndex}`);
  }

  getQuizLength(): Observable<any> {
    console.log("get quiz length");
    return this.http.get<any>(`${environment.apiUrl}/quiz-question`);
  }
prequizScore(score:any):Observable<any>
{
  return this.http.post<any>(`${environment.apiUrl}/prequiz`,score);
} 
postquizScore(score:any):Observable<any>
{
  return this.http.post<any>(`${environment.apiUrl}/postquiz`,score);
} 
}
export interface BotMessage {
  "id": string,
  "responseMessage": string,
  "originalQuery": string,
  "intent": string,
  "url":string,
  "status":string
}
export interface Quiz {
  "question": string,
  "options": string[],
  "correctAnswer": string
}