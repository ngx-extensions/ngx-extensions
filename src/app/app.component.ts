import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, timer, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly counterSub = new BehaviorSubject(3);
  readonly counter$: Observable<number>;

  constructor() {
    this.counter$ = this.counterSub.asObservable();
  }

  increaseCounter() {
    this.counterSub.next(this.counterSub.value + 1);
  }

  decreaseCounter() {
    this.counterSub.next(this.counterSub.value - 1);
  }
}
