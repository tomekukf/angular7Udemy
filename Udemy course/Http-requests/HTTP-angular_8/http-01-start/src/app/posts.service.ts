import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Post} from './post.model';
import {map, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  // methods like post get update delete giving us back observables so we can make operations on this data
  // trasnsorm it or tap can print
  // https://angular.io/guide/http

  constructor(private http: HttpClient) { }
   subject = new Subject<any>();
   errorSub = new Subject<any>();


  createAndStrorePost(title: string, content: string) {
    const newPost: Post = {  title, content };

    this.http.post(
        'https://angualr-http-test.firebaseio.com/post/post.json',
        newPost,
      // { observe: 'response'}
      { observe: 'body'}
      )
      .subscribe((responseData) => {

        console.log(responseData);
      },
        error => {
        this.errorSub.next(error);
        });
  }



  fetchPost() {
    this.http.get<{[key: string]: Post}>('https://angualr-http-test.firebaseio.com/post/post.json',
      { headers: new HttpHeaders({'custoom-header': 'Hello Tomek'}),
      params: new HttpParams().set('print', 'pretty')
      })
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
    return this.http.delete('https://angualr-http-test.firebaseio.com/post/post.json'
      , { observe : 'events', responseType: 'json'},
      ).pipe(tap(
      (events ) => {
        console.log(events);
      }
    ));
  }
}
