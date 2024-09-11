import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload, Modal, Table, QRCode, Space, Divider, Steps, UploadFile, UploadProps, TableProps, GetProp } from 'antd';
import Barcode from 'react-barcode'; // นำเข้า Barcode
import { SlipInterface } from "../../interfaces/Slip";
import { CreateSlip } from "./../../services/https";
import { useNavigate } from "react-router-dom";
import "./index.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [text] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [slip, setSlip] = useState<SlipInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  
  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: { authorization: 'authorization-text' },
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
    { title: 'วันที่', dataIndex: 'date', key: 'date' },
    { title: 'รายการ', dataIndex: 'list', key: 'list' },
    { title: 'จำนวน', dataIndex: 'amount', key: 'amount' },
    { title: 'หมายเหตุ', key: 'remark' },
  ];

  const data: DataType[] = [
    { date: '02-05-65', list: 'ค่าหอพัก', amount: "2900.00", remark: '' },
    { date: '02-05-65', list: 'ค่าไฟฟ้า', amount: "165.00", remark: '' },
    { date: '02-05-65', list: 'ค่าน้ำ', amount: "100.00", remark: '' },
  ];

  useEffect(() => {
    const total = data.reduce((sum, record) => sum + parseFloat(record.amount || '0'), 0);
    setTotalAmount(total);
  }, [data]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: SlipInterface) => {
    console.log('Values to be sent:', values); // ตรวจสอบข้อมูลที่ส่งไป
    values.Path = fileList[0]?.thumbUrl;
    values.ID = slip?.ID;
  
    let res = await CreateSlip(values);
    console.log('Response from API:', res); // ตรวจสอบการตอบสนองจาก API
  
    if (res) {
      messageApi.open({ 
        type: "success", 
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(() => navigate("/slip"), 2000);
    } else {
      messageApi.open({ 
        type: "error", 
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };
  

  const handleSubmit = () => {
    form.submit(); // Use form.submit() to trigger form submission
  };

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
          { title: 'ยังไม่ชำระเงิน', description: '' },
          { title: 'กำลังดำเนินการ', description: '' },
          { title: 'ชำระเงินเสร็จสิ้น', description: '' },
        ]}
      />
      <Divider />
      <Table columns={columns} dataSource={data} pagination={false} />
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        ยอดรวมทั้งหมด: {totalAmount.toFixed(2)} บาท
      </div>
      <br />
      <Button type="primary" onClick={showModal}>ชำระเงินที่นี่</Button>
      <Modal 
        title="ช่องทางการชำระเงิน" 
        open={isModalOpen} 
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>Ok</Button>
        ]}
        closable={false}
        className="modal-content"
      >
        <Space direction="vertical" align="center">
          <p className="modal-text">ธนาคาร ABC 123-4567-890</p>
          <QRCode value={text || '-'} /> 
          <Barcode
            value="123456789012" 
            format="CODE128" 
            width={2}
            height={60}
          />
        </Space>
      </Modal>  
      <div className='text-container'>
        <div className='text-7'>
          <Form
            name="basic"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Upload
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => true} // อัพโหลดอัตโนมัติ
              maxCount={1}
              multiple={false}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload หลักฐานการชำระเงินที่นี่</Button>
            </Upload>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Index;
