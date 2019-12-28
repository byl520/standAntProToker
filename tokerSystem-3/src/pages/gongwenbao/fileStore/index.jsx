import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Progress,Row, Col } from 'antd';
import styles from './index.less';

import TableRowSelectionAndOperation from './TableRowSelectionAndOperation';
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
         <PageHeaderWrapper className={styles.main}>
            <div
              style={{
                width: 170,
              }}
            >
              <Progress percent={30} size="small" />
            </div>
            
            <TableRowSelectionAndOperation />
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Spin spinning={loading} size="large"></Spin>
            </div>
        </PageHeaderWrapper>
        
    </div>
  );
};
