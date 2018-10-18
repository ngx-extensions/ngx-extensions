import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrisedLinkPipeDemoComponent } from './parametrised-link-pipe-demo.component';

describe('ParametrisedLinkPipeDemoComponent', () => {
  let component: ParametrisedLinkPipeDemoComponent;
  let fixture: ComponentFixture<ParametrisedLinkPipeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParametrisedLinkPipeDemoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrisedLinkPipeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
