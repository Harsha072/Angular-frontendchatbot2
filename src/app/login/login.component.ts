import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService} from '../service';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
 
  public isAuthenticated$!: Observable<boolean>;

  constructor(private router:Router, private _oktaStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth){

  }

  ngOnInit(): void {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    console.log( this.isAuthenticated$)
  }
  public async signIn(): Promise<void> {
    console.log("click sign in::::")
    await this._oktaAuth.signInWithRedirect().then(
      
    );
    console.log( this.isAuthenticated$)
    
  }
  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }

}
