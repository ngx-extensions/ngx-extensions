# NgxLet

A structural directive used to bind an arbitrary value to a template variable

## Description

The `NgxLet` directive provides an alternative to the common `NgIf` pattern used to bind
values to template variables, in most cases in combination with the `AsyncPipe` in order to
extract values from an observable.

## Usage

The most common use case is binding streams to template variables as follows

```typescript
import { interval } from 'rxjs';

@Component({
 template: `
    <div *ngxLet="interval$ | async as interval">
      Interval emitted {{ interval }}
    </div>
  `
})
export class DemoComponent {
 // Emit every 1s, starting with a delay of 0s
 readonly interval$ = interval(0, 1000);
}
```

For use cases in which the value emitted by the stream will be bounded to multiple nodes
inside of the template context, `NgxLet` commes in really handy

```typescript
import { interval } from 'rxjs';

@Component({
 template: `
    <button #btnlet *ngxLet="loading$ | async as loading" [disabled]="loading">
      <i class="some-font-class" [class.spin-icon]="loading">refresh</i>
      {{ loading ? 'Fetching entries...' : 'Refresh entries' }}
    </button>
    <button #btnif *ngIf="loading$ | async as loading" [disabled]="loading">
      <i class="some-font-class" [class.spin-icon]="loading">refresh</i>
      {{ loading ? 'Fetching entries...' : 'Refresh entries' }}
    </button>
    <button #btnasync [disabled]="loading$ | async">
      <i class="some-font-class" [class.spin-icon]="loading$ | async">refresh</i>
      {{ (loading$ | async) ? 'Fetching entries...' : 'Refresh entries' }}
    </button>
  `
})
export class DemoComponent {
 // A stream that tracks the fetching state a collection of entries
 readonly loading$: Observable<boolean>;
}
```

If we analyze all the template options, its easy to note that both `#btnlet` and `#btnif` have a better readability compared to `#btnasync`.

But there is a catch: `#btnif` will be _removed_ from the DOM whenever the stream emits a `false`. So, if the requirement is to keep the `<button>` tag at all times in the DOM, one can only go with either `#btnlet` or `#btnasync`.
