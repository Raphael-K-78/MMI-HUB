import { Component, inject } from '@angular/core';
import { EventCardComponent } from '../elements/event-card.component';
import { EventService } from '../../services/event.service';
import { EventData } from '../../interfaces/event-data';
import { InscriptionService } from '../../services/inscription.service';
import { AuthService } from '../../services/auth.service';
import { InscriptionData } from '../../interfaces/inscription-data';
import { forkJoin } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { CommentData } from '../../interfaces/comment-data';
import { CommentComponent } from "../elements/comment.component";

@Component({
  selector: 'app-dashboard',
  imports: [EventCardComponent, CommentComponent],
  template: `
    <div class="p-4">
      
      @if(isAdmin()){<div class="text-4xl font-bold pt-4 pb-4">Dashboard - Admin</div>}
      @else{<div class="text-4xl font-bold pt-4 pb-4">Dashboard</div>}
      <div class="text-2xl font-bold pt-4 pb-4">Statistics</div>
      <div>
        <div class="stats stats-vertical lg:stats-horizontal shadow">
          <!--<div class="stat">
            <div class="stat-figure text-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"></path><path d="M11 10h2v5h-2zm0 6h2v2h-2z"></path></svg></div>
            <div class="stat-title">Your inscriptions</div>
            <div class="stat-value">2</div>
          </div>-->

          <div class="stat">
          <div class="stat-figure text-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"></path><path d="m11 17.414 5.707-5.707-1.414-1.414L11 14.586l-2.293-2.293-1.414 1.414z"></path></svg></div>
            @if(isAdmin()){<div class="stat-title">All events</div>}
            @else{<div class="stat-title">Your events</div>}
            <div class="stat-value">{{events.length}}</div>
          </div>

          <div class="stat">
          <div class="stat-figure text-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: currentColor;"><path d="M7 7h10v2H7zm0 4h7v2H7z"></path><path d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"></path></svg></div>
            @if(isAdmin()){<div class="stat-title">All comments</div>}
            @else{<div class="stat-title">Your comments</div>}
            <div class="stat-value">{{allComments.length}}</div>
          </div>
        </div>
      </div>
      <div class="text-2xl font-bold pt-4 pb-4">Your events</div>
      <div class="flex justify-center">
        <span id="events-loading-spinner" class="loading loading-spinner loading-xl"></span>
      </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        @for(event of events; track event.id_event) { 
          <app-event-card
            [eventData]="event"
            [layout]="'horizontal'"
            [action]="'cancel'"
            (cancelEventRegistration)="removeEvent($event)"
            (refetchComments)="fetchAllUserComments()"
          >
          </app-event-card>
        }
      </div>

      <div class="text-2xl font-bold pt-4 pb-4">Your comments</div>
      <div class="flex justify-center">
        <span id="comments-loading-spinner" class="loading loading-spinner loading-xl"></span>
      </div>
      <div class="flex flex-col gap-2">
      @if(allComments.length > 0){
        @for(comment of allComments; track comment.id_comment){
        <app-comment 
        [commentData]="comment"
        [isAuthor]="isAdmin()"
        >
        </app-comment>
        }
      }
      
    </div>
    </div>
  `,
  styles: ``
})
export class DashboardComponent {
  events: EventData[] = [];
  allComments: CommentData[] = [];

  eventService: EventService = inject(EventService);
  insService: InscriptionService = inject(InscriptionService);
  authService: AuthService = inject(AuthService);
  commentService: CommentService = inject(CommentService);

  myEventCount: number = 0;
  myCommentCount: number = 0;

  constructor() { }

  ngOnInit(){
    if(this.authService.isIntervenant())
      this.loadUserCreatedEvents();
    else if(this.authService.isAdmin())
      this.loadAllEvents();
    else if(this.authService.isUser())
      this.loadUserRegisteredEvents();
    else
      console.error("User is not logged in or has no role");
  }

  loadUserRegisteredEvents(): void {
    const currentUser = this.authService.getUser();
  
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }
  
