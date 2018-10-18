import {
  Directive,
  OnInit,
  ViewContainerRef,
  TemplateRef,
  Input
} from '@angular/core';

export class NgxeLetContext {
  $implicit: any = null;
  ngxLet: any = null;
}

@Directive({
  selector: '[ngxLet]'
})
export class NgxLet implements OnInit {
  private readonly _context: NgxeLetContext;

  @Input('ngxLet')
  set value(value: any) {
    this._context.$implicit = this._context.ngxLet = value;
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<NgxeLetContext>
  ) {
    this._context = new NgxeLetContext();
  }

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
  }
}
