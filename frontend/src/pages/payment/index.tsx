import React, { useState, useEffect } from 'react';
import { PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload, Modal, Table, QRCode, Space, Divider, Steps, UploadFile, UploadProps, TableProps, GetProp, DatePicker } from 'antd';
import Barcode from 'react-barcode'; // นำเข้า Barcode
import { SlipInterface } from "../../interfaces/Slip";
import { CreateSlip, fetchExpenses } from "./../../services/https";
import { useNavigate } from "react-router-dom";
import "./index.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const formattedDate = "2024-09-11"; // ตัวอย่างวันที่ในรูปแบบ string
const date = new Date(formattedDate); // แปลงเป็น Date

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [text] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [expenses, setExpenses] = useState<ExpenseInterface[]>([]);
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseData = await fetchExpenses();
        setExpenses(expenseData);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchData();
  }, []);

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
  if (fileList.length === 0) {
    messageApi.open({
      type: "error",
      content: "กรุณาอัพโหลดไฟล์ก่อน",
    });
    return;
  }
  
  values.Path = fileList[0].thumbUrl;

  try {
    const res = await CreateSlip(values);

    if (res) {
      messageApi.open({
        type: "success",
        content: "อัพโหลดรูปภาพสำเร็จ",
      });
      setTimeout(() => {
        navigate("/slip");
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

  

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
 
  interface ExpenseInterface {
    RentID?: number;
    ElectricityID?: number;
    WaterID?: number;
  }

  interface DataType {
    date: Date;
    list: string;
    amount: number;
    remark: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    { title: 'วันที่', dataIndex: 'date', key: 'date',render: (date: Date) => date.toLocaleDateString(), }, 
    { title: 'รายการ', dataIndex: 'list', key: 'list' },
    { title: 'จำนวน', dataIndex: 'amount', key: 'amount' },
    { title: 'หมายเหตุ', key: 'remark' }, 
  ];

  const [expense] = expenses;

  const data: DataType[] = [
    { date: new Date(), list: 'ค่าหอพัก', amount: 199, remark: '' }, //expense.RentID ?? 0, remark: '' },
    { date: new Date(), list: 'ค่าไฟฟ้า', amount: 23 , remark: '' }, //expense.ElectricityID ?? 0, remark: '' },
    { date: new Date(), list: 'ค่าน้ำ', amount:10 , remark: '' },//expense.WaterID ?? 0, remark: '' },
  ];

  useEffect(() => {
    const total = data.reduce((sum, record) => sum + record.amount, 0);
    setTotalAmount(total);
  }, [data]);

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
            <Upload
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false; // Prevent automatic upload
              }}
              maxCount={1}
              multiple={false}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>อัพโหลด</div>
              </div>
            </Upload> 
        </div>
      </div>
    </>
  );
};

export default Index;
