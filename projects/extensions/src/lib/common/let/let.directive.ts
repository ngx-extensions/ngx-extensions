import {
  Directive,
  OnInit,
  ViewContainerRef,
  TemplateRef,
  Input
} from '@angular/core';

export class NgxLetContext {
  $implicit: any = null;
  ngxLet: any = null;
}

/**
 * Binds a value to a template variable
 */
@Directive({
  selector: '[ngxLet]'
})
export class NgxLet implements OnInit {
  private readonly _context: NgxLetContext;

  @Input('ngxLet')
  set value(value: any) {
    this._context.$implicit = this._context.ngxLet = value;
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<NgxLetContext>
  ) {
    this._context = new NgxLetContext();
  }

  ngOnInit() {
    this._viewContainerRef.createEmbeddedView(this._templateRef, this._context);
  }
}
