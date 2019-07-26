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
  TreeOptions
} from '@c332030/common-element-ui-ts'

import {
  CenterView
} from "./CenterView";

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

    AxiosUtils.post(url).then(e => {

      const nodes: EtcdNode[] | undefined = Tools.get(e, 'data.node.nodes');
      if(!nodes) {

        this.props.loading(false);
        Message.error('无节点');
        return;
      }

      nodes.forEach(nodeE => {
        nodeE.label = nodeE.key ? nodeE.key.substr(1) : 'No key'
      });

      this.setState({
        node: {
          nodes: nodes
        }
      });

      this.props.loading(false);
      Message.success('查询成功');
    }).catch(e => {

      console.log(e);
      this.props.loading(false);
      Message.error('查询失败');
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

    AxiosUtils.post(this.state.url + node.key).then(e => {

      const childNodes: EtcdNode[] | undefined = Tools.get(e, 'data.node.nodes');
      if(!childNodes) {

        resolve([]);
        return
      }

      // 删除树已有的前缀
      childNodes.forEach(nodeE => {
        const keyE = nodeE.key;
        if(!keyE) {
          return;
        }

        // 处理 key 生成 label，避免 key 太长，使用 label 显示
        nodeE.label = keyE.substr(node.key.length + 1);
      });

      resolve(childNodes);
    }).catch(e => {
      console.log(e);
    });
  }

  showNode(node: EtcdNode) {

    const centerView = this.props.center;

    if(!centerView) {
      return
    }

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
