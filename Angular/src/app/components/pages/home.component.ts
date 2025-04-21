import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div
      class="hero min-w-screen min-h-screen"
      style="background-image: url(iut.jpg);">
      <div class="hero-overlay"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-lg flex flex-col gap-4">
          <h1 class="mb-5 text-5xl font-bold">Welcome to MMI Hub</h1>
          <div class="text-xl">
            Webapplication for MMI students to manage their events.<br>
            Login to your account or create a new one to get started.
          </div>
          <button (click)="goToRoute('/register/')" class="btn btn-primary">Register</button>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
