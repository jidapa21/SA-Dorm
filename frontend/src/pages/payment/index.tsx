import React, { useState, useEffect, useCallback } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button,Form, message, Upload, Modal, Table, QRCode, Space, Divider, Steps, UploadFile, UploadProps,TableProps,GetProp, Input} from 'antd';
import Barcode from 'react-barcode'; // นำเข้า Barcode
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import axios from 'axios';

import { StudentInterface } from "./../../interfaces/Student";
import { SlipInterface } from "../../interfaces/slip";
import { DormInterface } from "./../../interfaces/Dorm";
import { RoomInterface } from "./../../interfaces/Room";
import { ReservationInterface } from "./../../interfaces/Reservation";
import {CreateSlip, GetListSlips, GetSlip, UpdateSlip, CreateExpense, fetchExpenses, ListExpense } from "../../services/https";
import Slip from "./../adminpage/PaymentConfirmation";
import { ExpenseInterface } from '../../interfaces/Expense';
import { WaterInterface } from '../../interfaces/Waterfee';
import { RentInterface } from '../../interfaces/Rentfee';
import { ElectricityInterface } from '../../interfaces/Electricityfee';

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type CombinedData = ReservationInterface & StudentInterface & SlipInterface & DormInterface & RoomInterface & ExpenseInterface;

const { TextArea } = Input;


interface ExpenseData 
  extends StudentInterface,
  WaterInterface,
  RentInterface,
  ElectricityInterface{

  ID: number;
  Date: Date;
  status: string;
  totalamount: number;
  remark: string;
  rent_id:  number;
  elec_id:  number;
  water_id: number;
  student_id: string;
}

const Index: React.FC = () => {
      
      const studentDbID = localStorage.getItem("id");

      const [text] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [totalamount, setTotalAmount] = useState<number>(0);
      const [ExpenseData, setExpenseData] = useState<ExpenseData[]>([]);

      const showModal = () => {setIsModalOpen(true);};
      const handleOk = () => {setIsModalOpen(false);};

      const navigate = useNavigate();
      const [messageApi, contextHolder] = message.useMessage();

      const [fileList, setFileList] = useState<UploadFile[]>([]);
      const [form] = Form.useForm();
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const [student, setStudent] = useState<ExpenseData[]>([]);
      //const response = await CreateSlip({Path});

    useEffect(() => {
      const myId = localStorage.getItem("id");
      console.log("Student ID from localStorage:", myId);

      const fetchExpenses = async () => {
        try {
          const response = await ListExpense();
          console.log("Received data:", response);

           // ตรวจสอบว่า response มีคีย์ data และ data เป็น Array
          if (response && response.data && Array.isArray(response.data)) {
            const expense = response.data;
            console.log("Expense data:", expense);

            const CombinedData = expense.map((expense: any) => ({
              ID: expense.ID,
              Date: expense.Date, // แปลงเป็น Date
              totalamount: expense.totalamount,
              rent_id: expense.rent_id.amount || 0, // ใช้ rentfee แทน rent_id
              elec_id: expense.elec_id.amount || 0, // ใช้ electricityfee แทน elec_id
              water_id: expense.water_id.amount || 0, // ใช้ waterfee แทน water_id
              remark: expense.remark || "",
              student_id: expense.student_id,
            }));

        // กรองข้อมูลตาม studentID
        const filteredData = CombinedData.filter(
          (expense: ExpenseData) => expense.student_id === myId
        );

        console.log("Filtered data for student ID:", filteredData);


        if (filteredData.length === 0) {
          message.warning("ไม่พบข้อมูลสำหรับนักเรียนคนนี้");
        } else {
          
        }
        if (!myId) {
          console.error("Student ID not found in localStorage.");
          message.warning("Student ID not found.");
          return;
        }
        
            // คำนวณยอดรวมทั้งหมด
          const total = CombinedData.reduce((sum: number, expense: ExpenseData) => {
            return sum + expense.rent_id + expense.elec_id + expense.water_id;
        },0 );

        setTotalAmount(total); // ตั้งค่ายอดรวมทั้งหมด
        
        
        }else {
          message.error('ไม่พบข้อมูลค่าใช้จ่าย');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }
  };

  fetchExpenses();
}, [studentDbID]);

    const columns: TableProps<ExpenseData>['columns'] = [
      { 
        title: 'วันที่',
        dataIndex: 'Date',
        key: 'Date',
        render: (date: Date) => date.toLocaleDateString(), // แสดงวันที่ในรูปแบบที่อ่านง่าย
      },
      {
        title: 'ค่าหอพัก',
        dataIndex: 'rent_id',
        key: 'rent_id',
        render: (rent_id: number) => `${rent_id.toFixed(2)} บาท`, // แสดงจำนวนเงินที่จ่ายเป็นบาท
      },
      {
        title: 'ค่าไฟฟ้า',
        dataIndex: 'elec_id',
        key: 'elec_id',
        render: (elec_id: number) => `${elec_id.toFixed(2)} บาท`, // แสดงจำนวนเงินที่จ่ายเป็นบาท
      },
      {
        title: 'ค่าน้ำ',
        dataIndex: 'water_id',
        key: 'water_id',
        render: (water_id: number) => `${water_id.toFixed(2)} บาท`, // แสดงจำนวนเงินที่จ่ายเป็นบาท
      },
      {
        title: 'หมายเหตุ',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    console.log("Expense data state:", ExpenseData);


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

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  // Prevent automatic upload
  setFileList([...fileList, file]);
  return false;
};


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
          <Table columns={columns} dataSource={ExpenseData} />
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            ยอดรวมทั้งหมด: {totalamount.toFixed(2)} บาท
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
                <Space style={{ display: 'flex', justifyContent: '', marginTop: '20px' }}>
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