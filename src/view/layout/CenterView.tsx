/**
 * <p>
 *   Description: CenterView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 16:26
 */
import React from "react";

import {
  Button
  , Form
  , Input
  , Notification, Switch
} from "element-react";

import {
  EtcdNode
} from '../../entity'

import MoponEtcdValueView from "../mopon/MoponEtcdValueView";

import {
  Tools
  ,StringUtils

  ,log
} from '@c332030/common-utils-ts'

import {
  KeyValueEnum
} from '@c332030/common-constant-ts'

import {
  ReactUtils
} from '@c332030/common-react-ts'

import {
  EtcdUtils
  , handleError,
} from "../../util";
import {EtcdService} from "../../service";

/**
 * Prop 类型
 */
interface PropTypes {
  loading: Function
  setThis: Function

  refresh: Function
}

/**
 * State 类型
 */
interface StateTypes {

  /**
   * 节点
   */
  node: EtcdNode

  key: string
  value: string

  /**
   * 是否需要转换 JSON
   */
  needFormatJson: boolean

  /**
   * 是否操作目录
   */
  operateDir: boolean
}

export class CenterView extends React.Component<PropTypes, StateTypes> {

  state: StateTypes = {
    node: {}

    ,key: ''
    ,value: ''

    ,needFormatJson: true
    ,operateDir: false
  };

  constructor(props: PropTypes) {
    super(props);

    this.props.setThis(this);

    this.showNode.bind(this);
  }

  showNode(node?: EtcdNode) {

    if(!node) {
      this.setState({
        node: {}
      });
      return;
    }

    this.setState({
      node: node

      ,key: EtcdUtils.isDir(node) ? '' : StringUtils.dealNull(node.key)
      ,value: StringUtils.dealNull(node.value)
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { node, key, value } = this.state;

    if(Object.keys(node).length === 0) {
      return (
        <>
          <span>请选择节点</span>
        </>
      );
    }

    const isDir = EtcdUtils.isDir(node);

    return (
      <>
        <div style={{ paddingBottom: '1rem' }}>
          <span>节点类型：{ isDir ? '目录：' + node.key : '数据' }</span>
        </div>
        <Form labelWidth={ '100' } labelPosition={ 'right' }>

          <div style={{
            display: 'flex'
          }}>
            <Form.Item label={ '转换 JSON' }>
              <Switch
                value={ this.state.needFormatJson }
                onColor="#13ce66"
                offColor="#ff4949"
                onChange={ value => {
                  this.setState({
                    needFormatJson: !!value
                  })
                } }
              />
            </Form.Item>
            <Form.Item label={ '操作目录' }>
              <Switch
                value={ this.state.operateDir }
                onColor="#13ce66"
                offColor="#ff4949"
                onChange={ value => {
                  this.setState({
                    operateDir: !!value
                  })
                } }
              />
            </Form.Item>
          </div>

          <Form.Item label={ Tools.get(KeyValueEnum, 'key') }>
            <Input value={ key } readOnly={ !isDir } onChange={ e => {
              this.setState({ key: ReactUtils.getString(e) });
            }} />
          </Form.Item>

          {
            !this.state.operateDir &&
            <MoponEtcdValueView
              value={ value }
              needFormatJson={ this.state.needFormatJson }
              onChange={ (value: string) => {
                this.setState({value: value})
              }}
            />
          }

          <div style={{
            marginLeft: '4rem'
          }}>
            {
              isDir &&
              <Button onClick={ () => {

                EtcdService.add(
                  this.state.node
                  ,this.state.key
                  ,this.state.value
                  ,this.state.operateDir
                ).then(() => {

                  Notification.success(`新增${this.state.operateDir ? '目录' : '值' }成功`);

                  this.props.refresh();
                }).catch(handleError);
              }} >添加{ this.state.operateDir ? '目录' : '值' }</Button>
            }

            {
              !this.state.operateDir && !isDir &&
              <Button onClick={ () => {

                EtcdService.update(
                  this.state.node
                  ,this.state.value
                ).then(() => {

                  Notification.success('更新成功');

                  this.props.refresh();
                }).catch(handleError);
              }}>更新</Button>
            }

            {
              (
                (!isDir && !this.state.operateDir)
                || (isDir && this.state.operateDir && !EtcdUtils.isRoot(node))
              ) &&
              <Button onClick={ () => {

                EtcdService.delete(
                  this.state.node
                ).then(() => {

                  Notification.success(`删除${this.state.node.dir ? '目录' : '值' }成功：${this.state.node.key}`);

                  this.props.refresh();
                  this.showNode();
                }).catch(handleError);
              }}>删除{ isDir && '目录' }</Button>
            }
          </div>
        </Form>
      </>
    );
  }
}
