import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

import { NgxLetModule } from './let.module';

@Component({ selector: 'ngx-test-cmp', template: '' })
class TestComponent {
  booleanValue = true;
  numberValue = 1;
  stringValue = 'foo';
  objectValue: { name: string; id: number } = { name: 'foo', id: 1 };
  observableValue: Observable<any>;
}

describe('NgxLet', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let spanElement: DebugElement;

  function readComponentInstance() {
    return (component = fixture.componentInstance);
  }

  function detectSpanElement() {
    fixture.detectChanges();
    return (spanElement = fixture.debugElement.query(By.css('span')));
  }

  afterEach(() => {
    fixture = null;
    component = null;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NgxLetModule]
    });
  });

  describe('binding to observables', () => {
    let sourceSubject: Subject<string>;

    function expectEmitedValue(value: string) {
      sourceSubject.next(value);
      fixture.detectChanges();
      expect(extractText(spanElement)).toBe(value);
    }

    function setComponentStream() {
      component.observableValue = sourceSubject.asObservable();
    }

    beforeEach(() => {
      sourceSubject = new Subject<string>();
    });

    it('should work when stream has not emitted', async(() => {
      const template =
        '<span *ngxLet="observableValue | async as value">{{value}}</span>';
      fixture = createComponentFixture(template);
      readComponentInstance();
      setComponentStream();

      detectSpanElement();

      expect(extractText(spanElement)).toBe('');
    }));

    it('should track stream emissions', async(() => {
      const template =
        '<span *ngxLet="observableValue | async as value">{{value}}</span>';
      fixture = createComponentFixture(template);
      readComponentInstance();
      setComponentStream();

      detectSpanElement();

      expectEmitedValue('foo');
      expectEmitedValue('bla');
    }));
  });

  describe('binding to value types (eg: string, boolean, number)', () => {
    it('should work with a string value', async(() => {
      const template = '<span *ngxLet="stringValue as value">{{value}}</span>';
      fixture = createComponentFixture(template);
      readComponentInstance();

      detectSpanElement();

      expect(extractText(spanElement)).toBe(component.stringValue);
    }));
  });

  describe('binding to reference types (eg: plain objects)', () => {
    it('should work when bound to an object', async(() => {
      const template =
        '<span *ngxLet="objectValue as value">{{value | json}}</span>';
      fixture = createComponentFixture(template);
      readComponentInstance();

      detectSpanElement();

      expect(JSON.parse(extractText(spanElement))).toEqual(
        component.objectValue
      );
    }));

    it('should work when bound to an object member', async(() => {
      const template =
        '<span *ngxLet="objectValue.name as value">{{value}}</span>';
      fixture = createComponentFixture(template);
      readComponentInstance();

      detectSpanElement();

      expect(extractText(spanElement)).toBe(component.objectValue.name);
    }));
  });
});

function extractText(spanElement: DebugElement): string {
  return spanElement.nativeElement.textContent;
}

function createComponentFixture(
  template: string
): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {
    set: { template: template }
  }).createComponent(TestComponent);
}
