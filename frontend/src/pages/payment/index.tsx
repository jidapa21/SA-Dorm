import React, { useState } from 'react';
//import { NavLink ,Link} from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Modal, Table, QRCode, Space } from 'antd';
import type { TableProps } from 'antd';
import type { UploadProps } from 'antd';
import { Divider, Steps } from 'antd';
//import JsBarcode from 'jsbarcode';
//import qrcode from "../../assets/QR_code.png"
//import barcode from "../../assets/Barcode.png"
import "./index.css";


const Index: React.FC = () => {

  const [text] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
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
    interface DataType {
        date: string;
        list: string;
        amount: string;
        remark: string;
      }
      
      const columns: TableProps<DataType>['columns'] = [
        {
          title: 'วันที่',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'รายการ',
          dataIndex: 'list',
          key: 'list',
        },
        {
          title: 'จำนวน',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'หมายเหตุ',
          key: 'remark',
        },
      ];
      
      const data: DataType[] = [
        {
            date: '02-05-65',
            list: 'ค่าหอพัก',
            amount: "2900.00",
            remark: '',
        },
        {
          date: '02-05-65',
          list: 'ค่าไฟฟ้า',
          amount: "165.00",
          remark: ''
        },
        {
            date: '02-05-65',
            list: 'ค่าน้ำ',
            amount: "100.00",
            remark: ''
        },
        {
            date: '',
            list: 'รวม',
            amount: "3165.00",
            remark: ''
        },
      ];
      

return (
    <>
      <br />
        <div className='text-container'>
            <div className='text-1'>แจ้งยอดชำระ</div>
        </div>
        <Steps
      progressDot
      current={1}
      items={[
        {
          title: 'ยังไม่ชำระเงิน',
          description: '',
        },
        {
          title: 'กำลังดำเนินการ',
          description: '',
        },
        {
          title: 'ชำระเงินเสร็จสิ้น',
          description: '',
        },
      ]}
    />
    <Divider />
        <div className='text-container'></div>  
          <Table columns={columns} dataSource={data} pagination={false} />
        <br/>
          <Button type="primary" onClick={showModal}>
            ชำระเงินที่นี่
          </Button>
          <Modal 
            title="ช่องทางการชำระเงิน" 
            open={isModalOpen} 
            footer={[
                <Button key="ok" type="primary" onClick={handleOk}>
                  Ok
                </Button>
              ]}
              className="modal-content"
            >
              <Space direction="vertical" align="center">
                <QRCode value={text || '-'} /> 
              </Space>
              <p className="modal-text">123-4567-890</p>
              <p className="modal-text">ธนาคาร ABC</p>
          </Modal>  


        <div className='text-container'>
            <div className='text-6'>Upload หลักฐานการชำระเงินที่นี่</div>
        </div>
        <div className='text-container'>
            <div className='text-7'>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
                </Upload>
            </div>
          </div>
    </>
  );
}
export default Index