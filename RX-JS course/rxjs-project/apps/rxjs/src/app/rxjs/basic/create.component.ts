import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Observable,
  fromEvent,
  interval,
  of,
  empty,
  EMPTY,
  range,
  timer,
  throwError,
  from
} from 'rxjs';
import { share } from 'rxjs/operators';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-create',
  template: `
    <h1>Create Observables</h1>
    <p>
      dostępne metody: Create, Defer, Empty/Never/Throw, From, Interval, Just,
      Range, Repeat, Start, and Timer
    </p>
    <button #btn class="btn btn-primary">Button</button>
  `,
  styles: []
})
export class CreateComponent implements OnInit {
  @ViewChild('btn')
  btn: ElementRef;
  constructor(private list: ListComponent) { }

  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;

    // const stream$ = interval(500).pipe(share());
    // const stream$ = of({ id: 2, name: 'Piotr' });
    // const stream$ = from(['Q', 'W', 'Z']);
    // const stream$ = from([{ id: 2, name: 'Piotr' }]);
    // const stream$ = empty();
    // const stream$ = EMPTY;
    // const stream$ = range(2, 4);
    // const stream$ = timer(2000);
    // const stream$ = throwError('custom error');

    function myInterval(time: number) {

      return new Observable(obs => {
        let counter = 0;
        const clock = setInterval(() => {
          log('PRODUCE', counter);
          obs.next(counter);
          counter++;
        }, time);

        return () => clearInterval(clock);
      });

    }

    const stream$ = myInterval(500);

    const sub = stream$.subscribe(
      val => log('A', val),
      err => log('error', err),
      () => log('complete')
    );

    setTimeout(() => {
      sub.unsubscribe();
    }, 2000);

    // const sub2 = stream$.subscribe(
    //   (val) => log('B', val),
    //   (err) => log('error 2', err),
    //   () => log('complete 2')
    // );

    // setTimeout(() => {
    //   sub2.unsubscribe();
    // }, 4000);

    // setTimeout(() => {
    //   const sub3 = stream$.subscribe(
    //     (val) => log('C', val),
    //     (err) => log('error 2', err),
    //     () => log('complete 2')
    //   );
    //   setTimeout(() => {
    //     sub3.unsubscribe();
    //   }, 2000);
    // }, 3000);

    // setTimeout(() => {
    //   const sub3 = stream$.subscribe(
    //     (val) => log('D', val),
    //     (err) => log('error 2', err),
    //     () => log('complete 2')
    //   );
    //   setTimeout(() => {
    //     sub3.unsubscribe();
    //   }, 2000);
    // }, 7000);

    // const btn$ = Observable.create((obs) => {

    //   let counter = 0;
    //   function onClick(e) {
    //     if (counter > 3) {
    //       return obs.error('nie nie nie ');
    //     }
    //     counter++;
    //     obs.next(e);
    //   }
    //   button.addEventListener('click', onClick);

    //   return () => {
    //     log('clean your resources');
    //     button.removeEventListener('click', onClick);
    //   };
    // });

    // btn$.subscribe(
    //   (val) => log('next', val),
    //   (err) => log('error', err),
    //   () => log('complete')
    // );
  }
}
