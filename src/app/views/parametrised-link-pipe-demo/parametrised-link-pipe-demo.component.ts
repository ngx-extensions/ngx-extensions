import { Component, ChangeDetectionStrategy } from '@angular/core';

class ParameterBag {
  plant: string;
  workshop: string;
  material: string;

  constructor(plant: string, workshop: string, material: string) {
    this.plant = plant;
    this.workshop = workshop;
    this.material = material;
  }
}

@Component({
  selector: 'app-parametrised-link-pipe-demo',
  templateUrl: './parametrised-link-pipe-demo.component.html',
  styleUrls: ['./parametrised-link-pipe-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParametrisedLinkPipeDemoComponent {
  readonly demoLinks: string[];
  readonly parametrisedLink = '/demo/:plant/:workshop/:material';

  constructor() {
    this.demoLinks = [
      this.createDemoLink(new ParameterBag('PL00', 'WS00', 'M000')),
      this.createDemoLink(new ParameterBag('P001', 'WS01', 'M001')),
      this.createDemoLink(new ParameterBag('P002', 'WS02', 'M002'))
    ];
  }

  private createDemoLink(value: ParameterBag): string {
    const { plant, workshop, material } = value;
    return `/demo/${plant}/${workshop}/${material}`;
  }
}
