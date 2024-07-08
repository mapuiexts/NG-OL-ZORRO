import { NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Map } from 'ol';

@Component({
  selector: 'nolz-map',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;
  @Input({ required: true }) map!: Map;
  // @Input() height: string | number = '100%';
  // @Input() width: string | number = '100%';
  @Input() style: string = 'width: 100%; height: 100%;';

  constructor() {}

  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this.map.setTarget(this.mapContainer.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.map.setTarget(undefined);
  }
}
