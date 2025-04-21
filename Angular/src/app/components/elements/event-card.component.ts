import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
//import { EventData } from '../../services/event-test.service';
import { CommonModule } from '@angular/common';
import { EventData } from '../../interfaces/event-data';
import { CommentData } from '../../interfaces/comment-data';
import { CommentService } from '../../services/comment.service';
import { CommentComponent } from "./comment.component";
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { EventDialogComponent } from "./event-dialog.component";

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, CommentComponent, FormsModule, EventDialogComponent],
  template: `
    <div
      class="card bg-base-200 shadow-sm"
      [ngClass]="{
        'flex flex-col h-full': layout === 'vertical',
        'flex flex-row': layout === 'horizontal'
      }">
      <figure
        [ngClass]="{
          'relative w-full h-0 pb-[56.25%] overflow-hidden': layout === 'vertical',
          'max-h-40': layout === 'horizontal'
        }">

        <!-- Skeleton Placeholder -->
        <div
          *ngIf="isImageLoading"
          [ngClass]="{
            'skeleton bg-base-300 h-full w-full absolute inset-0': layout === 'vertical',
            'skeleton bg-base-300 h-40 w-40': layout === 'horizontal'
          }"
        ></div>

        <!-- Actual Image -->
        <img
          [id]="'event-image-' + eventData.id_event"
          [src]="eventData.img"
          [alt]="eventData.nom"
          [ngClass]="{
            'absolute inset-0 w-full h-full object-cover': layout === 'vertical',
            'max-h-40': layout === 'horizontal'
          }"
          (load)="onImageLoad()"
          (error)="onImageError(eventData.id_event)"
          [hidden]="isImageLoading"
        />
      </figure>
    <div class="card-body flex flex-col h-full">
      <div class="card-title text-xl font-bold">{{ eventData.nom }}</div>
      <div class="flex gap-2"><div class="font-bold">Date: </div> {{ eventData.date }}</div>
      <div class="flex gap-2"><div class="font-bold">Place: </div> {{ eventData.lieu + ', ' + eventData.ville }}</div>
      <div class="flex gap-2"><div class="font-bold">Created by: </div> {{ eventData.creator.prenom + ' ' + eventData.creator.nom.toLocaleUpperCase()}}</div>
      <div class="flex gap-2"><div class="font-bold">Description: </div> {{ getShortDescription(eventData.content) }}</div>
      <div class="card-actions justify-self-end gap-4 mt-auto">
        <svg *ngIf="isRegistered" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" class="text-success" style="fill: currentColor;"><path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z"></path><path d="m11 17.414 5.707-5.707-1.414-1.414L11 14.586l-2.293-2.293-1.414 1.414z"></path></svg>
        <!--<a class="link link-accent">Learn more</a>-->
        <button class="btn btn-accent" (click)="openModal('modal-' + eventData.id_event.toString())">Learn More</button>
        <!-- should use authService.isIntervenant() but some event were created by user 9-->
        <button *ngIf="(eventData.creator.id === authService.getUser()?.id && authService.isIntervenant()) || authService.isAdmin()"
          class="btn btn-info"
          (click)="openModal('modify-event-modal-' + eventData.id_event)"
          >Modify
        </button>
        <dialog id="modal-{{eventData.id_event}}" class="modal">
          <div class="modal-box flex flex-col gap-2">
          <div class="card-title text-xl font-bold">{{ eventData.nom }}</div>
          <div class="flex gap-2"><div class="font-bold">Date: </div> {{ eventData.date }}</div>
          <div class="flex gap-2"><div class="font-bold">Place: </div> {{ eventData.lieu + ', ' + eventData.ville }}</div>
          <div class="flex gap-2"><div class="font-bold">Created by: </div> {{ eventData.creator.prenom + ' ' + eventData.creator.nom.toLocaleUpperCase()}}</div>
          <div class="flex gap-2"><div class="font-bold">Description: </div> {{ eventData.content }}</div>
          @if(authService.isLoggedIn() && !authService.isAdmin() && !authService.isIntervenant()) {
            <!-- Register Button -->
            <button
              *ngIf="action === 'register' && !isRegistered"
              class="btn btn-soft btn-success"
              (click)="beginRegistration(eventData.id_event)"
            >
              Register
            </button>
            <button
              *ngIf="action === 'register' && isRegistered"
              class="btn btn-success"
            >
              You're registered!
            </button>
          
            <!-- Cancel Registration Button -->
            <button
              *ngIf="action === 'cancel'"
              class="btn btn-soft btn-error"
              (click)="beginCancel(eventData.id_event)"
            >
              Cancel attendance
            </button>
          }
            <!-- Comments Section -->
            <div class="divider m-0 p-0"></div>
            <div class="flex flex-col gap-4">
              <div class="text-xl font-bold">Comments</div>
              <!-- Adding comments -->
              @if(authService.isLoggedIn()){
                <div class="flex gap-4">
                  <textarea [(ngModel)]="newComContent" id="newComContent" class="textarea grow" placeholder="your comment"></textarea>
                  <div (click)="addComment()" class="btn btn-primary">Submit</div>
              </div>
              }
              <!-- Comments -->
              <div class="text-md italic text-success" *ngIf="successMessage.length > 0">{{ successMessage }}</div>
              <div class="text-md italic text-error" *ngIf="commentsError.length > 0">{{ commentsError }}</div>
              <div class="text-md text-info" *ngIf="commentsMessage.length > 0">{{ commentsMessage }}</div>
              @for(comment of comments; track comment.id_comment) {
                <app-comment
                  [commentData]="comment"
                  [isAuthor]="isAuthorofComment(comment.user.id)"
                  (deleteComment)="deleteComment(comment.id_comment)"
                >
                </app-comment>
              }
            </div>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <app-event-dialog
          [dialogId]="'modify-event-modal-' + eventData.id_event"
          [mode]="'modify'"
          [eventId]="eventData.id_event"
          (closeEventCardDialog)="closeDialog(eventData.id_event)"
        >
        </app-event-dialog>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class EventCardComponent {
  @Input() eventData!: EventData;
  @Input() isRegistered: boolean = false;
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'; // Default to vertical layout
  @Input() action: 'register' | 'cancel' = 'register'; // Default to register action
  @Output() registerToEvent = new EventEmitter<number>();
  @Output() cancelEventRegistration = new EventEmitter<number>();
  @Output() refetchComments = new EventEmitter<number>();
  @Output() eventWasDeleted = new EventEmitter<number>();

  comments: CommentData[] = [];
  commentService = inject(CommentService);
  commentsMessage: string = '';
  successMessage: string = '';
  commentsError: string = '';

  newComContent = '';

  authService: AuthService = inject(AuthService);

  isImageLoading: boolean = true;

  constructor() { }

  ngOnInit(){
    this.fetchComments();
    //console.log(this.authService.isIntervenant(), this.authService.isAdmin());
  }

  fetchComments(){
    this.commentsMessage = '';
    this.commentService.getCommentsByEventId(this.eventData.id_event).subscribe(
      (comments: CommentData[]) => {
        this.comments = comments;
        if(comments.length == 0)
          this.commentsMessage = "No comments yet";
      },
      (error) => {
        console.error('Error fetching comments:', error);
        this.commentsError = "Failed to fetch comments";
      }
    );
  }

  getShortDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
  }

  beginRegistration(eventId: number): void {
    this.registerToEvent.emit(eventId);
  }

  beginCancel(eventId: number): void {
    this.closeModal(eventId.toString());
    this.cancelEventRegistration.emit(eventId);
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
    const modal = document.getElementById(`modal_${modalId}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  }

  addComment(){
    console.log("Adding comment");
    if(this.newComContent){
      if(this.newComContent.length > 0){
        this.commentService.addComment(this.eventData.id_event, this.newComContent).subscribe(
          (success) => {
            this.successMessage = "Comment added!";
            this.fetchComments();
            const comElement = document.getElementById('newComContent') as HTMLInputElement;
            if(comElement)
              comElement.value = '';
          },
          (error) => {
            console.log("error addind comment: ", error);
            this.  commentsError = "Error adding comment";
          }
        )
      }
    }
  }

  deleteComment(commentId: number){
    //console.log('Delete comment with id: ' + commentId);
    this.commentService.deleteComment(commentId).subscribe(
      (success) => {
        this.comments = this.comments.filter((comment) => comment.id_comment !== commentId);
        this.refetchComments.emit();
        this.commentsMessage = "Comment deleted!";
      },
      (error) => {
        console.log("Error deleting comment", error);
        this.commentsError = error.toString();
      }
    )
  }

  isAuthorofComment(comAuthorId: number): boolean{
    return (this.authService.getUser()?.id === comAuthorId) || this.authService.isAdmin();
  }

  onImageLoad(): void {
    this.isImageLoading = false; // Hide the skeleton when the image loads
  }

  onImageError(eventId: number): void {
    this.isImageLoading = false; // Hide the skeleton if the image fails to load
    const imgElement = document.getElementById(`event-image-${eventId}`) as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'mmi-logo.png?' + new Date().getTime();
      //imgElement.classList.add('w-40');
    }
    //console.error(`Image failed to load for event ID: ${eventId}`);
  }

  closeDialog(eventId: number): void {
    this.eventWasDeleted.emit(eventId);
    this.closeModal('modal-' + eventId.toString());
  }
}
