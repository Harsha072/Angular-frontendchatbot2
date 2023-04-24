import { Component, Inject, OnInit,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { filter, map, Observable} from 'rxjs';
import { DataService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'chatbot';
  public isAuthenticated$!: Observable<boolean>;
  timestamp: any

  
  constructor(private _router: Router, private _oktaStateService: OktaAuthStateService, 
     @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,private dataService:DataService) {
      console.log("constructore in app component:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::") 
      console.log("in constructore::: ",localStorage.getItem('userDetailsStored'))
      if(localStorage.getItem('userDetailsStored')){
        localStorage.clear()
      }
     
    }

   

  public ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );

    // setInterval(() => {
    //   this.dataService.userInfo().subscribe(
    //     res => console.log('Session is still active'),
    //     err => { 
    //       this.signOut()
    //     }
    //   );
    // }, 180000); // Check session expiry every 5 minutes
  }
  

  
  
 
  public async signIn() : Promise<void> {
    console.log("click sign in::::")
    await this._oktaAuth.signInWithRedirect().then(() => {
     
    }
    )
  
  }

  public async signOut(): Promise<void> {
    console.log("clicking sign out::::::")
  const timestamp =localStorage.getItem('userDetailsStored');
  const loginTime = new Date(timestamp ?? 0);
  console.log("login time::: ",loginTime)
    const logoutTime = new Date();
    
    const sessionDuration = (logoutTime.getTime() - loginTime.getTime()) / 1000;
    console.log(`Session duration: ${sessionDuration/60} minutes`);
    this._oktaAuth.getUser().then((user)=>{
      const userInfo ={
         username:user.name,
         email:user.email,
         loginTime:sessionStorage.getItem('userDetailsStored') ,
         totalLogin:1,
         sessionDuration: `${sessionDuration/60} minutes`
      }
     
   this.dataService.logout(userInfo).subscribe(async (res) => {
    console.log("after sign out",res)
    if(res?.Attributes) { 
     
      localStorage.clear()
      // check if response is not null or undefined
      await this._oktaAuth.signOut();
    }
      },
      (error) => {
        console.log(error);
        
      })
    })
    
  }
}