import React from 'react';
import { Table, Divider, Tag ,Row, Col,DatePicker,Input,Button,Select} from 'antd';
import styles from './index.less';
const { Option } = Select;
const { Search } = Input;
const columns = [
  {
    title: '文章标题',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '来源',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '状态',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    key: 'createtime',
  },
  {
    title: '发布时间',
    dataIndex: 'pushtime',
    key: 'pushtime',
  },
  {
    title: '分享次数',
    dataIndex: 'pushtime',
    key: 'pushtime',
  },
  {
    title: '发布时间',
    dataIndex: 'pushtime',
    key: 'pushtime',
  },
  
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];
const { RangePicker} = DatePicker;
function onChange(date, dateString) {
  console.log(date, dateString);
}
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
export default () => (
  <div className={styles.container}>
    <div style={{
      paddingBottom:20
    }}>
      <Row>
        <Col span={6}>
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Option value="jack">全部</Option>
            <Option value="lucy">已发布</Option>
            <Option value="disabled">待发布</Option>
            <Option value="Yiminghe">已下架</Option>
          </Select>
        </Col>
        <Col span={6}><RangePicker onChange={onChange} /></Col>
        <Col span={6}><RangePicker onChange={onChange} /></Col>
        <Col span={6}> 
        <Search
          placeholder="请输入文章标题"
          style={{ width: 200,marginRight:10 }}
        />
        <Button type="default">自定义添加</Button>
        </Col>
      </Row>
    </div>
     
    <div id="components-table-demo-basic">
      <Table columns={columns} dataSource={data} />
    </div>
  </div>
);
