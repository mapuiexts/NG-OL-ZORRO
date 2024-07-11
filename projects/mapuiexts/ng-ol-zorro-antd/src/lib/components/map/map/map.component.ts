import { NgStyle } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Map } from 'ol';

@Component({
  selector: 'nolz-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class NolzMapComponent implements AfterViewInit, OnDestroy, AfterContentInit {
  @ViewChild('mapContainer', { static: true }) mapContainer?: ElementRef;
  @Input({ required: true }) map!: Map;
  @Input() style: string = 'width: 100%; height: 100%;';
  //@ViewChildren('') children: any;
  //@ContentChild(p) test?: ElementRef;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.mapContainer) {
      this.map.setTarget(this.mapContainer.nativeElement);
    }
  }

  ngAfterContentInit(): void {
    //console.log('test', this.test);
  }

  ngOnDestroy(): void {
    this.map.setTarget(undefined);
  }
}
