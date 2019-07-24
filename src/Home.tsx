import React from 'react';

import {
  Layout
} from 'element-react'
import 'element-theme-default';

import {
  TopView
  ,LeftView
  ,CenterView
} from './view/layout';

import axiosUtils from './util/AxiosUtils';

import {
  Tools
} from '@c332030/common-utils-ts'

import {
  Request
} from '@c332030/common-http-ts'

import {AxiosRequestConfig} from "axios";

interface StateTypes {
  fullscreen?: boolean

  view: {
    top?: TopView
    left?: LeftView
    CenterView?: CenterView
  }
}

class Home extends React.Component {

  state: StateTypes = {
    view: {}
  };

  setLeft(_this: LeftView){
    this.setState({
      view: {
        left: _this
      }
    });
  }

  listKey(url: string) {
    console.log(`是吧 url= ${url}`);

    let left: LeftView | undefined = this.state.view.left;
    left && left.listKey(url);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    return (
      <>
        <Layout.Row>
          <Layout.Col span={"8"} offset={'8'}>
            <TopView listKey={ this.listKey.bind(this) } />
        </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span={"4"} offset={'4'}>
            <LeftView setThis={this.setLeft.bind(this)} />
          </Layout.Col>
          <Layout.Col span={"8"}>
            <CenterView/>
          </Layout.Col>
        </Layout.Row>
      </>
    );
  }
}

export default Home;
