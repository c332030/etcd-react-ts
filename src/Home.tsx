import React from 'react';

import {
  Layout
} from 'element-react'
import 'element-theme-default';

import TopView from './view/layout/TopView';
import LeftView from './view/layout/LeftView';
import CenterView from './view/layout/CenterView';

import axiosUtils from './util/AxiosUtils';

import {
  Request
} from '@c332030/common-http-ts'
import {AxiosRequestConfig} from "axios";

class Home extends React.Component {

  state = {
    fullscreen: false
  };

  // constructor (props: Object) {
  //   super(props);
  // }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    let url = 'http://work.server.c332030.com:2379/v2/keys';

    axiosUtils.post(url, {ccc: 33}).then(e => {
      console.log(e);
    }).catch(e => {
      console.log(e);
    });

    return (
      <>
        <Layout.Row>
          <Layout.Col span={"8"} offset={'8'}>
            <TopView/>
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
