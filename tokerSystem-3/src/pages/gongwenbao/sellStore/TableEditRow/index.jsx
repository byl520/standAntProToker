import React from 'react';
import { Table, Input, InputNumber, Popconfirm, Form,Row, Col,Button,Divider } from 'antd';
import styles from './index.less';

const data = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }

    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            style={{
              margin: 0,
            }}
          >
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      editingKey: '',
    };
    this.columns = [
      {
        title: '话术名',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: '文字数量',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: '更新时间',
        dataIndex: 'address',
        width: '10%',
        editable: true,
      },
      {
        title: '最后编辑人',
        dataIndex: 'final',
        width: '17%',
        editable: false,
      },
      {
        title: '分享次数',
        dataIndex: 'sharetime',
        width: '17%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{
                      marginRight: 8,
                    }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <div>
              <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              编辑
            </a>
             <Divider type="vertical" />
             <a>删除</a>
            </div>
            
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({
      editingKey: '',
    });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
          data: newData,
          editingKey: '',
        });
      } else {
        newData.push(row);
        this.setState({
          data: newData,
          editingKey: '',
        });
      }
    });
  }

  edit(key) {
    this.setState({
      editingKey: key,
    });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const { Search } = Input;
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div>
        <div style={{
          paddingBottom:20
        }}>
          <Row>
            <Col span={6}> </Col>
            <Col span={6}> </Col>
            <Col span={6}>
              <Search
                placeholder="请输入话术名称"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              /></Col>
            <Col span={6}><Button>新增话术</Button></Col>
          </Row>
        </div>
        
        <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
      </div>
      
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);
export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-row">
      <EditableFormTable />
    </div>
  </div>
);
