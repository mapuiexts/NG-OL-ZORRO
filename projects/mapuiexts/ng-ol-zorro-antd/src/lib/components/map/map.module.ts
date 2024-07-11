import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolzMapComponent } from './map/map.component';
import { NolzMapControlDirective } from '../../directives/map/map/controls/map-control.directive';
import { NolzMapControlsComponent } from './map/map-controls/map-controls.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NolzMapComponent,
    NolzMapControlsComponent,
    NolzMapControlDirective
  ], 
  exports: [
    NolzMapComponent,
    NolzMapControlsComponent,
    NolzMapControlDirective
  ]
})
export class WidgetModule { }
