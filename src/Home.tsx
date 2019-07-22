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


class Home extends React.Component {

  state = {
    fullscreen: false,

    view: {
      top: null
      ,left: null
      ,center: null
    }
  };

  constructor(props: Readonly<any>) {
    super(props);

    this.listKey.bind(this);
  }

  listKey() {

  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    let url = 'http://work.server.c332030.com:2379/v2/keys';

    // axiosUtils.post(url, {ccc: 33}).then(e => {
    //   console.log(e);
    // }).catch(e => {
    //   console.log(e);
    // });

    return (
      <>
        <Layout.Row>
          <Layout.Col span={"8"} offset={'8'}>
            <TopView listKey={ this.listKey } />
          </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span={"4"} offset={'4'}>
            <LeftView/>
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
