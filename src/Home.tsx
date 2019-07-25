import React from 'react';

import {
  Layout, Loading
} from 'element-react'
import 'element-theme-default';

import {
  TopView
  ,LeftView
  ,CenterView
} from './view/layout';

/**
 * Props 类型定义
 */
interface PropsTypes {

}

/**
 * State 类型定义
 */
interface StateTypes {
  loading?: boolean

  view: {
    top?: TopView
    left?: LeftView
    center?: CenterView
  }
}

class Home extends React.Component<PropsTypes, StateTypes> {

  state: StateTypes = {
    loading: false
    ,view: {}
  };

  /**
   * 全屏加载页面
   * @param loading
   */
  loading(loading: boolean) {
    this.setState({
      loading: loading
    });
  }

  setLeft(_this: LeftView){
    /* eslint-disable */
    this.state.view.left = _this;
    /* eslint-enable */
  }

  setCenter(_this: CenterView){
    /* eslint-disable */
    this.state.view.center = _this;
    /* eslint-enable */
  }

  listKey(url: string) {
    // console.log(`是吧 url= ${url}`);

    let left: LeftView | undefined = this.state.view.left;
    left && left.listKey(url);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    return (
      <>
        { this.state.loading && <Loading fullscreen={ true } /> }
        <Layout.Row>
          <Layout.Col span={"8"} offset={'8'}>
            <TopView listKey={ this.listKey.bind(this) } loading={ this.loading.bind(this) } />
        </Layout.Col>
        </Layout.Row>
        <Layout.Row>
          <Layout.Col span={"6"} offset={'2'}>
            <LeftView setThis={this.setLeft.bind(this)} center={ this.state.view.center } loading={ this.loading.bind(this) } />
          </Layout.Col>
          <Layout.Col span={"8"}>
            <CenterView setThis={ this.setCenter.bind(this) } loading={ this.loading.bind(this) } />
          </Layout.Col>
        </Layout.Row>
      </>
    );
  }
}

export default Home;
