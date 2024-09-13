import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Divider, Spin, Alert, Select } from "antd";
import { GetDelayedPaymentForm ,UpdateDelayedPaymentForm} from '../../../../services/https'; // Import your API functions
import { DelayedPaymentFormInterface } from "../../../../interfaces/delayedpaymentform";
import dayjs from 'dayjs'; // Import dayjs for date formatting
const { Option } = Select;

const ReadDelayingPayment: React.FC<{ ID: string }> = ({ ID }) => {
  const [formValues, setFormValues] = useState<DelayedPaymentFormInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDelayedPaymentForm = async () => {
      setLoading(true);
      try {
        const response = await GetDelayedPaymentForm(ID);
        if (response) {
          console.log('Fetched data:', response); // Debug ข้อมูลที่ดึงมา
          setFormValues(response);
          form.setFieldsValue(response); // ตั้งค่าให้กับฟอร์มเมื่อได้ข้อมูลแล้ว
          console.log('Form values set:', form.getFieldsValue()); // Debug ข้อมูลในฟอร์ม
        } else {
          setError('Failed to fetch payment form details.');
        }
      } catch (e) {
        setError('An error occurred while fetching payment form details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDelayedPaymentForm();
  }, [ID, form]);
  const handleStatusChange = async (value: string) => {
    try {
      await UpdateDelayedPaymentForm(ID, { Status: value });
      form.setFieldsValue({ Status: value }); // อัปเดตฟอร์มเมื่อสถานะเปลี่ยน
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  const formattedDate = formValues && formValues.Due_Date ? dayjs(formValues.Due_Date).format('DD/MM/YYYY') : '';

  return (
    <div className="container">
      <Card title="แบบฟอร์มขอผ่อนผันการชำระ" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้ทำเรื่อง: B191563 มนัสเต สวัสดิกะ</p>
          <p>วันที่ปัจจุบัน: {dayjs().format('DD/MM/YYYY')}</p>
        </div>
        
        <Divider />

        {loading ? (
          <Spin tip="Loading...">
            <div style={{ minHeight: '200px' }}></div>
          </Spin>
        ) : error ? (
          <Alert message="Error" description={error} type="error" />
        ) : (
          <Form
            name="delaying-payment-form"
            layout="vertical"
            initialValues={{
              dorm_payment: formValues?.Dorm_Payment,
              electricly_bill: formValues?.Electricly_Bill,
              water_bill: formValues?.Water_Bill,
              because_of: formValues?.Because_Of,
              due_date: formattedDate,
            }}
          >
            <Form.Item
              label="ค่าหอพัก"
              name="Dorm_Payment"
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="ค่าไฟฟ้า"
              name="Electricly_Bill"
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="ค่าน้ำ"
              name="Water_Bill"
            >
              <Input readOnly />
            </Form.Item>

            <Form.Item
              label="เนื่องจาก"
              name="Because_Of"
            >
              <Input.TextArea readOnly />
            </Form.Item>

            <Form.Item
              label="ชำระภายในวันที่"
              name="Due_Date"
            >
              <Input readOnly />
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ReadDelayingPayment;
