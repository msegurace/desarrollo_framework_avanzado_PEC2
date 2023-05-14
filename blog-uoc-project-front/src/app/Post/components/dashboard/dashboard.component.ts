import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PostsAction from '../../actions';
import { PostDTO } from '../../models/post.dto';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PostsState } from '../../reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: PostDTO[];

  postState: Observable<PostsState>;

  numLikes: number;
  numDislikes: number;

  post_data: any[] = [
    {
      name: 'likes',
      value: 0,
    },
    {
      name: 'dislikes',
      value: 0,
    },
  ];
  view: [number, number] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'N. Posts';
  yAxisLabel: string = '';
  showYAxisLabel: boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28'],
  };

  constructor(private store: Store<AppState>) {
    this.posts = new Array<PostDTO>();
    this.postState = store.select('posts');
    this.numLikes = 0;
    this.numDislikes = 0;

    this.store.select('posts').subscribe((posts) => {
      this.posts = posts.posts;
      this.numLikes = 0;
      this.numDislikes = 0;
      this.posts.forEach((post) => {
        this.numLikes = this.numLikes + post.num_likes;
        this.numDislikes = this.numDislikes + post.num_dislikes;
        this.post_data = [
          {
            name: 'likes',
            value: this.numLikes,
          },
          {
            name: 'dislikes',
            value: this.numDislikes,
          },
        ];
      });
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.store.dispatch(PostsAction.getPosts());
  }
}
