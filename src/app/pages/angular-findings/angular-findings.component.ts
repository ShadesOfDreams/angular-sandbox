import { Component } from '@angular/core';
import { BehaviorSubject, catchError, first, forkJoin, of, ReplaySubject, Subject, Subscription, timeout } from 'rxjs';

type TestType = { propNameA: number, propNameB: string };
type TestKeys = keyof TestType;

@Component({
  selector: 'angular-findings',
  template: `<div>
    <span>Write out subject and behaviour subject value. They change 3 times.</span>
  </div>
  <div class="value"><span>Subject: {{logs[0]}}</span></div>
  <div class="value"><span>BehaviourSubject: {{logs[1]}}</span></div>
  <div class="value"><span>ReplaySubject: {{logs[2]}}</span></div>
  <button (click)="askOnce()">Ask once with subscription</button>
  <button [disabled]="subscribed" (click)="subscribeAll()">Subscribe all</button>
  <button (click)="addNewValue()">Add new value</button>
  <button [disabled]="!subscribed" (click)="unsubscribeAll()">Unsubscribe all</button>
  <button (click)="reset()">Reset</button>
  <div>
    {{ typeTest }}
  </div>
  `,
  styles: [`.red { color: red }`]
})
export class AngularFindingsComponent {
  //#region Subscriptions
  private subscriptions: Array<Subscription> = [];
  private subjectTest = new Subject<number>();
  private behaviourSubjectTest = new BehaviorSubject<number>(0);
  private replaySubjectTest = new ReplaySubject<number>(0);
  //#endregion

  typeTest: TestKeys = "propNameA";

  logs: any[] = [];
  subscribed = false;

  constructor() {
    console.log(typeof this.typeTest)
  }

  subscribeAll() {
    this.subscriptions.push(
      this.subjectTest.pipe(timeout(250), catchError(() => of(null))).subscribe((value) => this.storeValue(value, 0))
    );
    this.subscriptions.push(
      this.behaviourSubjectTest.pipe(timeout(250), catchError(() => of(null))).subscribe((value) => this.storeValue(value, 1))
    );
    this.subscriptions.push(
      this.replaySubjectTest.pipe(timeout(250), catchError(() => of(null))).subscribe((value) => this.storeValue(value, 2))
    );
    this.subscribed = true;
  }

  unsubscribeAll() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscribed = false;
  }

  askOnce() {
    this.unsubscribeAll();
    forkJoin([this.subjectTest.pipe(
      first(), timeout(250), catchError((param) => of(null))
    ), this.behaviourSubjectTest.pipe(
      first(), timeout(250), catchError((param) => of(null))
    ), this.replaySubjectTest.pipe(
      first(), timeout(250), catchError((param) => of(null))
    )]).subscribe((values: any) => {
      this.storeValue(values[0], 0);
      this.storeValue(values[1], 1);
      this.storeValue(values[2], 2);
    })
    this.subjectTest
      .pipe()
      .subscribe((value) => this.storeValue(value, 0));
    this.behaviourSubjectTest
      .pipe(first())
      .subscribe((value) => this.storeValue(value, 1));
    this.replaySubjectTest
      .pipe(first())
      .subscribe((value) => this.storeValue(value, 2));
  }

  private storeValue(value: any, index: number) {
    this.logs[index] = `${value} - ${typeof value}`;
  }

  addNewValue() {
    let value = this.behaviourSubjectTest.value + 1 || 1;
    this.subjectTest.next(value);
    this.behaviourSubjectTest.next(value);
    this.replaySubjectTest.next(value);
  }

  reset() {
    this.subjectTest = new Subject<number>;
    this.behaviourSubjectTest = new BehaviorSubject<number>(0);
    this.replaySubjectTest = new ReplaySubject<number>();
    this.askOnce();
    this.unsubscribeAll();
  }
}
