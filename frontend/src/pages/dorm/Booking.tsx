//import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Col, Row,Divider} from "antd";
import { Button, Flex } from 'antd';
import "./Bsub.css";


const Booking: React.FC = () => {
  
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
  
  return (
    <>
      <Row className="row-container" >
        <Col><h2 style={{ color: '#1f1f1f' }}>รายชื่อผู้จองร่วม</h2></Col>
        <Col><h2 className="heading-red">Non-Air conditioner</h2></Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <div className="box">ห้อง 4100</div>
        </Col>
        <Col>
          <div className="text-sub">ปีการศึกษา 1/2565</div>
        </Col>
      </Row>
      <Divider />
      <div className='text-container'></div>  
        <Table columns={columns} dataSource={data} pagination={false} />
      <br/>
      <div className="flex-right">
        <Button className="custom-button dashed-button " type="dashed">ยกเลิก</Button>
        <Button className="custom-button primary-button" type="primary">ยืนยัน</Button>
      </div>
    </>
  );
}

export default Booking;