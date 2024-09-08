import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Col, Row,Divider} from "antd";
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
      <br />
      <div className="flex">
        <div className='text-topic'>รายชื่อผู้พักร่วม</div>
        <div className="text-right">Non-Air Conditioner</div>
      </div>
      <br />
      <Divider />
      <div className="flex">
        <div className='box'>ห้อง 4100</div>
        <div className='text-sub'>ปีการศึกษา 1/2565</div>
      </div>
      <Divider />
      <div className='text-container'></div>  
        <Table columns={columns} dataSource={data} pagination={false} />
      <br/>
    </>
  );
  
}


export default Booking;
