import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectQueryParamDemoComponent } from './connect-query-param-demo.component';

describe('ConnectQueryParamDemoComponent', () => {
  let component: ConnectQueryParamDemoComponent;
  let fixture: ComponentFixture<ConnectQueryParamDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectQueryParamDemoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectQueryParamDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
