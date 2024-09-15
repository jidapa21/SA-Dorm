import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FileImageOutlined } from '@ant-design/icons';
import { GetListSlips, Updateexpense } from '../../../services/https';

interface PaymentData {
  key: string;
  time: string;
  amount: number;
  slip: string;
  confirmed?: boolean;
  expenseId: number; // เพิ่มฟิลด์นี้เพื่อเชื่อมกับ expenses
}

const PaymentConfirmation: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]); // เปลี่ยนเป็น state ที่ดึงข้อมูลจาก API

  // ดึงข้อมูลสลิปจาก API เมื่อโหลด component
  useEffect(() => {
    const fetchSlips = async () => {
      const slips = await GetListSlips();
      if (slips) {
        const formattedData = slips.map((slip: any) => ({
          key: slip.ID,
          time: slip.Date, // แสดงเวลา
          amount: slip.Totalamount, // แสดงจำนวนเงินที่จ่าย
          slip: slip.Path, // URL สำหรับสลิป
          expenseId: slip.ExpenseID,
        }));
        setPaymentData(formattedData);
      } else {
        message.error('ไม่สามารถดึงข้อมูลสลิปได้');
      }
    };
    fetchSlips();
  }, []);

  const handleViewSlip = (url: string) => {
    if (url) {
      setCurrentImage(url);
      setVisible(true);
    } else {
      console.error('URL ของสลิปไม่ถูกต้อง');
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setCurrentImage('');
  };

  const handleConfirm = async (key: string, expenseId: number) => {
    // อัปเดตสถานะใน expenses
    try {
      await Updateexpense(expenseId, { status: 'confirmed' });
      // อัปเดตใน state หลังจากอัปเดตสำเร็จ
      const updatedData = paymentData.map((item) =>
        item.key === key ? { ...item, confirmed: true } : item
      );
      setPaymentData(updatedData);
      message.success(`ยืนยันการชำระเงินสำหรับรายการ ${key} สำเร็จ`);
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการยืนยัน');
    }
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: 'เวลา',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'จำนวนเงิน',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `${text} บาท`,
    },
    {
      title: 'สลิป',
      dataIndex: 'slip',
      key: 'slip',
      render: (text) => (
        <Button
          icon={<FileImageOutlined />}
          onClick={() => handleViewSlip(text)}
        >
          ดูภาพ
        </Button>
      ),
    },
    {
      title: 'การดำเนินการ',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          disabled={record.confirmed}
          onClick={() => handleConfirm(record.key, record.expenseId)} // ส่ง expenseId ไปด้วย
        >
          {record.confirmed ? 'ยืนยันแล้ว' : 'ยืนยัน'}
        </Button>
      ),
    },
  ];
  

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
            position: 'relative',
            paddingBottom: '10px',
          }}
        >
          การยืนยันการชำระเงิน
        </span>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderBottom: '3px solid #000',
          }}
        />
      </div>

      <Table
        dataSource={paymentData}
        columns={columns}
        pagination={false}
        bordered
        style={{ marginBottom: '20px' }}
      />
      <Modal
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        width={600}
      >
        <img
          alt="Slip"
          style={{ width: '100%', height: 'auto' }}
          src={currentImage}
        />
      </Modal>
    </div>
  );
};

export default PaymentConfirmation;
