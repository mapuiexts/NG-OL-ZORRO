import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Map, MapEvent } from 'ol';
import Control from 'ol/control/Control';

export interface NolzMapControlOptions {
  style?: string;
  class?: string;
  render?: ((arg0: MapEvent) => void) | undefined;
  target?: string | HTMLElement | undefined;
}

@Directive({
  selector: '[nolzMapControl]',
  standalone: true,
})
export class NolzMapControlDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true }) nolzMapControl!: NolzMapControlOptions;
  @Input({ required: true }) map!: Map;
  control?: Control;

  constructor(private el: ElementRef, renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.nolzMapControl.style &&
      (this.el.nativeElement.style = this.nolzMapControl.style);
    this.nolzMapControl.class &&
      this.el.nativeElement.classList.add(this.nolzMapControl.class);
    this.el.nativeElement.style.position = 'absolute';

    this.control = new Control({
      element: this.el.nativeElement,
      render: this.nolzMapControl.render,
      target: this.nolzMapControl.target,
    });

    this.map.addControl(this.control);
  }

  ngOnDestroy(): void {
    if (this.control) this.map.removeControl(this.control);
  }
}
