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

interface Props {
  listKey: Function
}

export class TopView extends React.Component<Props, {}> {

  state = {
    url: ''
  };

  constructor(props: Props) {
    super(props);

    this.listKey.bind(this);
    this.setUrl.bind(this);
  }

  listKey() {

  }

  setUrl(event: React.SyntheticEvent<HTMLInputElement>){

    console.log(event);

    // this.setState({
    //   url: url
    // });
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
                onClick={ this.listKey }
              >查询</Button>
            }
            onChange={ this.setUrl }
          />
        </Card>
      </>
    );
  }
}
