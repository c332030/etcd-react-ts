/**
 * <p>
 *   Description: LeftView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */

import {
  debug
} from '@c332030/common-utils-ts'

import React from 'react';
import {
  Button
  , Input, MessageBox
  , Notification
  , Tree
} from "element-react";

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
import {EtcdUtils, handleError, ReactTsUtils} from "../../util";
import {EtcdNodeBo} from "../../entity/bo/EtcdNodeBo";

/**
 * Prop 类型
 */
interface PropTypes {
  loading: Function
  setThis: Function

  center?: CenterView
}

interface StateTypes {
  url: string

  node: EtcdNodeBo
}

export class LeftView extends React.Component<PropTypes, StateTypes>{

  tree: Tree | null = null;

  options: TreeOptions = {
    label: 'label',
    children: 'nodes'
  };

  state: StateTypes = {
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
          dirNodes: nodes
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

    const node: EtcdNodeBo = data.data;

    resolve([]);

    if(!node) {
      return;
    }

    if(EtcdUtils.isRoot(node)) {
      node.dirNodes = [];
    }

    EtcdService.listNode(this.state.url, node).then(nodes => {

      const arr: Array<Array<EtcdNode>> = EtcdUtils.filterDirAndDataNodes(nodes);
      if(!EtcdUtils.isRoot(node)) {

        node.nodes = nodes;
        node.dirNodes = arr[0];
        resolve(node.dirNodes);
      }

      node.dataNodes = arr[1];

      this.showNode(node);
    }).catch( () => {
      resolve([]);
    });
  }

  showNode(node: EtcdNodeBo) {

    const centerView = this.props.center;

    if(!centerView) {
      return
    }

    node.url = this.state.url;
    centerView.show(node);
  }

  append(store: any, data: EtcdNodeBo) {

    MessageBox.prompt('请输入名称', '提示', {
      inputPattern: /[a-zA-Z0-9]{1,15}/
      , inputErrorMessage: '请输入以字母和数字组成的名称'
    }).then((value: any) => {

      this.props.loading(true);

      const label = value.value;

      return EtcdService.add(data, label, '', true).then(() => {

        const key = `/${label}`;
        const node: EtcdNodeBo = {
          dir: true
          , label: label
          , key: key
          , url: `${data.url}${key}`
        };

        store.append(node, data);

        Notification.success(`新增目录成功：${label}`);
      });
    }).catch(handleError).finally(() => {
      this.props.loading(false);
    });
  }

  remove(store: any, node: EtcdNodeBo) {
    debug('remove');
    debug(store);
    debug(node);

    this.props.loading(true);
    EtcdService.delete(node).then(() => {

      store.remove(node);
      Notification.success(`删除目录成功：${node.label}`);
    }).catch(handleError).finally(() => {
      this.props.loading(false);
    });
  }

  renderContent(nodeModel: any, node: EtcdNodeBo, store: any) {

    // debug('nodeModel');
    // debug(nodeModel);
    // debug('data');
    // debug(node);
    // debug('store');
    // debug(store);

    return (
      <span>
      <span>
        <span>{node.label}</span>
      </span>
      <span style={{float: 'right', marginRight: '20px'}}>
        <Button size="mini" onClick={ () => this.append(store, node) }>添加子目录</Button>
        {
          !EtcdUtils.isRoot(node) &&
          <Button size="mini" onClick={ () => this.remove(store, node) }>删除</Button>
        }
      </span>
    </span>);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    return (
      <>
        <div style={{
        }}>
          <Input placeholder="输入关键字进行过滤"
            onChange={ text => this.tree && this.tree.filter(text) }
          />
          <Tree
            ref={e => this.tree = e}
            className="filter-tree"
            data={ this.state.node.dirNodes }
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
            renderContent={ this.renderContent.bind(this) }
          />
        </div>
      </>
    );
  }
}
