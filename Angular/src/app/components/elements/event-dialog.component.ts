import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UniversiteData } from '../../interfaces/universite-data';
import { UniversitesService } from '../../services/universites.service';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InscriptionService } from '../../services/inscription.service';
import { InscriptionData } from '../../interfaces/inscription-data';
import { CommentService } from '../../services/comment.service';
import { CommentData } from '../../interfaces/comment-data';
import { forkJoin, of, switchMap } from 'rxjs';

interface ExUObject extends UniversiteData {
  villeSpaces: string;
}

@Component({
  selector: 'app-event-dialog',
  imports: [ FormsModule, CommonModule ],
  template: `
    <dialog
     id="{{ dialogId }}"
     class="modal"
     >
      <div class="modal-box">
        <form (ngSubmit)="onSubmit()" class="flex flex-col gap-2 pr-1">
          <div *ngIf="mode === 'add'" class="text-xl font-bold">Add Event</div>
          <div *ngIf="mode === 'modify'" class="text-xl font-bold">Modify Event</div>

          <legend class="fieldset-legend">Event name</legend>
          <input type="text"[(ngModel)]="name" name="name" placeholder="Event name" class="input w-full" />

          <legend class="fieldset-legend">Pick event place</legend>
          @if(mode === 'add'){
          <select [(ngModel)]="id_univ" id="id_univ-select-{{eventId}}" name="id_univ" class="select w-full">
            <option disabled selected>Pick event place</option>
            <option *ngFor="let uni of possibleUnivs" [value]="uni.id" [attr.title]="uni.ville + uni.villeSpaces + uni.nom">{{ uni.ville }}, {{ uni.nom }}</option>
          </select>
          }
          @else {
          <input type="text" name="id_univ" class="input w-full" placeholder="{{lieu}}" disabled>
          }
          <legend class="fieldset-legend">Link to image</legend>
          <input type="text" [(ngModel)]="img" name="img" class="input w-full" placeholder="link to your image" required>
          <span class="fieldset-label">Optional</span>

          <legend class="fieldset-legend">Event description</legend>
          <textarea class="textarea w-full" [(ngModel)]="content" name="content" placeholder="Event Description" required></textarea>

          <legend class="fieldset-legend">Date and time</legend>
          <input type="datetime-local" [(ngModel)]="date" name="date" class="input w-full" required>

          <div class="flex justify-center pt-2">
            <button *ngIf="mode === 'add'" type="submit" class="btn btn-wide btn-info btn-submit">Add Event</button>
            <button *ngIf="mode === 'modify'" type="submit" class="btn btn-wide btn-info btn-submit">Modify Event</button>
          </div> 
          

          <!-- Messages -->
          <p *ngIf="errorMessage" class="error-message text-error">{{ errorMessage }}</p>
          <p *ngIf="successMessage" class="error-message text-success">{{ successMessage }}</p>
        </form>
        @if(mode === 'modify'){
        <div class="divider pt-0 pb-0 mt-2 mb-2"></div>

        <div class="flex flex-col gap-2 justify-center">
          <div class="flex justify-center">
            <button (click)="beginEventDeleteCheck(eventId)" class="btn btn-wide btn-error">Delete Event</button>
          </div>
          <span id="delete-check-loading-{{eventId}}" class="loading loading-dots loading-lg" style="display:none;"></span>
        </div>
        <dialog id="delete-event-modal-{{eventId}}" class="modal">
            <div class="modal-box">
              <h2 class="text-lg font-bold">{{ deleteConfirmTitle}}</h2>
              <p>{{ deleteConfirmMessage }}</p>
              <div class="flex flex-col gap-2 justify-center">
                <div class="flex justify-center pt-2">
                  <button (click)="beginDeleteEvent(eventId)" class="btn btn-wide btn-error">{{ deleteBtnMessage }}</button>
                </div> 
                <span id="delete-wait-loading-{{eventId}}" class="loading loading-dots loading-lg" style="display:none;"></span>
              </div>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>close</button>
            </form>
        </dialog>
        }
        </div>
        <form method="dialog" class="modal-backdrop">
          <button (click)="clearMessages()">close</button>
        </form>
    </dialog>
  `,
  styles: ``,
  providers: [DatePipe]
})
export class EventDialogComponent {
  @Input() dialogId: string = 'add-event-modal';
  @Input() eventId: number = -1;
  @Input() mode: 'add' | 'modify' = 'add';
  @Output() closeEventCardDialog = new EventEmitter<number>();
  @Output() refetchEvents = new EventEmitter<void>();

  name: string = '';
  id_univ: number = -1; // 
  img: string = '';
  content: string = '';
  date: string = '';
  lieu: string = '';

  errorMessage: string = ' ';
  successMessage: string = '';
  userName: string | undefined = '';

  allUnivs: UniversiteData[] = [];
  possibleUnivs: ExUObject[] = [];
  longestCityLen: number = 0;
  univSpacer: string = '';

  defaultImage = 'mmi-logo.png';

  deleteConfirmTitle: string = 'Are you sure you want to delete this event?';
  deleteConfirmMessage: string = 'This action cannot be undone.';
  deleteBtnMessage: string = 'Delete Event';
  inscriptions: InscriptionData[] = [];

  commentService: CommentService = inject(CommentService);

  //datePipe: DatePipe = new DatePipe('short');
  
  constructor(private univService: UniversitesService, 
    private authService: AuthService,
    private eventService: EventService,
    private datePipe: DatePipe,
    private inscriptionService: InscriptionService) { }

