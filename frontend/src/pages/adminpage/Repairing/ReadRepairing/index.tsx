import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Divider, Spin, Alert, Select } from "antd";
import { GetRepair, UpdateRepair } from '../../../../services/https'; // Import your API functions
import { RepairInterface } from "../../../../interfaces/repairing";

const { Option } = Select;

const ReadRepairing: React.FC<{ repairId: string }> = ({ repairId }) => {
  const [formValues, setFormValues] = useState<RepairInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchRepair = async () => {
      setLoading(true);
      try {
        const response = await GetRepair(Number(repairId));
        if (response) {
          setFormValues(response);
          setStatus(response.Status);
        } else {
          setError('Failed to fetch repair details.');
        }
      } catch (e) {
        setError('An error occurred while fetching repair details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepair();
  }, [repairId]);

  const handleStatusChange = async (value: string) => {
    try {
      await UpdateRepair(repairId, { Status: value });
      setStatus(value); // อัปเดตสถานะหลังจากที่เปลี่ยน
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const imageUrl = formValues?.Image || 'https://via.placeholder.com/600x400';

  return (
    <div className="container" style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      ) : error ? (
        <Alert message={error} type="error" style={{ marginBottom: '20px' }} />
      ) : formValues ? (
        <Card title="แบบฟอร์มแจ้งซ่อม" bordered={false} style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px', color: '#666' }}>
            <p>ผู้รับบริการ: B191563 มนัสเต สวัสดิกะ</p>
            <p>อาคาร: 4 ห้อง: 414A</p>
          </div>
          <Divider />
          <Form
            name="repairing-form"
            layout="vertical"
            initialValues={formValues}
          >
            <Form.Item
              label="หัวข้อการขอรับบริการ"
              name="subject"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="ภาพประกอบ"
              name="image"
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={imageUrl}
                  alt="Image"
                  style={{ width: '100%', maxWidth: '600px', maxHeight: '400px', objectFit: 'contain' }}
                />
              </div>
            </Form.Item>
            <Form.Item
              label="รายละเอียดการขอรับบริการ"
              name="detail"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="รายละเอียดสถานที่รับบริการ"
              name="location_detail"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="หมายเหตุ"
              name="remark"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="ช่องทางติดต่อ"
              name="contact"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="ช่วงเวลาที่รับบริการ"
              name="time_slot"
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="สถานะ"
              name="status"
            >
              <Select
                value={status}
                style={{ width: '100%' }} // ขยายความกว้างของ Select ให้เต็มที่
                onChange={handleStatusChange}
              >
                <Option value="pending" style={{ backgroundColor: '#d9d9d9', color: '#333' }}>Pending</Option>
                <Option value="inProgress" style={{ backgroundColor: '#faad14', color: '#333' }}>In Progress</Option>
                <Option value="completed" style={{ backgroundColor: '#52c41a', color: '#fff' }}>Completed</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <div>ไม่มีข้อมูล</div>
      )}
    </div>
  );
};

export default ReadRepairing;