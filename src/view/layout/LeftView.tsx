/**
 * <p>
 *   Description: LeftView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */

import React from 'react';
import {Input, Message, Tree} from "element-react";

import AxiosUtils from '../../util/AxiosUtils'

import {
  EtcdNode
} from "../../entity";

import {
  Tools
} from '@c332030/common-utils-ts'

import {
  TreeEntity
  ,TreeOptions
} from '@c332030/common-element-ui-ts'

/**
 * Prop 类型
 */
interface PropTypes {
  setThis: Function
}

export class LeftView extends React.Component<PropTypes, {}>{

  tree: Tree | null = null;

  options: TreeOptions = {
    label: 'key',
    children: 'nodes'
  };

  state = {
    url: ''
    ,node: {
      nodes: []
    }
  };

  constructor(props: PropTypes){
    super(props);

    this.props.setThis(this);

    this.listKey.bind(this);
  }

  public listKey(url: string) {
    console.log(`LeftView url= ${url}`);

    this.setState({
      url: url
    });

    AxiosUtils.post(url).then(e => {

      this.setState({
        node: {
          nodes: e.data.node.nodes
        }
      });

      Message.success('查询成功');
    }).catch(e => {

      Message.error('查询失败');
    });
  }

  public loadNode(node: any, resolve: Function) {
    console.log('node');
    console.log(node);

    console.log('resolve');
    console.log(resolve);

    const etcdNode = node.data;
    if(node.id ===0 || !etcdNode) {
      return;
    }

    AxiosUtils.post(this.state.url + etcdNode.key).then(e => {

      console.log('get key');
      console.log(e);
      resolve(Tools.dealNull(e.data.node.nodes, []));
    }).catch(e => {

      console.log('get key catch');
      console.log(e);
    });
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
          data={ this.state.node.nodes }
          options={this.options}
          nodeKey="key"
          defaultExpandAll={false}
          filterNodeMethod={(value, data) => {
            if(!value) return true;
            return data.key.indexOf(value) !== -1;
          }}

          lazy={true}
          load={ this.loadNode.bind(this) }
        />
      </>
    );
  }
}
