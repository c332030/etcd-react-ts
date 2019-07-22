/**
 * <p>
 *   Description: LeftView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */

import React from 'react';
import {Input, Tree} from "element-react";

import AxiosUtils from '../../util/AxiosUtils'

import {
  EtcdNode
} from "../../entity";

import {
  TreeEntity
  ,TreeOptions
} from '@c332030/common-element-ui-ts'

export class LeftView extends React.Component{

  tree: Tree | null = null;

  options: TreeOptions = {
    label: 'key',
    children: 'nodes'
  };

  state: EtcdNode = {};

  constructor(props: Object){
    super(props);

    // AxiosUtils.get('');
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    return (
      <>
        <Input placeholder="输入关键字进行过滤"
          onChange={ text => this.tree && this.tree.filter(text) }
        />
        <Tree
          ref={e => this.tree = e}
          className="filter-tree"
          data={this.state.nodes}
          options={this.options}
          nodeKey="id"
          defaultExpandAll={true}
          filterNodeMethod={(value, data) => {
            if(!value) return true;
            return data.label.indexOf(value) !== -1;
          }}
        />
      </>
    );
  }
}
