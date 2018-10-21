# @ngx-extensions/screenfull

A simple wrapper around [screenfull.js](<https://github.com/sindresorhus/screenfull.js>) for Angular.

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

*Note: the host element of `ngxToggleFullscreen` does not necessarily have to be a `<button>`*

The state of the fullscreen mode can be tracked through the `ScreenfullService`

```typescript
import { ScreenfullService } from '@ngx-extensions/screenfull';

@Component({
  template: `
    <span>Screenfull mode is currently {{ (screenfullService.fullScreenActive$ | async) ? 'active': 'inactive' }}</span>
  `
})
export class DemoComponent {
  constructor(public readonly screenfullService: ScreenfullService){}
}
```

To interact with the fullscreen API, use the `ScreenfullService`:

```typescript
import { ScreenfullService } from '@ngx-extensions/screenfull';

@Component({
  template: `
    <button (click)="screenfullService.request()">Enter fullscreen</button>
    <button (click)="screenfullService.exit()">Exit fullscreen</button>
    <button (click)="screenfullService.toggle()">Toggle fullscreen</button>
    <span>Screenfull mode is currently {{ (screenfullService.fullScreenActive$ | async) ? 'active': 'inactive' }}</span>
  `
})
export class DemoComponent {
  constructor(public readonly screenfullService: ScreenfullService){}
}
```
