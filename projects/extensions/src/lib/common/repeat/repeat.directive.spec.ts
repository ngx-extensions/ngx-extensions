import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { NgxRepeat } from './repeat.directive';

const TAG = 'span';
const TEMPLATE = '<span *ngxRepeat="quantity;index as i">{{ i }}</span>';

@Component({
  selector: 'ngx-test',
  template: ''
})
class TestComponent {
  quantity = 1;
}

describe('NgxRepeat', () => {
  let fixture: ComponentFixture<TestComponent>;

  function getComponent(): TestComponent {
    return fixture.componentInstance;
  }

  function createTestComponent(
    template: string = TEMPLATE
  ): ComponentFixture<TestComponent> {
    return TestBed.overrideComponent(TestComponent, {
      set: { template: template }
    }).createComponent(TestComponent);
  }

  function detectChangesAndExpectQuantityOfTag(
    quantity: number,
    tag: string = TAG
  ) {
    fixture.detectChanges();
    const tagNodes = fixture.debugElement.queryAll(By.css(tag));
    expect(tagNodes.length).toBe(quantity);
  }

  afterEach(() => {
    fixture = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestComponent, NgxRepeat]
    });
  });

  describe('binding to expression', () => {
    it('should reflect number expression value', () => {
      const template = '<span *ngxRepeat="5;index as i">{{ i }}</span>';
      fixture = createTestComponent(template);

      detectChangesAndExpectQuantityOfTag(5);
    });
  });

  describe('binding to component member', () => {
    it('should reflect initial quantity', () => {
      fixture = createTestComponent();

      detectChangesAndExpectQuantityOfTag(1);
    });

    it('should reflect changed quantity', () => {
      fixture = createTestComponent();
      fixture.detectChanges();

      getComponent().quantity = 2;
      detectChangesAndExpectQuantityOfTag(2);

      getComponent().quantity = 10;
      detectChangesAndExpectQuantityOfTag(10);
    });

    it('should render 0 elements when passed 0', () => {
      fixture = createTestComponent();
      fixture.detectChanges();

      getComponent().quantity = 0;

      detectChangesAndExpectQuantityOfTag(0);
    });

    it('should render 0 elements when passed negative numbers', () => {
      fixture = createTestComponent();
      fixture.detectChanges();

      getComponent().quantity = -10;

      detectChangesAndExpectQuantityOfTag(0);
    });

    it('should render 0 elements when passed null as quantity', () => {
      fixture = createTestComponent();
      fixture.detectChanges();

      getComponent().quantity = null;

      detectChangesAndExpectQuantityOfTag(0);
    });

    it('should gracefully handle quantity changing to null and back', () => {
      fixture = createTestComponent();
      fixture.detectChanges();

      getComponent().quantity = null;
      detectChangesAndExpectQuantityOfTag(0);

      getComponent().quantity = 1;
      detectChangesAndExpectQuantityOfTag(1);
    });

    it('should render only `1` element when passed a quantity >= 1 and using `last`', () => {
      const template = `
        <ng-container *ngxRepeat="quantity; index as i; last as isLast">
          <span *ngIf="isLast">{{ i }}</span>
        </ng-container>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      detectChangesAndExpectQuantityOfTag(1);

      getComponent().quantity = 2;
      detectChangesAndExpectQuantityOfTag(1);
    });

    it('should render only `1` element when passed a quantity >= 1 and using `first`', () => {
      const template = `
        <ng-container *ngxRepeat="quantity; index as i; first as isFirst">
          <span *ngIf="isFirst">{{ i }}</span>
        </ng-container>`;
      fixture = createTestComponent(template);
      fixture.detectChanges();

      detectChangesAndExpectQuantityOfTag(1);

      getComponent().quantity = 2;
      detectChangesAndExpectQuantityOfTag(1);
    });
  });
});
