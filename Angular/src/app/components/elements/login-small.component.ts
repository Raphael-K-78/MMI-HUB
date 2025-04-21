import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-small',
  imports: [ CommonModule, FormsModule, RouterModule ],
  template: `
    <form (ngSubmit)="onLogin()" class="flex flex-col align-items-left justify-center gap-2 pr-1">
            <div class="text-xl font-bold">Log In</div>
            <div>
              <label class="input validator">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                <input [(ngModel)]="mail" name="mail" type="email" placeholder="mail@site.com" required/>
              </label>
              <div class="validator-hint hidden">Enter valid email address</div>
            </div>
            <div>
              <label class="input validator">
                <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                <input id="pwd" [(ngModel)]="pwd" name="pwd" type="password" required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
              </label>
              <!--<p class="validator-hint hidden">
                Must be more than 8 characters, including
                <br/>At least one number
                <br/>At least one lowercase letter
                <br/>At least one uppercase letter
              </p>-->
            </div>
            <button type="submit" class="btn btn-primary btn-md">Login</button>
            <p *ngIf="message" class="error-message">{{ message }}</p>
            <div class="text-sm text-center">Don't have an account? <a class="link link-accent" [routerLink]="['/register']">Sign up</a></div>
  </form>
  `,
  styles: ``
})
export class LoginSmallComponent {
  mail: string = '';
  pwd: string = '';
  message: string = '';

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.mail, this.pwd).subscribe(
      (response) => {
        this.authService.saveUser(response.user);
        this.message = 'Login success';
        //this.router.navigate(['/']);
      },
      (error) => {
        this.message = 'Login failed';
        // Should als o inform user with an animation or something on the login screen
      }
    );
  }
}
