import React from "react";

import {
  Form
  , Input
} from "element-react";

import {
  Tools
  ,dealStrNull
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
  value?: string

  needFormatJson: boolean

  onChange: Function
}

/**
 * State 类型
 */
interface StateTypes {
  value?: string
}

/**
 * <p>
 *   Description: MoponEtcdValueView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-25 17:45
 */
class ValueView extends React.Component <PropTypes, StateTypes> {

  constructor(props: PropTypes) {
    super(props);

    this.state = {
      value: dealStrNull(this.props.value)
    };
  }

  /**
   * 更新值
   * @param value
   */
  updateValue(value: string) {
    this.setState({
      value: value
    })
  }

  onChange(value: string) {
    this.props.onChange(value);
    this.updateValue.call(this, value);
  }

  onChangeOfJson(jsonValue: EtcdValue) {
    this.onChange.call(this, JSON.stringify(jsonValue));
  }

  /**
   * 普通字符串值类型的页面
   * @param value
   */
  getValuePage(value?: string) {
    return (
      <>
        <Form.Item
          label={ Tools.get(KeyValueEnum, 'value', '值') }
        >
          <Input value={ value as string }
            onChange={ e => {
              this.onChange.bind(this)(ReactUtils.getString(e));
            }}
          />
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
            <Form.Item
              key={key}
              label={ Tools.get(KeyValueEnum, key, key) }
            >
              <Input
                value={ jsonValue[key] }
                onChange={(e) => {
                  jsonValue[key] = ReactUtils.getString(e);
                  this.onChangeOfJson.call(this, jsonValue);
                }}
              />
            </Form.Item>
          );
        })
      }
      </>
    );
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const { value } = this.state;

    let jsonData;

    try {
      if(value) {
        jsonData = JSON.parse(value);
      }
    } catch (e) {}

    // log(jsonData);

    return (
      <>
        { ( this.props.needFormatJson && jsonData)
          ? this.getJsonValuePage.call(this, jsonData)
          : this.getValuePage.call(this, value)
        }
      </>
    );
  }
}

export default ValueView;
