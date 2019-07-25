import React from "react";

/*
const MoponEtcdValueView: React.FC = () => {
  return (
    <>
    </>
  );
};
*/

import {
  EtcdNode,
  EtcdValue
} from '../../entity'
import {Button, Form, Input, Message} from "element-react";

import {
  Tools
} from '@c332030/common-utils-ts'

/**
 * Prop 类型
 */
interface PropTypes {
  value?: string

  onChange: Function
}

/**
 * State 类型
 */
interface StateTypes {
}

/**
 * <p>
 *   Description: MoponEtcdValueView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-25 17:45
 */
class MoponEtcdValueView extends React.Component <PropTypes, StateTypes> {

  onChange(value: string) {

    console.log('onChange value');
    console.log(value);

    this.props.onChange(value);
  }

  onChangeOfJson(jsonValue: EtcdValue) {
    this.onChange.call(this, JSON.stringify(jsonValue));
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { value } = this.props;

    if(!value || value.charAt(0) !== '{') {
      return (
        <>
          <Form.Item label={ '值' }>
            <Input value={ value as string } onChange={ e => {
              this.setState({ value: e });
            }} />
          </Form.Item>
          <Button onClick={ () => Message.info('更新') }>更新</Button>
        </>
      )
    }

    const jsonValue: EtcdValue = JSON.parse(value);

    return (
      <>
        <Form.Item label={ '值' }>
          <Input value={ jsonValue.value } onChange={ e => {
            jsonValue.value = e ? e.currentTarget.value : '';
            this.onChangeOfJson.call(this, jsonValue);
          }} />
        </Form.Item>
        <Form.Item label={ '注释' }>
          <Input value={ jsonValue.comment } onChange={ e => {
            jsonValue.comment = e ? e.currentTarget.value : '';
            this.onChangeOfJson.call(this, jsonValue);
          }}
          />
        </Form.Item>
        <Button onClick={ () => { console.log(this.props.value) } }>更新</Button>
      </>
    );
  }
}

export default MoponEtcdValueView;
