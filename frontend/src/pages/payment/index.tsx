import React, { useState, useEffect, useCallback } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button,Form, message, Upload, Modal, Table, QRCode, Space, Divider, Steps, UploadFile, UploadProps,TableProps,GetProp, Input} from 'antd';
import Barcode from 'react-barcode'; // นำเข้า Barcode
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import axios from 'axios';

import { StudentInterface } from "./../../interfaces/Student";
import { SlipInterface } from "../../interfaces/Slip";
import { DormInterface } from "./../../interfaces/Dorm";
import { RoomInterface } from "./../../interfaces/Room";
import { ReservationInterface } from "./../../interfaces/Reservation";
import {CreateSlip, GetListSlips, GetSlip, UpdateSlip, CreateExpense } from "./../../services/https";
import Slip from "./../adminpage/PaymentConfirmation";
import { ExpenseInterface } from '../../interfaces/Expense';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type CombinedData = ReservationInterface & StudentInterface & SlipInterface & DormInterface & RoomInterface;

const { TextArea } = Input;
const myId = localStorage.getItem("id");

const Index: React.FC = () => {
  const studentID = localStorage.getItem("studentID");
  const studentDbID = localStorage.getItem("id");

  const [text] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };



    interface DataType {
        ID: number;
        Date: Date;
        List: string;
        Amount: number;
        Remark: string;
        AdminID: string;
        ReservationID: string;
      }
      
      const columns: TableProps<DataType>['columns'] = [
        { title: 'วันที่', dataIndex: 'Date', key: 'Date',render: (date: Date) => date.toLocaleDateString(), }, 
        { title: 'รายการ', dataIndex: 'List', key: 'List' },
        { title: 'จำนวน', dataIndex: 'Amount', key: 'Amount' },
        { title: 'หมายเหตุ', key: 'Remark' }, 
      ];

      const data: DataType[] = [
        {
          Date: new Date(),
          List: 'ค่าหอพัก',
          Amount: 100,
          Remark: '',
          AdminID: '',
          ReservationID: '',
          ID: 1
        },
        {
          Date: new Date(),
          List: 'ค่าไฟฟ้า',
          Amount: 165.00,
          Remark: '',
          AdminID: '',
          ReservationID: '',
          ID: 1
        },
        {
          Date: new Date(),
          List: 'ค่าน้ำ',
          Amount: 100.00,
          Remark: '',
          AdminID: '',
          ReservationID: '',
          ID: 0
        },
      ];


      const navigate = useNavigate();
      const [messageApi, contextHolder] = message.useMessage();
      const [studentData, setStudentData] = useState<StudentInterface | null>(null);
      const [slip, setSlip] = useState<SlipInterface | null>(null);
      const [Path, setPath] = useState('');

      const [fileList, setFileList] = useState<UploadFile[]>([]);
      const [form] = Form.useForm();
      //const response = await CreateSlip({Path});


      // Model
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState<String>();
    const [deleteId, setDeleteId] = useState<Number>();

// ฟังก์ชันคำนวณยอดรวม
useEffect(() => {
  const total = data.reduce((sum, record) => {
    return sum + (record.Amount || 0); // ใช้ amount เป็น number ตรงๆ
  }, 0);
  setTotalAmount(total);
}, [data]);

/*
const getSlip = async (id: number) => {
    let res = await GetSlip(id);
    if (res.status == 200) {
      form.setFieldsValue({
        Path: res.data.Path,
        Date: res.data.Date,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลผู้ใช้",
      });
      setTimeout(() => {
        navigate("/slip");
      }, 2000);
    }
  };
*/
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
    const path = new Image();
    path.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(path.outerHTML);
  };

  const onFinish = async (values: SlipInterface) => {
    values.path = fileList[0]?.thumbUrl || "";

    const studentId = localStorage.getItem("id");
    if (studentId) {
      
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID on finish is not found.",
      });
    }
    
    let res = await CreateSlip(values);
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
      setFileList([]); // รีเซ็ตไฟล์อัปโหลด
      setTimeout(() => {
        // ตรวจสอบ URL ให้ถูกต้อง
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด!",
      });
    }
  };
  /*
  
  const onFinish = async (Path: SlipInterface) => {
    if (fileList.length === 0) {
      messageApi.open({
        type: "error",
        content: "กรุณาอัพโหลดไฟล์ก่อน",
      });
      return;
    }
    
    const file = fileList[0];
    const fileUrl = file.url || (file.originFileObj ? URL.createObjectURL(file.originFileObj) : '');

    // Make sure to use the correct URL or File path
    Path.path = fileUrl;
  
    //try {
      
      CreateExpense(Path);
      const res = await CreateSlip(Path);
      console.log(res)
      if (res) {
        messageApi.open({
          type: "success",
          content: "อัพโหลดรูปภาพสำเร็จ",
        });
        setTimeout(() => {
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ!",
        });
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ:", error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการเชื่อมต่อ!",
      });
    }
  };

  */
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // Prevent automatic upload
  setFileList([...fileList, file]);
  return false;
};

  /*useEffect(() => {
    const studentId = localStorage.getItem("id");
    if (studentId) {
      getSlip(studentId);  // Fetch repair data using studentId
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID not found.",
      });
    }
  }, []);
  */

  /*
  const handleSubmit = async () => {
    if (!fileList) {
      messageApi.open({
        type: 'error',
        content: 'กรุณาอัพโหลดรูปภาพ',
      });
      return;
    }
    try {
      const response = await CreateSlip({ Path });
  
      if (response && response.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'อัพโหลดรูปภาพสำเร็จ',
        });
        setPath('');
      } else {
        const errorMessage = response && response.data && response.data.message ? 
          response.data.message : 
          response.statusText || 'เกิดข้อผิดพลาดในการอัพโหลด';
        messageApi.open({
          type: 'error',
          content: `เกิดข้อผิดพลาดในการอัพโหลด: ${errorMessage}`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.open({
        type: 'error',
        content: `เกิดข้อผิดพลาดในการอัพโหลด: ${(error as Error).message}`,
      });
    }
  };
  */

return (
    <>
      <br />
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='text-container'>
            <div className='text-1'>แจ้งยอดชำระ</div>
        </div>
        </Space>
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
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            ยอดรวมทั้งหมด: {totalAmount.toFixed(2)} บาท
          </div>
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
              closable={false}
              className="modal-content"
              
            >
              <Space direction="vertical" align="center">
              <p className="modal-text">ธนาคาร ABC 123-4567-890</p>
                <QRCode value={text || '-'} /> 
                {/* เพิ่ม Barcode */}
              <Barcode
                value="123456789012" // แทนที่ด้วยข้อมูล Barcode ของคุณ
                format="CODE128" // กำหนดรูปแบบของ Barcode
                width={2}
                height={60}
                />
              </Space>
          </Modal>  
        <div className='text-container'>
            <div className='text-7'>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Form.Item
                    name="path"
                    label="อัพโหลดไฟล์ที่นี่"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    rules={[{ required: true, message: 'กรุณาอัพโหลดไฟล์ก่อน!' }]}
                  >
                    <Upload
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      beforeUpload={beforeUpload}
                      maxCount={1}
                      multiple={false}
                      listType="picture"
                    >
                      <Button icon={<UploadOutlined />} >Upload</Button>
                    </Upload>
                </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ backgroundColor: '#1890ff', color: 'white', borderColor: '#1890ff' }}
                    >
                      ยืนยัน
                    </Button>
                    {contextHolder}
                  </Space>
                </Form.Item>
              </Form>

          </div>
        </div>
    </>
  );
}
export default Index