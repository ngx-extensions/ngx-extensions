import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './connect-query-param-demo.component.html',
  styleUrls: ['./connect-query-param-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectQueryParamDemoComponent {
  readonly testForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    const {
      paramMap: paramMapSnap,
      queryParamMap: queryParamMapSnap
    } = this.route.snapshot;
    console.log({ paramMapSnap, queryParamMapSnap });
    this.testForm = this.createTestForm();
  }

  private createTestForm() {
    return this.formBuilder.group({
      name: this.formBuilder.control(null)
    });
  }
}
