import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  currentUser: any;
  posts$!: Observable<any>;

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.postService.currentUser) {
      this.currentUser = this.postService.currentUser;
      this.posts$ = this.postService.getAll();
    } else {
      this.router.navigateByUrl('');
    }
  }

}
