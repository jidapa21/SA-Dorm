import {
  Table,
  Tag,
} from 'antd';
import React from 'react';

interface DataType {
  ID: number;
  Subject: string;
  Type: string;
  State: string[];
}

const Index: React.FC = () => {
  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'ID',
      key: 'id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'หัวข้อ',
      dataIndex: 'Subject',
      key: 'subject',
    },
    {
      title: 'ประเภท',
      dataIndex: 'Type',
      key: 'type',
    },
    {
      title: 'สถานะ',
      dataIndex: 'State',
      key: 'state',
      render: (state: string[]) => (
        <>
          {state.map((state: string) => {
            let color: string;
            if (state === 'รอดำเนินการ') {
              color = '#bfbfbf';
            } else if (state === 'กำลังดำเนินการ') {
              color = '#1677ff';
            } else if (state === 'อนุมัติ') {
              color = '#52c41a';
            } else if (state === 'เสร็จสิ้น') {
              color = '#52c41a';
            } else {
              color = 'default';
            }
            return (
              <Tag color={color} key={state}>
                {state.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    }
  ];

  const data: DataType[] = [
    {
      id: '1',
      subject: 'ฟอร์มขออนุญาติเข้า-ออกหอพัก',
      type: 'ฟอร์มเอกสาร',
      state: ['รอดำเนินการ'],
    },
    {
      no: '2',
      subject: 'เครื่องทำน้ำอุ่นไม่ทำงาน',
      type: 'แจ้งซ่อม',
      state: ['กำลังดำเนินการ'],
    },
    {
      key: '3',
      no: '3',
      subject: 'ฟอร์มผ่อนผัน',
      type: 'ฟอร์มเอกสาร',
      state: ['อนุมัติ'],
    },
    {
      key: '4',
      no: '4',
      subject: 'อ่างล้างหน้าตัน',
      type: 'แจ้งซ่อม',
      state: ['เสร็จสิ้น'],
    }
  ];

  return (
    <>
      <br />
      <div className='text-container'>
        <div className='text-1'>ติดตามสถานะของปัญหา</div>
      </div>
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Index;
