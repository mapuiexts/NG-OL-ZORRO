import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayerTreeComponent } from './layer/layer-tree/layer-tree.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayerTreeComponent
  ],
  exports: [
    LayerTreeComponent
  ]
})
export class TreeModule { }
