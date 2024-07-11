import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolzLayerTreeComponent } from './layer/layer-tree/layer-tree.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NolzLayerTreeComponent
  ],
  exports: [
    NolzLayerTreeComponent
  ]
})
export class TreeModule { }
