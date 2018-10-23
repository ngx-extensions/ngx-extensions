import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  DoCheck
} from '@angular/core';

/**
 * Defines the values of the template context used by {@link NgxRepeat}
 */
export class NgxRepeatContext {
  /**
   * Creates a new instance
   * @param count the number of iterations to be made
   * @param index the current iteration
   */
  constructor(private readonly count: number, public readonly index: number) {}

  /**
   * Whether the current index represents the first item to be rendered
   */
  get first(): boolean {
    return this.index === 0;
  }

  /**
   * Whether the current index represents the last item to be rendered
   */
  get last(): boolean {
    return this.index === this.count - 1;
  }

  /**
   * Whether the current index is even
   */
  get even(): boolean {
    return this.index % 2 === 0;
  }

  /**
   * Whether the current index is odd
   */
  get odd(): boolean {
    return !this.even;
  }
}

/**
 * Inserts a view to the DOM a given number of times
 */
@Directive({
  selector: '[ngxRepeat]'
})
export class NgxRepeat implements DoCheck {
  /**
   * The number of times that the template has to be rendererd
   */
  @Input('ngxRepeat')
  set repeat(val: number | null) {
    val = val ? val : 0;
    if (this._repeat !== val) {
      this._changes = true;
    }
    this._repeat = val;
  }
  private _repeat: number;
  private _changes = false;

  /**
   * Creates a new instance
   * @param _templateRef the template reference
   * @param _viewContainerRef the view container
   */
  constructor(
    private _templateRef: TemplateRef<NgxRepeatContext>,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngDoCheck() {
    if (this._changes) {
      this._render();
      this._changes = false;
    }
  }

  private _render() {
    this._viewContainerRef.clear();
    for (let i = 0; i < this._repeat; i++) {
      this._viewContainerRef.createEmbeddedView(
        this._templateRef,
        new NgxRepeatContext(this._repeat, i)
      );
    }
  }
}
