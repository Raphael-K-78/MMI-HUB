import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { EventCardComponent } from '../elements/event-card.component';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data';
import { InscriptionService } from '../../services/inscription.service';
import { CommentData } from '../../interfaces/comment-data';
import { UserService } from '../../services/user.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin, map } from 'rxjs';
import { EventDialogComponent } from "../elements/event-dialog.component";

export interface AllEventData {
  eventData: EventData;
  isRegistered: boolean;
}

@Component({
  selector: 'app-events',
  imports: [CommonModule, EventCardComponent, FormsModule, EventDialogComponent],
  template: `
    <div class="p-4">
      <div class="text-4xl font-bold pt-4 pb-4">Events</div>
      <div class="flex items-center gap-4 pb-4">
        <label class="input input-lg w-150">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" [(ngModel)]="searchQuery" required placeholder="Search events" />
        </label>
        <button class="btn btn-info" (click)="openModal('add-event-modal')">Add new event</button>
        <app-event-dialog
          [dialogId]="'add-event-modal'"
          [mode]="'add'"
        >
        </app-event-dialog>
      </div>
      <!-- Filters -->
      <!--<div class="flex items-center gap-4 pb-4">
        <div class="text-lg font-bold">Filters:</div>
        <form class="filter">
          <input class="btn btn-square" type="reset" value="×"/>
          <input class="btn" type="radio" name="frameworks" aria-label="You're signed up for"/>
          <input class="btn" type="radio" name="frameworks" aria-label="Created by you"/>
        </form>
      </div>-->
      <!-- Skeleton Loader -->
      <div id="events-skeleton" class="flex">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 w-full">
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
          <div class="skeleton h-80 w-60"></div>
        </div>
      </div>
      <!-- Events List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
        @if (searchQuery.length > 0) {
          <app-event-card
            *ngFor="let event of filteredEvents"
            [eventData]="event.eventData"
            [isRegistered]="event.isRegistered"
            [layout]="'vertical'"
            [action]="'register'"
            (registerToEvent)="addInscription($event)"
          >
          </app-event-card>
        }
        @else {
          <app-event-card
            *ngFor="let event of events"
            [eventData]="event.eventData"
            [isRegistered]="event.isRegistered"
            [layout]="'vertical'"
            [action]="'register'"
            (registerToEvent)="addInscription($event)"
            (eventWasDeleted)="deleteEventLocally(event.eventData.id_event)"
          >
          </app-event-card>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class EventsComponent {
  events: AllEventData[] = [];
  searchQuery: string = '';

  eventService: EventService = inject(EventService);
  insService: InscriptionService = inject(InscriptionService);
  userService: UserService = inject(UserService);
  comService: CommentService = inject(CommentService);
  authService: AuthService = inject(AuthService);

  constructor() {
    this.loadAllEventData();
  }

  // best I can for now until backend is ready
  loadAllEventData(): void {
    const currentUser = this.authService.getUser();
  
    if (!currentUser) {
      console.error('User not logged in');
      this.disableSkeleton();
      return;
    }
  
    this.eventService.getAllEvents().subscribe((events: EventData[]) => {
      // Create parallel API calls for comments and registrations for each event
      const eventDataRequests = events.map((event) => {
        const registrationsRequest = this.insService.getUserEventInscription(event.id_event, currentUser.id);
  
        // Combine the results for each event
        return forkJoin({
          registrations: registrationsRequest,
        }).pipe(
          // Map the results to AllEventData
          map(({ registrations }) => ({
            eventData: event,
            isRegistered: registrations.length > 0,
          } as AllEventData))
        );
      });
  
      // Execute all requests in parallel
      forkJoin(eventDataRequests).subscribe((allEventData: AllEventData[]) => {
        this.events = allEventData;
        this.disableSkeleton();
      });
    });
  }

  disableSkeleton(): void {
    const eventsSkeleton = document.getElementById('events-skeleton');
    if (eventsSkeleton) {
      eventsSkeleton.style.display = 'none'; // Hide the skeleton loader
    }
  }

  get filteredEvents(): AllEventData[] {
    return this.events.filter((event) => {
      return (
        event.eventData.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventData.content.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventData.lieu.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventData.ville.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventData.creator.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.eventData.creator.nom.toLowerCase().includes(this.searchQuery.toLowerCase())  
      );
    });
  }

  addInscription(eventId: number): void {
    this.insService.addInscription(eventId).subscribe(
      (response) => {
        // Update the local cache
        const event = this.events.find((e) => e.eventData.id_event === eventId);
        if (event) {
          event.isRegistered = true; // Update the isRegistered property
        }
      },
      (error) => {
        console.error('Error adding inscription', error);
      }
    );
  }

  deleteEventLocally(eventId: number): void {
    // Remove the event from the cached list
    this.events = this.events.filter((event) => event.eventData.id_event !== eventId);
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    } else {
      console.error(`Modal with id "${modalId}" not found.`);
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(`${modalId}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }
}
