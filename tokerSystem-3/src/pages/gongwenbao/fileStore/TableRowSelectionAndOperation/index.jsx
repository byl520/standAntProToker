import React from 'react';
import { Table, Button,Row,Col,Input,Upload,message,Divider} from 'antd';
import styles from './index.less';
import ButtonGroup from '../ButtonGroup';
//定义表单字段
const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
  },
  {
    title: '来源',
    dataIndex: 'age',
  },
  {
    title: '大小',
    dataIndex: 'address',
  },
  {
    title: '更新时间',
    dataIndex:'',
    sorter: true,
    valueType: 'dateTime',
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => (
      <>
        <a
          onClick={() => {
            handleUpdateModalVisible(true);
            setStepFormValues(record);
          }}
        >
          配置
        </a>
        <Divider type="vertical" />
        <a href="">订阅警报</a>
      </>
    ),
  },
];
const data = [];
const { Search } = Input;
//模拟数据
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class App extends React.Component {
  state = {
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({
      loading: true,
    }); // ajax request after empty completing

    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys,
    });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
    return (
      <div>
        <div 
        id="warp" 
        style={{
                padding: 20,
              }}>
          <Row>
            <Col span={6}><ButtonGroup /></Col>
              <Col span={6}>
                <Search
                  placeholder="请输入文件名称"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                  />
              </Col>
              <Col span={6}> </Col>
              <Col span={6}>
                <Upload {...props}>
                  <Button>
                    上传文件
                  </Button>
                </Upload>
              </Col>
          </Row>
        </div> 
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        <div
        style={{
          paddingBottom: 20,
        }}> 
        
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            批量删除
          </Button>  
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `已选择 ${selectedRowKeys.length} 个` : ''}
          </span>
        </div>
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-row-selection-and-operation">
      <App />
    </div>
  </div>
);
