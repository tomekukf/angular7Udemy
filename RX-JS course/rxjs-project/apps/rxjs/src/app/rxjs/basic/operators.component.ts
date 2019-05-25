import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  Observable,
  fromEvent,
  combineLatest,
  BehaviorSubject,
  interval,
  of,
  EMPTY,
  Subject,
  merge
} from 'rxjs';
import {
  startWith,
  map,
  share,
  switchMap,
  catchError,
  takeUntil,
  tap,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { ListComponent } from '../../shared/list/list.component';

@Component({
  selector: 'app-operators',
  template: `
    <h1>Operatory</h1>
    <p>
      zaawansowane: switchMap, debounceTime throttleTime combineLatest retry
      merge delay bufferTime switchMap takeUntil
    </p>
    <input
      #input
      type="text"
      id="textInput"
      class="form-control"
      placeholder="Enter Query..."
      autocomplete="off"
    />
    <pre>{{ text }}</pre>
    <button #btn class="btn btn-primary">Button</button>

    <!-- <pre>{{ data$ | async | json }}</pre> -->

    <pre>{{ data | json }}</pre>
  `,
  styles: []
})
export class OperatorsComponent implements OnInit, OnDestroy {
  @ViewChild('input')
  input: ElementRef;
  @ViewChild('btn')
  btn: ElementRef;
  text: string;

  data$: Observable<any>;
  data: any;

  destroy$ = new Subject();

  constructor(private list: ListComponent) { }
  ngOnInit() {
    const log = (...args) => this.list.add(...args);
    const button = this.btn.nativeElement;
    const input = this.input.nativeElement;

    const btn$: Observable<MouseEvent> = fromEvent(button, 'click');
    const input$: Observable<MouseEvent> = fromEvent(input, 'keyup');

    const interval$ = interval(1000);

    const cancel$ = merge(this.destroy$.pipe(), btn$.pipe());

    const cache = { id: 2, name: 'guest' };

    function myOperator(param) {

      return (in$) => {
        const out$ = in$.pipe(
          map(v => v),
          filter(v => !v),
          distinctUntilChanged
        );
        return out$;
      };

    }

    function myMap(mapFn) {

      return (in$) => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe(
            v => {
              if (v) {
                obs.next(mapFn(v));
              }
            },
            err => obs.error(err),
            () => obs.complete()
          );

          return () => sub.unsubscribe();
        });
        return out$;
      };

    }

    function myFilter(filterFn) {
      return (in$) => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe(
            v => {
              if (filterFn(v)) {
                obs.next(v);
              }
            },
            err => obs.error(err),
            () => obs.complete()
          );
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    function myStartWith(startValue) {
      return (in$) => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe(
            v => obs.next(v),
            err => obs.error(err),
            () => obs.complete()
          );
          obs.next(startValue);
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }

    function myEndWith(endValue) {
      return (in$) => {
        const out$ = new Observable(obs => {
          const sub = in$.subscribe(
            v => obs.next(v),
            err => obs.error(err),
            () => {
              obs.next(endValue);
              obs.complete();
            }
          );
          return () => sub.unsubscribe();
        });
        return out$;
      };
    }
    function myTakeUntil(until$) {
      return (in$) => {
        const out$ = new Observable(obs => {

          const sub = in$.subscribe(
            v => obs.next(v),
            err => obs.error(err),
            () => {
              obs.complete();
            }
          );
          const untilSub = until$.subscribe(
            v => {
              sub.unsubscribe()
              obs.complete();
              untilSub.unsubscribe()
            }
          );
          return () => {
            sub.unsubscribe()
            untilSub.unsubscribe()
          };
        });
        return out$;
      };
    }

    this.data$ = interval(1000).pipe(
      myMap(v => v * 2),
      myFilter(v => v < 10),
      myTakeUntil(btn$),
      myEndWith(-100)
    );

    // this.data$ = ajax('/api/long').pipe(
    //   myMap((res: AjaxResponse) => res.response),
    //   // tap(res => cache = res),
    //   // myOperator('data'),
    //   // startWith(cache),
    //   takeUntil(cancel$)
    // );


    this.data$.subscribe(
      data => {
        this.data = data;
        log('DATA', data)
      },
      err => log('ERR', err)
    );

    // const sharedInterval$ = interval$.pipe(
    //   takeUntil(btn$),
    //   share()
    // );

    // sharedInterval$.subscribe(v => log('A', v));

    // setTimeout(() => {
    //   sharedInterval$.subscribe(v => log('B', v));
    // }, 4000);

    // setTimeout(() => {
    //   interval$.pipe(takeUntil(btn$)).subscribe(v => log('Z', v));
    // }, 5000);

    // const id$ = of(1);

    // function getUser(id): Observable<any> {
    //   return ajax({url: '/api/user?id=' + id, }).pipe(
    //     map(res => res.response),
    //     catchError(err => EMPTY)
    //   );
    // }

    // function getCategory(id): Observable<any> {
    //   return ajax({url: '/api/category/' + id, }).pipe(
    //     map(res => res.response)
    //   );
    // }

    // function getUserWithCategory(id): Observable<any> {
    //   return of(id).pipe(
    //     switchMap(id2 => getUser(id2)),
    //     switchMap(user => getCategory(user.category).pipe(map(category => [user, map]))),
    //     catchError(err => EMPTY)
    //   );
    // }

    // const data$ = id$.pipe(
    //   switchMap(id => getUserWithCategory(id).pipe(
    //     catchError(err => {
    //       // TODO UI dla errorow
    //       return EMPTY;
    //     })
    //   ))
    // );

    // data$.subscribe(
    //   data => log('DATA', data),
    //   err => log('ERR', err)
    // );

    // const config$ = new BehaviorSubject('config');
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
