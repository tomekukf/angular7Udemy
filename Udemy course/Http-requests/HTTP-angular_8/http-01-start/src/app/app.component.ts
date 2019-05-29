import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {post} from 'selenium-webdriver/http';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFethcing = false;

  constructor(private http: HttpClient, private postService: PostsService) {}
subsc: Subscription;

  ngOnInit() {
    this.fetchPost();
    // this.postService.fetchPost();
    // this.subsc =  this.postService.getMessage().subscribe(
    //   (data: Post[]) => {
    //     console.log(data);
    //     this.loadedPosts = data;
    //   }
    // );
  }

  onCreatePost(postData: Post) {
    // Send Http request
 this.postService.createAndStrorePost(postData.title, postData.content);
  }


  onFetchPosts2() {
    console.log('onfetch2')
    this.postService.getMessage().subscribe(
      (data: Post[]) => {
        console.log(data);
        this.loadedPosts = data;
      }
    );
  }

  onFetchPosts1() {
  this.postService.fetchPostReturnObservable().subscribe(
      (data) => {
        this.loadedPosts = data;
      }
    );
  }


  fetchPost() {
    this.postService.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
  }
}
