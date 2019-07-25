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
import {Card, Form, Input} from "element-react";
import MoponEtcdValueView from "../mopon/MoponEtcdValueView";

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
  form: {
    value?: string
  }
}

export class CenterView extends React.Component<PropTypes, StateTypes> {

  state:StateTypes = {
    node: {}
    ,form: {}
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
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { node } = this.state;

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
          <div>
            <span>节点类型：{ node.dir ? '目录' : '数据' }</span>
          </div>
          <Form labelWidth={ '4rem' } labelPosition={ 'right' }>
            <Form.Item label={ '键' }>
              <Input value={ node.key } readOnly={ true } />
            </Form.Item>
            <MoponEtcdValueView value={ node.value } onChange={ (value: string) => {
              this.setState({form: {value: value}})
            }} />
          </Form>
        </Card>
      </>
    );
  }
}
