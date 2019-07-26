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
  EtcdNode
} from '../../entity'
import {Button, Card, Form, Input} from "element-react";

import MoponEtcdValueView from "../mopon/MoponEtcdValueView";

import {
  Tools
  ,StringUtils
} from '@c332030/common-utils-ts'

import {
  KeyValueEnum
} from '@c332030/common-constant-ts'

import {
  ReactUtils
} from '@c332030/common-react-ts'


/**
 * Prop 类型
 */
interface PropTypes {
  loading: Function
  setThis: Function
}

/**
 * State 类型
 */
interface StateTypes {
  node: EtcdNode

  key: string
  value: string
}

export class CenterView extends React.Component<PropTypes, StateTypes> {

  state:StateTypes = {
    node: {}

    ,key: ''
    ,value: ''
  };

  constructor(props: PropTypes) {
    super(props);

    this.props.setThis(this);

    this.showNode.bind(this);
  }

  showNode(node: EtcdNode) {

    if(!node) {
      return;
    }

    this.setState({
      node: node

      ,key: node.dir ? '' : StringUtils.dealNull(node.key)
      ,value: StringUtils.dealNull(node.value)
    });
  }

  private onAdd(){
    console.log('onAdd');
    console.log(`add key= ${ this.state.key }`);
    console.log(`add value= ${ this.state.value }`);
  }

  private onUpdate(){
    console.log('onUpdate');
    console.log(`update key= ${ this.state.node.key }`);
    console.log(`update value= ${ this.state.value }`);
  }

  private onDelete(){
    console.log('onUpdate');
    console.log(`delete key= ${ this.state.node.key }`);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { node, key, value } = this.state;

    if(Object.keys(node).length === 0) {
      return (
        <>
          <Card>
            <span>请选择节点</span>
          </Card>
        </>
      );
    }

    return (
      <>
        <Card>
          <div style={{ paddingBottom: '1rem' }}>
            <span>节点类型：{ node.dir ? '目录：' + node.key : '数据' }</span>
          </div>
          <Form labelWidth={ '60' } labelPosition={ 'right' }>
            <Form.Item label={ Tools.get(KeyValueEnum, 'key') }>
              <Input value={ key } readOnly={ !node.dir } onChange={ e => {
                this.setState({ key: ReactUtils.getString(e) });
              }} />
            </Form.Item>
            <MoponEtcdValueView value={ value }
              onChange={ (value: string) => {
                this.setState({value: value})
              }}
            />
            { node.dir && <Button onClick={ this.onAdd.bind(this) } >添加</Button> }
            <Button onClick={ this.onUpdate.bind(this) }>更新</Button>
            <Button onClick={ this.onDelete.bind(this) }>删除</Button>
          </Form>
        </Card>
      </>
    );
  }
}
