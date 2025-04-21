import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { UserData } from './interfaces/user-data';
import { Subscription } from 'rxjs';
import { LoginSmallComponent } from './components/elements/login-small.component';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, RouterModule, LoginSmallComponent ],
  templateUrl: './app.component.html',
  styles: ``
})
export class AppComponent {
  user: UserData | null = null;
  private userSubscription: Subscription | null = null;

  constructor(public authService: AuthService)  {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getInitials(): string {
    if(this.authService.isLoggedIn() && this.user){
      return this.user.prenom.charAt(0).toUpperCase() + this.user.nom.charAt(0).toUpperCase();
    }
    return '';
  }

  getUserName(): string {
    if(this.authService.isLoggedIn() && this.user){
      return this.user.prenom + ' ' + this.user.nom.toUpperCase();
    }
    return '';
  }
}
