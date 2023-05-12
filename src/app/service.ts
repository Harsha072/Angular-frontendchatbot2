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
        console.log(response.responseMessage)
        console.log(response.url)
        // this.addMessage({ sender: 'Chatbot', text: response.responseMessage });
        if (response.url) {
          console.log("in url::: ",response.url)
          this.addMessage({ sender: 'Chatbot', text: response.responseMessage,isGif: response.url });
          // this.addMessage({ sender: 'Chatbot', text: response.url, isGif: true });
        } else {
          this.addMessage({ sender: 'Chatbot', text: response.responseMessage,status:response.status });
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
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
    
  }
  // login(user: any): Observable<any> {
  //   console.log("calling login new",user)
  //   return this.http.post<any>(`http://localhost:8080/api/login`, user)
    
  // }
  logout(user: any): Observable<any> {
    console.log("calling logout chaheged ")
    return this.http.post<any>(`${environment.apiUrl}/logout`, user)

  }
  userInfo():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/userinfo`,{ withCredentials: true })
  }
  
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