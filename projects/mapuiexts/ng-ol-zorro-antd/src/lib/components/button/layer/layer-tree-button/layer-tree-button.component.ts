import { Component, Input, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Map } from 'ol';
import { NolzLayerTreeComponent } from '../../../../../public-api';
import { NgIf } from '@angular/common';


@Component({
  selector: 'nzol-lyr-tree-button',
  standalone: true,
  imports: [NzButtonComponent, NzDrawerModule, NolzLayerTreeComponent, NzIconModule, NgIf],
  templateUrl: './layer-tree-button.component.html',
  styleUrl: './layer-tree-button.component.css'
})
export class NolzLayerTreeButtonComponent implements OnInit {
  @Input({ required: true }) map!: Map;
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ngOnInit(): void {
    //console.log('map in layer tree button', this.map);
  }
}
