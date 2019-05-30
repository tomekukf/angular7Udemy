import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {PostsService} from './posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class  AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFethcing = false;
  private error: string;

  constructor(private http: HttpClient, private postService: PostsService) {}

  subsc: Subscription;
  errorSub: Subscription;

  ngOnInit() {
    this.postService.errorSub.subscribe(
      (data) => {
        this.loadedPosts = data;
        console.log('1' + this.loadedPosts);
        Object.assign(this.loadedPosts, data);
        console.log(this.loadedPosts);
      },
      (error) => {
        this.error = error.message;
    });

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
    console.log('onfetch2');
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
        console.log(data);

        this.loadedPosts = data;
      },
    (error) => {
      console.log('error');
      this.error = error.message;
      console.log('Error object: check with api which propoerties we have to refernece');
      console.log(error);
    }
    );
  }


  fetchPost() {
    this.postService.fetchPost();
  }

  onClearPosts() {
    this.postService.deletePost().subscribe(
      () => {
       this.loadedPosts = [];
        }
  );
    // Send Http request
  }

  ngOnDestroy() {
    this.subsc.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
