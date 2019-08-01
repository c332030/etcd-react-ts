import React from "react";

import {Form, Input} from "element-react";

import {
  Tools
} from '@c332030/common-utils-ts'

import {
  KeyValueEnum
} from '@c332030/common-constant-ts'

import {
  ReactUtils
} from '@c332030/common-react-ts'

import {
  EtcdValue
} from '../../entity'

/**
 * Prop 类型
 */
interface PropTypes {
  value: string

  needFormatJson: boolean

  onChange: Function
}

/**
 * State 类型
 */
interface StateTypes {}

/**
 * <p>
 *   Description: MoponEtcdValueView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-25 17:45
 */
class MoponEtcdValueView extends React.Component <PropTypes, StateTypes> {

  constructor(props: PropTypes) {
    super(props);

    this.state = {}
  }

  onChange(value: string) {
    this.props.onChange(value);
  }

  onChangeOfJson(jsonValue: EtcdValue) {
    this.onChange.call(this, JSON.stringify(jsonValue));
  }

  /**
   * 普通字符串值类型的页面
   * @param value
   */
  getValuePage(value: string | undefined) {
    return (
      <>
        <Form.Item label={ Tools.get(KeyValueEnum, 'value') }>
          <Input value={ value as string } onChange={ e => {
            this.onChange.bind(this)(ReactUtils.getString(e));
          }} />
        </Form.Item>
      </>
    )
  }

  /**
   * json类型值的页面
   * @param jsonValue
   */
  getJsonValuePage(jsonValue: any) {
    return (
      <>
      {
        Object.keys(jsonValue).map((key: string) => {
          return (
            <Form.Item label={ Tools.get(KeyValueEnum, key) } key={ 'JsonValue.form.item.' + key }>
              <Input value={ jsonValue[key] } onChange={ (e) => {

                jsonValue[key] = ReactUtils.getString(e);
                this.onChangeOfJson.call(this, jsonValue);
              }} />
            </Form.Item>
          );
        })
      }
      </>
    );
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { value } = this.props;

    const isJson = value.charAt(0) === '{';

    return (
      <>
        { ( this.props.needFormatJson && isJson)
          ? this.getJsonValuePage.call(this, JSON.parse(value))
          : this.getValuePage.call(this, value)
        }
      </>
    );
  }
}

export default MoponEtcdValueView;
