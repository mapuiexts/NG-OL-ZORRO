import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolzLayerTreeButtonComponent } from './layer/layer-tree-button/layer-tree-button.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NolzLayerTreeButtonComponent
  ],
  exports: [
    NolzLayerTreeButtonComponent
  ]
})
export class ButtonModule { }
