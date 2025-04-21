import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="p-4">
      <div class="text-4xl font-bold pt-4 pb-4">Register</div>
      <div class="flex flex-col w-80">
        <div>
          <legend class="fieldset-legend">Prenom</legend>
          <label class="input">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="text" [(ngModel)]="prenom" name="prenom" placeholder="Surname" class="grow" />
          </label>
        </div>
        <div>
          <legend class="fieldset-legend">Nom</legend>
          <label class="input">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="text" [(ngModel)]="nom" name="nom" placeholder="Name" class="grow" />
          </label>
        </div>
        <div>
        <legend class="fieldset-legend">Mail</legend>
          <label class="input validator">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
            <input type="email" [(ngModel)]="mail" name="mail" placeholder="mail@site.com" required/>
          </label>
          <div class="validator-hint hidden">Enter valid email address</div>
        </div>
        <div>
          <legend class="fieldset-legend">Password</legend>
          <label class="input validator">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="password" [(ngModel)]="pwd" name="pwd" required placeholder="Password"   />
          </label>
          <p class="validator-hint hidden">
            Must be more than 8 characters, including
            <br/>At least one number
            <br/>At least one lowercase letter
            <br/>At least one uppercase letter
          </p>
        </div>
        <div>
          <legend class="fieldset-legend">Repeat Password</legend>
          <label class="input">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="password" [(ngModel)]="pwdConfirm" (keyup)="checkPasswordsMatch()" name="pwd-confirm" id="pwd-confirm" required placeholder="Password"  />
          </label>
          <p id="pdw-not-match" class="validator-hint text-error hidden">
            Passwords must match
          </p>
        </div>
        <div>
          <legend class="fieldset-legend">Choose your role</legend>
          <label><input type="radio" [(ngModel)]="role" name="role" value="ROLE_USER" class="radio radio-sm" required> 
              Etudiant</label>
              <br>
            <label><input type="radio" [(ngModel)]="role" name="role" value="ROLE_INTERVENANT" class="radio radio-sm" required> 
              Intervenant</label>
              <br >
            <label ><input type="radio" [(ngModel)]="role" name="role" value="ROLE_ADMIN" class="radio radio-sm" required> 
              Admin</label>
        </div>
        <div class="divider"></div>
        <button type="submit" class="btn btn-primary">Register</button>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p *ngIf="successMessage" class="error-message">{{ successMessage }}</p>
      </div>
</form>
  `,
  styles: ``
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  mail: string = '';
  pwd: string = '';
  pwdConfirm: string = '';
  passwordsMatch: boolean = true;
  role: string = '';
  roles: string[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    //console.log('Submtting form...');
    if (!this.passwordsMatch) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.roles = [this.role];
    this.userService.addUser(this.nom, this.prenom, this.mail, this.pwd, this.roles).subscribe(
      (response) => {
        this.successMessage = 'User ' + this.mail + ' added successfully!';
        //console.log('User added successfully:', response);
      },
      (error) => {
        this.errorMessage = 'Error adding user';
        //console.log('Error adding user:', error);
      }
    )
  }

  checkPasswordsMatch(): void {
    if(this.passwordsMatch = this.pwd === this.pwdConfirm) {
      const errorMessage = document.getElementById('pdw-not-match') as HTMLParagraphElement;
      const pwdConfirmInput = document.getElementById('pwd-confirm') as HTMLInputElement;
      if (errorMessage) {
        pwdConfirmInput.classList.remove('input-error');
        errorMessage.classList.add('hidden');
      }
    } else {
      const errorMessage = document.getElementById('pdw-not-match') as HTMLParagraphElement;
      const pwdConfirmInput = document.getElementById('pwd-confirm') as HTMLInputElement;
      if (errorMessage) {
        errorMessage.classList.remove('hidden');
        pwdConfirmInput.classList.add('input-error');
      }
    }
  }
}
