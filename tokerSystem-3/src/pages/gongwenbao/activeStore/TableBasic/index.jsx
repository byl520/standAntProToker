import React from 'react';
import { Table, Divider, Tag, Button,Row,Col,Input,Upload,message } from 'antd';
import styles from './index.less';
import ButtonGroup from '../ButtonGroup';
const columns = [
  {
    title: '表单名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '总提交数',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '更新时间',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '有效状态',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>删除 {record.name}</a>
        <Divider type="vertical" />
        <a>报表</a>
        <Divider type="vertical" />
        <a>编辑</a>
      </span>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const { Search } = Input;
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
export default () => (
  <div className={styles.container}>
    <div 
        id="warp" 
        style={{
                paddingBottom: 20,
              }}>
          <Row>
            <Col span={6}><ButtonGroup /></Col>
              <Col span={6}>
                <Search
                  placeholder="请输入表单名称"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                  />
              </Col>
              <Col span={6}> </Col>
              <Col span={6}>
                <Upload {...props}>
                  <Button>
                    新增表单
                  </Button>
                </Upload>
              </Col>
          </Row>
        </div> 
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);
