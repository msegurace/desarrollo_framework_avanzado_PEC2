import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { PostService } from '../../services/post.service';
import { PostsState } from '../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts: PostDTO[];
  postState: Observable<PostsState>;
  private userId: string;

  constructor(private store: Store<AppState>) {
    this.userId = '';
    this.posts = new Array<PostDTO>();
    this.postState = store.select('posts');

    this.store.select('auth').subscribe((auth) => {
      if (auth.credentials.user_id) {
        this.userId = auth.credentials.user_id;
      }
    });

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