  ngOnInit(): void {
    const userRef = this.authService.getUser();
    this.userName = userRef?.prenom + ' ' + userRef?.nom;

    this.univService.getAllUniversites().subscribe(
      (data: UniversiteData[]) => {
        this.allUnivs = data;

        data.sort((a, b) => a.ville.localeCompare(b.ville));
        this.addRemainingLen();
        //console.log(this.possibleUnivs);
      },
      (error) => {
        console.error('Error fetching universities:', error);
      }
    );

    if(this.mode === 'modify'){
      this.fillEventData();
    }
  }

  private addRemainingLen(): void {
    this.longestCityLen = this.findLongestWord(this.allUnivs.map(uni => uni.ville)).length;

    this.possibleUnivs = this.allUnivs.map(uni => {
      return {
        ...uni,
        villeSpaces: '&nbsp;'.repeat(this.longestCityLen - uni.ville.length),
        villeSpaceLen: this.longestCityLen - uni.ville.length
      };
    });
  }

  private findLongestWord(words: string[]): string {
    return words.reduce((longest, word) => {
      return word.length > longest.length ? word : longest;
    }, '');
  }

  onSubmit(): void {
    this.img = (this.img.length > 0) ? this.img : this.defaultImage;
    const newDate = this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss') ?? '';

    if(this.mode === 'add'){
      this.eventService.addEvent(this.name, this.id_univ, this.img, this.content, newDate).subscribe(
        (response) => {
          this.successMessage = 'Event "' + this.name + '" added successfully!';
          this.refetchEvents.emit(); // Emit the event to refetch events
        },
        (error) => {
          this.errorMessage = 'Error adding event: ' + error.message;
        }
      )
    }
    if(this.mode === 'modify'){
      this.eventService.modifEvent(this.eventId, this.name, newDate, this.img, this.content).subscribe(
        (response) => {
          this.successMessage = 'Event "' + this.name + '" modified successfully!';
        },
        (error) => {
          this.errorMessage = 'Error modifying event: ' + error.message;
        }
      )
    }
    
  }

  beginDeleteEvent(eventId: number): void {
    this.setElementActive('delete-wait-loading-' + eventId, true);
    console.log("Began delete event: ", eventId);
  
    // Step 1: Delete all inscriptions
    this.inscriptionService.getAllEventInscriptions(eventId).subscribe(
      (inscriptions: InscriptionData[]) => {
        const deleteInscriptions$ = inscriptions.map(inscription =>
          this.inscriptionService.deleteInscription(inscription.id).toPromise()
        );
        Promise.all(deleteInscriptions$).then(() => {
          // Step 2: Delete all comments
          this.commentService.getCommentsByEventId(eventId).subscribe(
            (comments: CommentData[]) => {
              const deleteComments$ = comments.map(comment =>
                this.commentService.deleteComment(comment.id_comment).toPromise()
              );
              Promise.all(deleteComments$).then(() => {
                // Step 3: Delete the event
                this.eventService.deleteEvent(eventId).subscribe(
                  () => {
                    this.setElementActive('delete-wait-loading-' + eventId, false);
                    this.successMessage = 'Event deleted successfully!';
                    this.closeModal('delete-event-modal-' + eventId);
                    this.closeEventCardDialog.emit(eventId);
                  },
                  (error) => {
                    this.errorMessage = 'Error deleting event: ' + error.message;
                    console.error('Error deleting event:', error);
                  }
                );
              });
            },
            (error) => {
              this.errorMessage = 'Error deleting comments: ' + error.message;
              console.error('Error deleting comments:', error);
            }
          );
        });
      },
      (error) => {
        this.errorMessage = 'Error deleting inscriptions: ' + error.message;
        console.error('Error deleting inscriptions:', error);
      }
    );
  }

  deleteAllComments(eventId: number): void {
    this.commentService.getCommentsByEventId(eventId).subscribe(
      (coms: CommentData[]) => {
        coms.forEach(com => {
          this.commentService.deleteComment(com.id_comment).subscribe(
            (response) => {
              console.log('Comment deleted successfully:', response);
            },
            (error) => {
              console.error('Error deleting comment:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  beginEventDeleteCheck(eventId: number){
    this.setElementActive('delete-check-loading-' + eventId, true);

    this.inscriptionService.getAllEventInscriptions(eventId).subscribe(
      (inscriptions) => {
        this.inscriptions = inscriptions;
        if (this.inscriptions.length > 0) {
          // Delete all inscriptions for this event
          console.log("There are insripcitons");
          this.deleteConfirmTitle = 'There are inscriptions for this event!';
          this.deleteConfirmMessage = 'This action will delete the event along with all inscriptions. This action cannot be undone.';
        }
        else
        console.log("No inscriptions for this event");
      },
      (error) => {
        console.error('Error fetching inscriptions:', error);
      }
    );

    this.setElementActive('delete-check-loading-' + eventId, false);
    this.openModal('delete-event-modal-' + eventId);
  }

  fillEventData(){
    this.eventService.getEventById(this.eventId)?.subscribe(
      (event) => {
        this.name = event.nom;
        //this.id_univ = event.lieu.id_univ;
        this.lieu = event.lieu;
        this.img = event.img;
        this.content = event.content;
        this.date = this.datePipe.transform(event.date, 'yyyy-MM-ddTHH:mm') ?? '';      },
      (error) => {
        console.error('Error fetching event data:', error);
      }
    );
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

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  setElementActive(elementId: string, active: boolean): void {
    const element = document.getElementById(elementId) as HTMLDialogElement;
    if (element) {
      if(active)
        element.style.display = 'block';
      else
        element.style.display = 'none';
    } 
    else {
      console.error(`Element with id "${elementId}" not found.`);
    }
  }


}
