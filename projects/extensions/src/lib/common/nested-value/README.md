# NgxNestedValuePipe

A _pure_ pipe used to extract values from nested properties of an object

## Description

The `NgxNestedValuePipe` is an utility pipe used to extract the value of a nested property from an object by means of a _path-like_ parameter.

## Usage

A simple use case could be as follows:

```typescript
interface Foo {
 innerFoo: NestedFoo;
}

interface NestedFoo {
 value: string;
}

@Component({
 template: `
  <span>
    foo['{{property}}'] has the value '{{ foo | ngxNestedValue: property }}'
  </span>
  `
})
export class DemoComponent {
 readonly foo: Foo;
 property = 'innerFoo.value';
 constructor() {
  this.foo = {
   innerFoo = {
    value: 'foo'
   }
  };
 }
}
```

Which results in the following HTML:

```html
<span>foo['innerFoo.value'] has the value 'foo'</span>
```
