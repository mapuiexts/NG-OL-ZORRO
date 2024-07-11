import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  NolzLayerTreeButtonComponent,
  NolzMapComponent,
  NolzMapControlsComponent,
  NolzMapControlDirective,
  NolzLayerTreeComponent
} from '@mapuiexts/ng-ol-zorro-antd';

import { Map } from 'ol';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { MapServiceService } from './map-service.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzButtonModule,
    NzSpaceModule,
    NzLayoutModule,
    NzMenuModule,
    NolzMapComponent,
    NolzMapControlsComponent,
    NolzLayerTreeComponent,
    NolzLayerTreeButtonComponent,
    NolzMapControlDirective,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app-test';
  map: Map;

  constructor(private mapService: MapServiceService) {
    this.map = mapService.map;
  }

}
