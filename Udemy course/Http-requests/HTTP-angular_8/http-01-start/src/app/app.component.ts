import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://angualr-http-test.firebaseio.com/post/post.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }


  onFetchPosts() {
    this.fetchPost();
  }


  fetchPost() {
    this.http.get('https://angualr-http-test.firebaseio.com/post/post.json')
      .pipe(map(
        (reponseData) => {
          const arrayOfPost = [];
          for ( const key in reponseData) {
            if (reponseData.hasOwnProperty(key)) {
              // arrayOfPost.push({...reponseData[key], id : key });
              arrayOfPost.push({...reponseData[key], id: key });
            }
          }
          return arrayOfPost;
        }
      )).

    subscribe(
      (response) => {
        console.log(response);
      }
    );
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
