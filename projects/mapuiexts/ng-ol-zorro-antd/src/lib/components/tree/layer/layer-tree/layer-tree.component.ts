import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree';
import { Map } from 'ol';
import LayerGroup from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import { getUid } from 'ol/util';

const testNodes: NzTreeNodeOptions[] = [
  {
    title: 'parent 1',
    key: '100',
    layer: 0,
    children: [
      {
        title: 'parent 1-0',
        key: '1001',
        disabled: true,
        layer: 1,
        children: [
          {
            title: 'leaf 1-0-0',
            key: '10010',
            disableCheckbox: true,
            isLeaf: true,
          },
          { title: 'leaf 1-0-1', key: '10011', isLeaf: true },
        ],
      },
      {
        title: 'parent 1-1',
        key: '1002',
        children: [
          { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
          { title: 'leaf 1-1-1', key: '10021', isLeaf: true, layer: 2 },
        ],
      },
    ],
  },
];

@Component({
  selector: 'nolz-lyr-tree',
  standalone: true,
  imports: [NzTreeModule],
  templateUrl: './layer-tree.component.html',
  styleUrl: './layer-tree.component.css',
})
export class LayerTreeComponent implements OnInit {
  private _layerGroup?: LayerGroup;
  nodes: NzTreeNodeOptions[] = [];
  @ViewChild('nzTreeComponent', { static: false })
  nzTreeComponent!: NzTreeComponent;
  @Input() style: string = 'width: 100%; height: 100%;';
  @Input({ required: true }) map!: Map;
  @Input() filterFunc: (layer: BaseLayer) => boolean = (layer: BaseLayer) =>
    true;
  @Input() get layerGroup(): LayerGroup | undefined {
    return this._layerGroup;
  }
  set layerGroup(value: LayerGroup | undefined) {
    this._layerGroup = this.layerGroup || value;
  }

  rootLayerName = '';
  checkedKeys: string[] = [];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  constructor() {
    console.log('map', this.map);
  }

  ngOnInit(): void {
    this.layerGroup = this.map.getLayerGroup();
    this.rebuildTreeNodes();
    //this.nodes = testNodes;
  }

  private getVisibleKeys(
    layerGroup: LayerGroup,
    keys: string[] = []
  ): string[] {
    const layers = layerGroup?.getLayers().getArray();
    if (layers) {
      layers.forEach((layer) => {
        if (layer instanceof LayerGroup) {
          this.getVisibleKeys(layer, keys);
        } else {
          if (layer.getVisible()) {
            if (this.filterFunc(layer)) {
              keys.push(getUid(layer));
            }
          }
        }
      });
    }
    return keys;
  }

  private treeNodeFromLayer(layer: BaseLayer): NzTreeNodeOptions {
    let children: NzTreeNodeOptions[] = [];
    if (layer instanceof LayerGroup) {
      let childLayers = layer.getLayers().getArray();
      childLayers = this.filterFunc
        ? childLayers.filter(this.filterFunc)
        : childLayers;
      children = childLayers.map((childLayer) =>
        this.treeNodeFromLayer(childLayer)
      );
      children.reverse();
    }
    const node: NzTreeNodeOptions = {
      title: layer.get('name') || 'Layer',
      key: getUid(layer),
      layer: layer,
      children: children.length > 0 ? children : undefined,
      isLeaf: children.length === 0,
    };
    return node;
  }

  private treeNodesFromLayerGroup(layerGroup: LayerGroup): NzTreeNodeOptions[] {
    let layers = layerGroup.getLayers().getArray();
    layers = this.filterFunc ? layers.filter(this.filterFunc) : layers;

    const nodes = layers.map((layer) => this.treeNodeFromLayer(layer));
    nodes.reverse();
    return nodes;
  }

  private rebuildTreeNodes() {
    if (this.layerGroup) {
      this.nodes = this.treeNodesFromLayerGroup(this.layerGroup);
      this.checkedKeys = this.getVisibleKeys(this.layerGroup);
    }
  }

  private setLayerVisibility(layer: BaseLayer, visible: boolean) {
    layer.setVisible(visible);
    if (layer instanceof LayerGroup) {
      layer.getLayers().forEach((childLayer) =>
        this.setLayerVisibility(childLayer, visible)
      );
    }
  }

  //nodes = testNodes;

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log('event', event.node?.isChecked, event.keys, event.checkedKeys);
    console.log('checked node list', this.nzTreeComponent.getCheckedNodeList());
    console.log('layer', event.node?.origin['layer']);
    const checked = event.node?.isChecked || false;
    const layer = event.node?.origin['layer'];
    if (layer) {
      this.setLayerVisibility(layer, checked);
    }

  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList());
  }

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList()
    );
  }
}
