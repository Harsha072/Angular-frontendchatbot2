import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostQuizComponent } from './post-quiz/post-quiz.component';

import { PreQuizComponent } from './pre-quiz/pre-quiz.component'; 



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent , canActivate:[OktaAuthGuard]},
  { path: 'prequiz', component: PreQuizComponent, canActivate:[OktaAuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate:[OktaAuthGuard] },
  { path: 'postquiz', component: PostQuizComponent, canActivate:[OktaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
 
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }