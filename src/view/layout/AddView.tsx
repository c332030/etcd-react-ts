import React from "react";

import {
  Button
  , Dialog
  , Form
  , Input
  , Notification
} from "element-react";

import {
  Tools
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
  setThis: Function
  onAdd: Function
}

/**
 * State 类型
 */
interface StateTypes {

  /**
   * 是否可见
   */
  visible: boolean

  /**
   * 是否为目录
   */
  isDir?: boolean

  /**
   * 键
   */
  key: string

  /**
   * 值
   */
  value?: string
}

/**
 * 值视图接口
 */
export interface IAddView {
  display: Function
}

/**
 * <p>
 *   Description: AddView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-8-5 17:04
 */
class AddView extends React.Component <PropTypes, StateTypes> {

  state: StateTypes = {
    visible: false

    ,key: ''
  };

  constructor(props: PropTypes){
    super(props);

    this.props.setThis({
      display: this.display.bind(this)
    });
  }

  display(visible: boolean, isDir?: boolean) {
    this.setState({
      visible: visible
      ,isDir: isDir
    });
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

//     const {} = this.state;

    return (
      <>
        <Dialog
          title="新增"
          size={'tiny'}
          visible={ this.state.visible }
          onCancel={ () => this.display.call(this, false) }
        >
          <Dialog.Body>
            <Form >
              <Form.Item label={ Tools.get(KeyValueEnum, 'key', '键') } labelWidth="50">
                <Input
                  value={this.state.key}
                  onChange={(value) => {
                    this.setState({
                      key: ReactUtils.getString(value)
                    })
                  }}
                />
              </Form.Item>
              {
                !this.state.isDir &&
                <Form.Item label={Tools.get(KeyValueEnum, 'value', '值')} labelWidth="50">
                  <Input
                    value={this.state.value}
                    onChange={(value) => {
                      this.setState({
                        value: ReactUtils.getString(value)
                      })
                    }}
                  />
                </Form.Item>
              }
            </Form>
          </Dialog.Body>

          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => this.display.call(this, false) }>取 消</Button>
            <Button type="primary" onClick={ () => {

              const {isDir, key, value} = this.state;

              if(!key) {
                Notification.error(`请输入${Tools.get(KeyValueEnum, 'key', '键')}`);
                return;
              }

              if(isDir && !value) {
                Notification.error(`请输入${Tools.get(KeyValueEnum, 'value', '值')}`);
                return;
              }

              this.props.onAdd(key, value, isDir);
              this.display.call(this, false)
            }}>确 定</Button>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  }
}

export default AddView;
