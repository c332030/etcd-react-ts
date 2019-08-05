/**
 * <p>
 *   Description: TopView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */


import React from "react";
import {Button, Input, Select} from "element-react";

import {
  log
} from '@c332030/common-utils-ts'


interface PropTypes {
  setThis: Function
  loading: Function

  listKey: Function
}

export class TopView extends React.Component<PropTypes, {}> {

  state = {
    prepend: 'http://'
    ,append: '/v2/keys'

    // ,url: 'localhost'
    ,url: 'config.work.c332030.com'
    ,port: '2379'

    ,schemes: [
      'http://'
      ,'https://'
    ]
  };

  constructor(props: PropTypes) {
    super(props);

    this.props.setThis(this);
  }

  public listKey() {

    log('listKey');

    this.props.loading(true);

    this.props.listKey(
      this.state.prepend
      + this.state.url
      + ':'
      + this.state.port
      + this.state.append
    );
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <>
        <Input placeholder="请输入内容"
          style={{
            width: '18rem'
          }}
          value={ this.state.url }
          prepend={
            <Select value={ this.state.prepend }
              style={ { width: '5.5rem' } }
              onChange={ e => this.setState({prepend: e}) }
            >
              {
                this.state.schemes.map((scheme, index) =>
                  <Select.Option key={index} label={scheme} value={scheme} />
                )
              }
            </Select>
          }
          onChange={ (url) => {
            this.setState({
              url: url
            })
          } }
        />
        <span> : </span>
        <Input
          style={{
            width: '4rem'
          }}
          value={ this.state.port }
          onChange={ e => this.setState({port: e}) }
        />
        <span> / </span>
        <Input
          style={{
            width: '6rem'
          }}
          value={ this.state.append }
          onChange={ e => this.setState({append: e}) }
        />
        <span> </span>
        <Button type="primary" icon="search"
          onClick={ this.listKey.bind(this) }
        >查询</Button>
      </>
    );
  }
}
