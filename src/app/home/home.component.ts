import { Component, Inject, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable, take } from 'rxjs';
import { AppComponent } from '../app.component';

import { DataService } from '../service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name$!: Observable<string>;
  showError: Boolean = false;
  dateTime: any;


  constructor(private _oktaAuthStateService: OktaAuthStateService,
    private dataService: DataService, private router: Router,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth, private appComponent: AppComponent) {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    this.dateTime = formatter.format(new Date());
    console.log("home :::::::", this.dateTime)
    console.log(new Date().getTime())
    console.log("const ", sessionStorage.getItem('userDetailsStored'))
  }



  public userDetailsStored = false;
  public ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
    
    const loginTime = new Date().getTime();
    const loginDate = new Date(loginTime);
    const loginDateString = loginDate.toLocaleString('en-US');
     

   const userDetailsStored = localStorage.getItem('userDetailsStored');
   console.log("session storeage ",userDetailsStored)
   if (userDetailsStored) {
     // Allow user to access the application if their details are stored
     console.log("User is already logged in.");
     return;
   }
 
   console.log("calling login home componene ");
   this._oktaAuthStateService.authState$.pipe(
     filter(authState => Boolean(authState.isAuthenticated)),
     take(1)
   ).subscribe((authState) => {
     this._oktaAuth.getUser().then((user)=>{
       const userInfo = {
         username: user.name,
         email: user.email,
         loginTime: loginDateString,
         totalLogin: 1,
         sessionDuration: loginDateString
       };
       localStorage.setItem('userDetailsStored', loginDateString)
       this.dataService.login(userInfo).subscribe((res) => {
        console.log("the res ",res)
         console.log(res.loginTime);
         localStorage.setItem('userDetailsStored', res.loginTime);
         console.log(localStorage.getItem('userDetailsStored'))
       },
       (error) => {
         console.log(error); 
       });
     });
 
     this.userDetailsStored = true;
   });
 
    
  }

  
  reset() {
    this.showError = false
  }

}
