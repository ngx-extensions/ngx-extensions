# NgxRepeat

A structural directive used to insert a template to the DOM `n` times

## Description

The `NgxRepeat` is strongly related to the `NgForOf`, exposing almost the same functionalities, with the difference being that it allows the repetition of a template based on a _number_ instead of an _array_.

There are indeed multiple ways in which this behavior can be archived through the `NgForOf` directive. Most of them are based on the creation of a dummy array with irrelevant content. This is fine, but again, the `NgxRepeat` directive deals with this in a more specialized manner.

## Usage

A simple use case would be as follows:

```typescript
@Component({
 template: `
    <span *ngxRepeat="5; index as iteration">Span number {{ iteration + 1 }}</span>
  `
})
export class DemoComponent {}
```

Which will result in the following HTML being generated:

```html
<span>Span number 1</span>
<span>Span number 2</span>
<span>Span number 3</span>
<span>Span number 4</span>
<span>Span number 5</span>
```

Of course, one could also bind to a component member as follows:

```typescript
@Component({
 template: `
    <span *ngxRepeat="count; index as iteration">Span number {{ iteration + 1 }}</span>
  `
})
export class DemoComponent {
 count = 5;
}
```

Which would result in the same HTML being generated.

## Template context

As mentioned in [the description](#description), the `NgxRepeat` directive strongly ressembles to the `NgForOf` in terms of the template context values exposed. All of them can be found in the `NgxRepeatContext` class.
