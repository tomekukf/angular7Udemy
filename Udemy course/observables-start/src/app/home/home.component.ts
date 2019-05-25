import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Observer, Subscription} from "rxjs";
import  "rxjs/operators"
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // We will store our subscription here, we need to add import
  numbersObsrSubscription: Subscription;
  customObsrSubscription: Subscription;

  constructor() { }

  ngOnInit() {

   //    // We are creating Observable which will emit number in some interveals (1000ms) via next() function which is worikng in backgorunf
   //  const obsr = Observable.interval(500);
   //  // Subsribing to  this observable
   // this.numbersObsrSubscription=  obsr.subscribe(
   //    (number: number ) => {
   //      console.log(number);
   //    }
   //  );


    // We can chain observables like java stream and transforms that data
    const obsrChain = interval(500).pipe(map(
      (data:number) => {return data*2}

    ));
    obsrChain.subscribe((
      (data:number) => {
        console.log(data);
      }
    ))

  // We are creating Observable with Observable lifecycle next(), completed(), error() phase
  //   If error will occur completed can be invoked(it wont be reached while code executing)
    const obsr1 = Observable.create((observer: Observer<string>) =>{
      setTimeout(()=>{
        observer.next('1st Package');
      },2000),

        setTimeout(()=>{
          observer.next('2nd Package');

        },4000),

        setTimeout(()=>{
        // observer.error('error messagae');
      },5000),
        setTimeout(()=>{
          observer.complete();

        },6000)
    })

  // Subscribing to it and handling all event which can occurs

    this.customObsrSubscription = obsr1.subscribe(
      (data : String ) =>{
        console.log(data);
      },
      (error : String ) =>{
        console.log(error);
      },
      ()=>{
        console.log('completed');
      }
    )

  }

  ngOnDestroy(): void {
    this.numbersObsrSubscription.unsubscribe();
    this.customObsrSubscription.unsubscribe();
  }

}
