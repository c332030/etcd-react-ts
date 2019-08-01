/**
 * <p>
 *   Description: LeftView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */

import React from 'react';
import {Input, Notification, Tree} from "element-react";

import {
  AxiosResponse
} from 'axios';

import {
  TreeOptions
} from '@c332030/common-element-ui-ts'

import {
  EtcdNode
} from "../../entity";

import {
  CenterView
} from "./CenterView";

import {EtcdService} from "../../service";

/**
 * Prop 类型
 */
interface PropTypes {
  loading: Function
  setThis: Function

  center?: CenterView
}

export class LeftView extends React.Component<PropTypes, {}>{

  tree: Tree | null = null;

  options: TreeOptions = {
    label: 'label',
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

  /**
   * 加载 key 树
   * @param url Edcd 链接
   */
  public listKey(url: string) {
    // console.log(`LeftView url= ${url}`);

    this.setState({
      url: url
    });

    this.props.loading(true);

    EtcdService.list(url).then((nodes: Array<EtcdNode>) => {

      this.props.loading(false);

      this.setState({
        node: {
          nodes: nodes
        }
      });
    }).catch((err: AxiosResponse | string) => {

      this.props.loading(false);

      if(typeof err !== 'string') {
        Notification.error('查询失败');
        return;
      }

      Notification.error(err);
    });
  }

  /**
   * 懒加载节点
   * @param data 节点
   * @param resolve 加载子节点的函数
   */
  public loadNode(data: any, resolve: Function) {

    const node = data.data;

    if(!node || node.id === 0) {
      resolve([]);
      return;
    }

    if(!node.dir) {

      resolve([]);
      return;
    }

    EtcdService.listNode(this.state.url, node).then(nodes => {
      resolve(nodes);
    }).catch( () => {
      resolve([]);
    });
  }

  showNode(node: EtcdNode) {

    const centerView = this.props.center;

    if(!centerView) {
      return
    }

    node.url = this.state.url;
    centerView.showNode(node);
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
          options={ this.options }
          nodeKey="key"
          defaultExpandAll={false}
          highlightCurrent={ true }
          filterNodeMethod={(value, data) => {
            if(!value) return true;
            return data.key.indexOf(value) !== -1;
          }}

          lazy={ true }
          load={ this.loadNode.bind(this) }

          onNodeClicked={ this.showNode.bind(this) }
        />
      </>
    );
  }
}
