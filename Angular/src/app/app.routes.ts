import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home.component';
import { DashboardComponent } from './components/pages/dashboard.component';
import { AdminComponent } from './components/pages/admin.component';
import { RegisterComponent } from './components/pages/register.component';
import { EventsComponent } from './components/pages/events.component';
import { AccountComponent } from './components/pages/account.component';
import { AboutComponent } from './components/pages/about.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
