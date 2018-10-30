# NgxConnectRouteParam

A directive used to connect the value of a _route parameter_ to a host `NgControl` instance

## Usage

### Basic

In a minimal use case, one would like to reflect the value of a route parameter at the time that a component is instanciated:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="User Id" formControlName="user" ngxConnectRouteParam/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   user: fb.control(null)
  });
 }
}
```

Asumming that the component is rendered under the route `domain/users/:user`, with this setup the `input` field will by default contain the value of the route parameter `:user`. For example:

- `domain/users/foo`: field has value `foo` once the component is instanciated
- `domain/users/test`: field has value `test` once the component is instanciated

### Value transform

Route parameters might sometimes by formated in a way that is not desired for an `input` field value. For such use cases, the `valueTransform` property allows to plug-in a method to transform the value before pushing it into the field:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="User Id" formControlName="user"
      [valueTransform]="transformName" ngxConnectRouteParam/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 // Replaces any dash character with a whitespace
 transformName : (id: string) => string = id => id.replace('-', ' '));

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   user: fb.control(null)
  });
 }
}
```

### Explicit route parameter identifier

In some use cases, one might want to bind the `input` field to a route parameter that does not matches the name given to the field. For such use cases, simply pass the desired query parameter identifier to the directive:

```typescript
@Component({
 template: `
    <form [formGroup]="form">
      <input placeholder="User Id" formControlName="id" ngxConnectRouteParam="user"/>
    </form>
  `
})
export class UsersComponent {
 readonly form: FormGroup;

 constructor(private formBuilder: FormBuilder) {
  this.form = formBuilder.form({
   id: fb.control(null)
  });
 }
}
```
