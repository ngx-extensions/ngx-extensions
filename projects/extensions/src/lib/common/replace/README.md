# NgxReplacePipe

A _pure_ pipe used to apply `string.replace` on a string argument

## Description

The `NgxReplacePipe` is an utility pipe used to invoke `string.replace` on a string value, using a _pattern_ and optional _replace_ argument.

## Usage

A simple use case would look as follows:

```typescript
@Component({
 template: `
  <label>Spaces are replaced by an empty string</label>
  <span>{{ value | ngxReplace:spacePattern }}</span>
  <label>Spaces are replaced by an "*"</label>
  <span>{{ value | ngxReplace:spacePattern:asteriscReplace }}</span>
  `
})
export class DemoComponent {
 value = "Lorem ipsum dolor sit";
 spacePattern = /\s/g;
 asteriscReplace = "*";
}
```