    // Fetch all events and user inscriptions in parallel
    forkJoin({
      allEvents: this.eventService.getAllEvents(),
      userInscriptions: this.insService.getAllUserInscriptions(currentUser.id),
    }).subscribe(
      ({ allEvents, userInscriptions }) => {
        // Extract event names from user inscriptions
        const registeredEventNames = userInscriptions.map((inscription) => inscription.event);
        //console.log(registeredEventNames);
  
        // Filter events based on the names in the user's inscriptions
        this.events = allEvents.filter((event) => registeredEventNames.includes(event.nom));
        //console.log(this.events);
        this.disableLoadingspinner('events-loading-spinner');
        // This has to be here, otherwise it doesn't work
        this.fetchAllUserComments();
      },
      (error) => {
        console.error('Error fetching user registered events:', error);
      }
    );
  }

  loadUserCreatedEvents(): void {
    const currentUser = this.authService.getUser();
  
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }
  
    // Fetch all events where the user is the creator
    this.eventService.getAllEvents().subscribe(
      (events: EventData[]) => {
        // Step 1: Filter events created by the current user
        this.events = events.filter((event) => event.creator.id === currentUser.id);
  
        // Step 2: Disable the loading spinner for events
        this.disableLoadingspinner('events-loading-spinner');
  
        // Step 3: Fetch all user comments only after events are filtered
        if (this.events.length > 0) {
          this.fetchAllUserComments();
        } else {
          console.log('No events found for the current user.');
          this.disableLoadingspinner('comments-loading-spinner'); // No comments to fetch
        }
      },
      (error) => {
        console.error('Error fetching user created events:', error);
      }
    );
  }

  loadAllEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventData[]) => {
        // Step 1: Load all events
        this.events = events;
  
        // Step 2: Fetch all comments after events are loaded
        if (this.events.length > 0) {
          this.fetchAllComments();
        } else {
          console.log("No events found.");
          this.disableLoadingspinner('events-loading-spinner');
          this.disableLoadingspinner('comments-loading-spinner');
        }
      },
      (error) => {
        console.error('Error fetching all events:', error);
        this.disableLoadingspinner('events-loading-spinner');
        this.disableLoadingspinner('comments-loading-spinner');
      }
    );
  }

  removeEvent(eventId: number): void {
    // Remove the event from the cached list
    this.events = this.events.filter((event) => event.id_event !== eventId);

    let userId = 0;
    const user = this.authService.getUser();
    if (user) 
      userId = user.id;

    this.insService.getUserEventInscription(eventId, userId).subscribe(
      (inscriptions: InscriptionData[]) => {
        if(inscriptions.length > 0) {
          let inscriptionId = inscriptions[0].id;
          this.insService.deleteInscription(inscriptionId).subscribe(
            (response) => {
              //console.log('Registration deleted successfully:', response);
            },
            (error) => {
              console.error('Error deleting registration:', error);
            }
          );
        }
        else{
          console.error('No inscription found for this event and user: ', eventId, userId);
        }
      }
    );
  }

  fetchAllUserComments(){
    // fetch all comments made by the user
    this.allComments = [];
    const userId = this.authService.getUser()?.id;

    this.events.forEach((event) => {
      this.commentService.getCommentsByEventId(event.id_event).subscribe(
        (coms: CommentData[]) => {
          coms.forEach((newCom) => {
            if(newCom.user.id === userId)
              this.allComments = this.allComments.concat(newCom);
          })
        },
        (error) => {
          console.error("Error fetching comments", error);
        }
      )
    })
    this.disableLoadingspinner('comments-loading-spinner');
  }

  fetchAllComments(): void {
    // Fetch every comment under every event
    this.allComments = [];
    let completedRequests = 0;
  
    if (this.events.length === 0) {
      console.log("No events to fetch comments for.");
      this.disableLoadingspinner('comments-loading-spinner');
      return;
    }
  
    this.events.forEach((event) => {
      this.commentService.getCommentsByEventId(event.id_event).subscribe(
        (coms: CommentData[]) => {
          this.allComments = this.allComments.concat(coms);
          completedRequests++;
  
          // Check if all requests are completed
          if (completedRequests === this.events.length) {
            console.log("All comments fetched.");
            this.disableLoadingspinner('comments-loading-spinner');
          }
        },
        (error) => {
          console.error("Error fetching comments for event:", event.id_event, error);
          completedRequests++;
  
          // Check if all requests are completed even if there are errors
          if (completedRequests === this.events.length) {
            this.disableLoadingspinner('comments-loading-spinner');
          }
        }
      );
    });
  }
  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  disableLoadingspinner(elementId: string): void { 
    const loadingSpinner = document.getElementById(elementId);
    if (loadingSpinner) {
      loadingSpinner.style.display = 'none';
    } 
  }
}
