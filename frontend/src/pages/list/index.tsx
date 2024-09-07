/*import { Col, Row,Divider} from "antd";
function Listpages() {
  
  
  return (
    <div >
      <Row>
        <Col span={12}>
          <h2 style={{color: '#1f1f1f'}}>รายชื่อผู้พักร่วม</h2>
        </Col>
      </Row>
      
      <Divider />
      
      
    </div>
  );
}

export default Listpages;*/

import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Col, Row,Divider} from "antd";

interface DataType {
  key: string;
  name: string;
  sid: string;
  major: string;
  year: number;
  roomRate: string;
}

const columns: TableProps<DataType>['columns'] = [
  
  {
    title: '',
    dataIndex: 'key',
    key: 'key',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'รหัสนักศึกษา',
    dataIndex: 'sid',
    key: 'sid',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ชื่อ - นามสกุล',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'สำนัก',
    dataIndex: 'major',
    key: 'major',
  },
  {
    title: 'ชั้นปี',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'ค่าห้อง',
    dataIndex: 'roomRate',
    key: 'year',
  },
];

const data: DataType[] = [
  {
    key: 'A',
    name: 'John Brown',
    sid: 'B6512345',
    major: 'Engineering',
    year: 3,
    roomRate: '2,900',
  },
  {
    key: 'B',
    name: 'Jim Green',
    sid: 'B6554321',
    major: 'Engineering',
    year: 3,
    roomRate: '2,900',
  },
  {
    key: 'C',
    name: 'Joe Black',
    sid: 'B6543210',
    major: 'Engineering',
    year: 3,
    roomRate: '2,900',
  },
];

const Listpages: React.FC = () => <Table columns={columns} dataSource={data} />;

export default Listpages;
