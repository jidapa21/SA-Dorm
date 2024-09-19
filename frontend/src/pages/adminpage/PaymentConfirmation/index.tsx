import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FileImageOutlined } from '@ant-design/icons';
import { Getslipcompleted, Updateexpense ,} from '../../../services/https';
import { SlipInterface } from "../../../interfaces/slip";
import dayjs from 'dayjs';

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
  const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false); // สำหรับ modal ยืนยัน
  const [currentImage, setCurrentImage] = useState<string>('');
  const [currentRecord, setCurrentRecord] = useState<PaymentData | null>(null); // เก็บข้อมูลรายการปัจจุบัน
  const [paymentData, setPaymentData] = useState<PaymentData[]>([]);

  // Fetch slips from API when component mounts
  useEffect(() => {
    const fetchSlips = async () => {
      try {
        const slips = await Getslipcompleted();
        if (slips) {
          // กรองข้อมูลที่มีสถานะเป็น 'complet' ออก
          const formattedData = slips
            .filter((slip: any) => slip.status !== 'complet') // ทำการกรองที่มีสถานะ 'complet'
            .map((slip: any) => ({
              key: slip.ID,
              time: slip.date,
              amount: slip.totalamount,
              slip: slip.path, // This should be a valid base64 string or URL
              expenseId: slip.ex_id,
              confirmed: slip.confirmed, // เพิ่ม field confirmed ใน data
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
    const intervalId = setInterval(fetchSlips, 3000); // รีเฟรชข้อมูลทุกๆ 30 วินาที
    return () => clearInterval(intervalId); // ล้าง interval เมื่อคอมโพเนนต์ถูกทำลาย
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

  const handleConfirmClick = (record: PaymentData) => {
    setCurrentRecord(record); // เก็บข้อมูลรายการที่ต้องการยืนยัน
    setConfirmModalVisible(true); // แสดง modal เพื่อยืนยัน
  };

  const handleConfirm = async () => {
    if (!currentRecord) return;

    try {
      await Updateexpense(currentRecord.expenseId, { status: 'complet' }); // เปลี่ยนสถานะเป็น 'complet'
      
      const updatedData = paymentData.filter((item) => item.key !== currentRecord.key); // ลบรายการออกจากตาราง
      setPaymentData(updatedData);
      
      message.success(`ยืนยันการชำระเงินสำหรับรายการ ${currentRecord.key} สำเร็จ`);
      setConfirmModalVisible(false); // ปิด modal หลังจากยืนยัน
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการยืนยัน');
    }
  };

  const columns: ColumnsType<PaymentData> = [
    {
      title: <div style={{ textAlign: 'center' }}>เวลา</div>,
      dataIndex: 'time',
      key: 'time',
      render: (record: SlipInterface) => (
        <div style={{ textAlign: 'center' }}>
          {dayjs(record.date).format('DD/MM/YYYY HH:mm:ss')}
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>จำนวนเงิน</div>,
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <div style={{ textAlign: 'center' }}>{`${text} บาท`}</div>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>สลิป</div>,
      dataIndex: 'slip',
      key: 'slip',
      render: (text) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon={<FileImageOutlined />}
            onClick={() => handleViewSlip(text)}
          >
            ดูภาพ
          </Button>
        </div>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>การดำเนินการ</div>,
      key: 'action',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            disabled={record.confirmed}
            onClick={() => handleConfirmClick(record)} // เรียกใช้ modal ยืนยัน
          >
            {record.confirmed ? 'ยืนยันแล้ว' : 'ยืนยัน'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: '25px',
            fontWeight: 'bold',
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

      {/* Modal สำหรับดูสลิป */}
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

      {/* Modal สำหรับยืนยันการชำระเงิน */}
      <Modal
        visible={confirmModalVisible}
        onOk={handleConfirm} // ถ้าผู้ใช้กดยืนยัน
        onCancel={() => setConfirmModalVisible(false)} // ถ้าผู้ใช้ยกเลิก
        title="ยืนยันการดำเนินการ"
        okText="ยืนยัน"
        cancelText="ยกเลิก"
      >
        <p>คุณต้องการยืนยันการชำระเงินนี้หรือไม่?</p>
      </Modal>
    </div>
  );
};

export default PaymentConfirmation;
