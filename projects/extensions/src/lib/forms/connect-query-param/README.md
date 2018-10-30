# NgxConnectQueryParam

A directive used to connect the value of a _query parameter_ to a host `NgControl` instance

## Usage

### Basic

In a minimal use case, one would like to reflect the value of a query parameter at the time that a component is instanciated:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="Filter by name" formControlName="name" ngxConnectQueryParam/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   name: fb.control(null)
  });
 }
}
```

Asumming that the component is rendered under the route `domain/users`, with this setup the `input` field will by default contain the value of the query parameter `name`. For example:

- `domain/users`: the field has no value once the component is instanciated
- `domain/users?name=test`: field has value `test` once the component is instanciated
- `domain/users?name=foo`: field has value `foo` once the component is instanciated

### Value transform

Query parameters might sometimes by formated in a way that is not desired for an `input` field value. For such use cases, the `valueTransform` property allows to plug-in a method to transform the value before pushing it into the field:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="Filter by name" formControlName="name"
      [valueTransform]="transformName" ngxConnectQueryParam/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 // Replaces any dash character with a whitespace
 transformName : (name: string) => string = name => name.replace('-', ' '));

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   name: fb.control(null)
  });
 }
}
```

### Explicit query parameter identifier

In some use cases, one might want to bind the `input` field to a query parameter that does not matches the name given to the field. For such use cases, simply pass the desired query parameter identifier to the directive:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="Filter by name" formControlName="name" ngxConnectQueryParam="filter"/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   name: fb.control(null)
  });
 }
}
```

In this setup, the following effects can be seen:

- `domain/users`: the field has no value once the component is instanciated
- `domain/users?name=test`: the field has no value once the component is instanciated
- `domain/users?filter=test`: field has value `test` once the component is instanciated
