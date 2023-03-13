import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { PreQuizComponent } from './pre-quiz/pre-quiz.component'; 
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chat', component: ChatComponent , canActivate:[OktaAuthGuard]},
  { path: 'prequiz', component: PreQuizComponent, canActivate:[OktaAuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'register', component: RegisterComponent },
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }