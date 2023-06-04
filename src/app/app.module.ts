import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { DataService } from './service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { PreQuizComponent } from './pre-quiz/pre-quiz.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component'
import { ReactiveFormsModule } from '@angular/forms';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { PostQuizComponent } from './post-quiz/post-quiz.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NavigateToChatComponent } from './navigate-to-chat/navigate-to-chat.component';
import { PostfeedbackComponent } from './postfeedback/postfeedback.component';
import { ThankyouComponent } from './thankyou/thankyou.component';


const oktaAuth = new OktaAuth({
  issuer: 'https://dev-21147924.okta.com/oauth2/default',
  clientId: '0oa9tocdy5Ifu88aA5d7',
  redirectUri: window.location.origin+'/login/callback'
});

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    PreQuizComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    PostQuizComponent,
    FeedbackComponent,
    NavigateToChatComponent,
    PostfeedbackComponent,
    ThankyouComponent,
 
  
  
  
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
   

    
   
  ],
  providers: [DataService,{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
