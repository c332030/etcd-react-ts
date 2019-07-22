/**
 * <p>
 *   Description: TopView
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 15:33
 */


import React from "react";
import {Button, Card, Input} from "element-react";

interface PropTypes {
  listKey: Function
}

export class TopView extends React.Component<PropTypes, {}> {

  state = {
    url: 'work.server.c332030.com:2379'
  };

  listKey() {
    this.props.listKey(this.state.url);
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <>
        <Card
          className="box-card"
        >
          <Input placeholder="请输入内容"
            value={ this.state.url }
            prepend="http://"
            append={
              <Button type="primary" icon="search"
                onClick={ this.listKey.bind(this) }
              >查询</Button>
            }
            onChange={ (url) => {
              this.setState({
                url: url
              })
            } }
          />
        </Card>
      </>
    );
  }
}
