import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
   subject = new Subject<any>();
   errorSub = new Subject<any>();

  createAndStrorePost(title: string, content: string) {
    const newPost: Post = {  title, content };

    this.http.post(
        'https://angualr-http-test.firebaseio.com/post/post.json',
        newPost
      )
      .subscribe((responseData) => {

        console.log(responseData);
      },
        error => {
        this.errorSub.next(error);
        });
  }



  fetchPost() {
    this.http.get<{[key: string]: Post}>('https://angualr-http-test.firebaseio.com/post/post.json')
      .pipe(map(
        (responseData) => {
          const arrayOfPost: Post[] = [];
          for ( const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // arrayOfPost.push({...reponseData[key], id: key });
              arrayOfPost.push({...responseData[key], id: key });
            }
          }
          return arrayOfPost;
        }
      )).
    subscribe(
      (response) => {
        console.log(response);
        this.subject.next(response);
      }
    );

  }



  fetchPostReturnObservable() {
    return this.http.get<{[key: string]: Post}>('https://angualr-http-test.firebaseio.com/post/post.json')
      .pipe(map(
        (responseData) => {
          const arrayOfPost: Post[] = [];
          for ( const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              // arrayOfPost.push({...reponseData[key], id: key });
              arrayOfPost.push({...responseData[key], id: key });
            }
          }
          return arrayOfPost;
        }
      ));

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  deletePost(){
    return this.http.delete('https://angualr-http-test.firebaseio.com/post/post.json');
  }
}
