import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { PostsState } from '../../reducers';
import { Observable } from 'rxjs';
import { faFontAwesomeFlag } from '@fortawesome/free-brands-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts: PostDTO[];
  private userId: string;

  columnsToDisplay = [
    'id',
    'title',
    'description',
    'num_likes',
    'num_dislikes',
    'publication_date',
    'categories',
    'actions',
  ];

  postState: Observable<PostsState>;
  constructor(private router: Router, private store: Store<AppState>) {
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

    this.loadPosts();
  }

  private loadPosts(): void {
    if (this.userId) {
      this.store.dispatch(
        PostsAction.getPostsByUserId({ userId: this.userId })
      );
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  deletePost(postId: string): void {
    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(PostsAction.deletePost({ postId: postId }));
    }
  }
}
