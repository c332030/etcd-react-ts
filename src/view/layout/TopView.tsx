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

const TopView: React.FC = () => {

  return (
    <>
      <Card
        className="box-card"
      >
        <Input placeholder="请输入内容"
          prepend="http://"
          append={<Button type="primary" icon="search">搜索</Button>}
        />
      </Card>
    </>
  );
};

export default TopView;
