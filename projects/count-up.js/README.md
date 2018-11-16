# @ngx-extensions/countup.js

A wrapper module for [countup.js](https://github.com/inorganik/countUp.js)

## Installation

```bash
npm install @ngx-extensions/count-up.js
```

## Setup

Import `NgxCountUpModule` into your module:

````typescript
import { NgxCountUpModule } from '@ngx-extensions/count-up.js';

@NgModule({
  imports: [NgxCountUpModule]
})
export class AppModule {}
````

## Usage

A simple use case looks as follows

````typescript
@Component({
  template: `
    <span ngxCountUp startValue="0" endValue="100" duration="3"></span>
  `
})
export class DemoComponent {}
````
