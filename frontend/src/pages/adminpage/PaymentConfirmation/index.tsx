import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FileImageOutlined } from '@ant-design/icons';
import { GetListSlips, Updateexpense } from '../../../services/https';

interface PaymentData {
  key: string;
  time: string;
  amount: number;
  slip: string; // This should be a base64 string or a valid URL
  confirmed?: boolean;
  expenseId: number;
}

const PaymentConfirmation: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);

  // Fetch slips from API when component mounts
  useEffect(() => {
    const fetchSlips = async () => {
      try {
        const slips = await GetListSlips();
        if (slips) {
          const formattedData = slips.map((slip: any) => ({
            key: slip.ID,
            time: slip.date,
            amount: slip.totalamount,
            slip: slip.path, // This should be a valid base64 string or URL
            expenseId: slip.ex_id,
          }));
          setPaymentData(formattedData);
        } else {
          message.error('ไม่สามารถดึงข้อมูลสลิปได้');
        }
      } catch (error) {
        message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
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
    try {
      await Updateexpense(expenseId, { status: 'complet' }); // เปลี่ยนสถานะเป็น 'complet'
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
          onClick={() => handleConfirm(record.key, record.expenseId)}
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
