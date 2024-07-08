import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from '@mapuiexts/ng-ol-zorro-antd';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { LayerTreeComponent } from '../../../mapuiexts/ng-ol-zorro-antd/src/public-api';
import { MapServiceService } from './map-service.service';

function createMap() {
  return new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
        visible: true,
        properties: {
          name: 'OSM'
        }
      }),
    ],
    view: new View({
      center: fromLonLat([12.924, 47.551]),
      zoom: 13,
    }),
  });
};

//const map: Map = createMap();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, NzButtonModule, LayerTreeComponent, NzSpaceModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'app-test';
  map: Map;

  constructor(private mapService: MapServiceService) {
    this.map = mapService.map;
    console.log('map in app', this.map);
  }

  ngOnInit(): void {
    // this.map = this.mapService.map;
    // console.log('map in app', this.map);
  }

}
