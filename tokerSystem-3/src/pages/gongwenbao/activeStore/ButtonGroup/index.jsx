import React from 'react';
import { Button, Radio, Icon } from 'antd';
import styles from './index.less';

class ButtonSize extends React.Component {
  state = {
    size: 'large',
  };

  handleSizeChange = e => {
    this.setState({
      size: e.target.value,
    });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">全部</Radio.Button>
          <Radio.Button value="default">已启用</Radio.Button>
          <Radio.Button value="small">未启用</Radio.Button>
        </Radio.Group>  
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-button-demo-size">
      <ButtonSize />
    </div>
  </div>
);
