import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostDTO } from 'src/app/Post/models/post.dto';
import { PostService } from 'src/app/Post/services/post.service';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0.2 })),
      transition('void <=> *', animate(1500)),
    ]),
  ],
})
export class AppCardComponent {
  @Input() post?: PostDTO;
  showButtons: boolean = false;

  constructor(
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.showButtons = true;
      }
    });
  }

  like(postId: string): void {
    let errorResponse: any;

    this.postService.likePost(postId).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  dislike(postId: string): void {
    let errorResponse: any;

    this.postService.dislikePost(postId).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
}
