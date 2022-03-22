import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users$!: Observable<any>;

  constructor(
    private userService: UsersService,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
  }

  onClickSeePosts(user: any): void {
    this.postService.currentUser = user;
    this.router.navigateByUrl('posts');
  }

}
