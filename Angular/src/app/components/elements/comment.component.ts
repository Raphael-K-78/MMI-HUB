import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentData } from '../../interfaces/comment-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [ CommonModule ],
  template: `
    <div class="flex flex-col bg-base-200 p-2">
      <div class="flex gap-2">
        <div class="text-md font-mono">no:{{commentData.id_comment}}</div>
        <div class="flex gap-2">
          <!--<div class="text-md font-bold">Author:</div>-->
          <div class="text-md font-bold italic">{{ commentData.user.prenom + ' ' + commentData.user.nom.toLocaleUpperCase()}}</div>
        </div>
        <div *ngIf="isAuthor" (click)="beginDeleteComment(commentData.id_comment)" class="btn btn-outline btn-xs btn-error">Delete comment</div>
      </div>
      <div class="text-md">{{commentData.content}}</div>
    </div>
  `,
  styles: ``
})
export class CommentComponent {
  @Input() commentData!: CommentData;
  @Input() isAuthor: boolean = false;
  @Output() deleteComment = new EventEmitter<number>();

  beginDeleteComment(commentId: number): void{
    this.deleteComment.emit(commentId);
    //console.log('delete comment with id: ' + commentId);
  }
}
