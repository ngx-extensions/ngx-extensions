# @ngx-extensions/screenfull

A simple wrapper around [screenfull.js](https://github.com/sindresorhus/screenfull.js) for Angular.

## Installation

```bash
npm install @ngx-extensions/screenfull
```

## Setup

Import `NgxScreenfullModule` into your module

```typescript
import { NgxScreenfullModule } from '@ngx-extensions/screenfull';

@NgModule({
 imports: [NgxScreenfullModule]
})
export class AppModule {}
```

## Usage

The most basic use case is to toggle the fullscreen mode through an element´s click event:

```html
<button ngxToggleFullscreen>Toggle fullscreen</button>
```

_Note: the host element of `ngxToggleFullscreen` does not necessarily have to be a `<button>`_

The state of the fullscreen mode can be tracked through the `ScreenfullService`

```typescript
import { ScreenfullService } from '@ngx-extensions/screenfull';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
 template: `
    <span>Screenfull mode is currently {{ mode$ | async }}</span>
  `
})
export class DemoComponent {
 readonly mode$: Observable<string>;

 constructor(public readonly screenfullService: ScreenfullService) {
  this.mode$ = this.screenfullService.fullScreenActive$.pipe(
   map(active => (active ? 'active' : 'inactive'))
  );
 }
}
```

To interact with the fullscreen API, use the `ScreenfullService`:

```typescript
import { ScreenfullService } from '@ngx-extensions/screenfull';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
 template: `
    <button (click)="screenfullService.request()">Enter fullscreen</button>
    <button (click)="screenfullService.exit()">Exit fullscreen</button>
    <button (click)="screenfullService.toggle()">Toggle fullscreen</button>
    <span>Screenfull mode is currently: {{ mode$ | async }}</span>
  `
})
export class DemoComponent {
 readonly mode$: Observable<string>;

 constructor(public readonly screenfullService: ScreenfullService) {
  this.mode$ = this.screenfullService.fullScreenActive$.pipe(
   map(active => (active ? 'active' : 'inactive'))
  );
 }
}
```
