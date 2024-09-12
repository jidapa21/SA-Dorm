import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Divider, Row, Col, Spin, Alert } from "antd";
import { GetResignationForm } from '../../../../services/https'; // Import your API functions
import { ResigningFormInterface } from "../../../../interfaces/ResigningForm";
import dayjs from 'dayjs'; // Import dayjs for date formatting

const ReadResignationForm: React.FC<{ ID: string }> = ({ ID }) => {
  const [formValues, setFormValues] = useState<ResigningFormInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadResignationForm = async () => {
      setLoading(true);
      try {
        const response = await GetResignationForm(ID);
        if (response) {
          setFormValues(response);
        } else {
          setError('Failed to fetch resignation form details.');
        }
      } catch (e) {
        setError('An error occurred while fetching resignation form details.');
      } finally {
        setLoading(false);
      }
    };

    fetchReadResignationForm();
  }, [ID]);

  // Format current date
  const formattedDate = dayjs().format('DD/MM/YYYY');

  // Default values for the form
  const defaultValues: ResigningFormInterface = {
    Name: '',
    Date: new Date(),
    Because_Of: '',
    Accommodation: '',
    Status: '',
    AdminID: '',
    ReservationID: ''
  };

  return (
    <div className="container">
      <Card title="แบบฟอร์มลาออกหอพัก" bordered={false} style={{ width: '100%' }}>
        <div className="form-header">
          <p>ผู้ทำเรื่อง: B191563 มนัสเต สวัสดิกะ</p>
          <p>วันที่ปัจจุบัน: {formattedDate}</p>
        </div>

        {loading ? (
          <Spin tip="Loading...">
            <div style={{ minHeight: '200px' }}></div>
          </Spin>
        ) : error ? (
          <Alert message="Error" description={error} type="error" />
        ) : (
          <Form
            name="resignation-form"
            layout="vertical"
            initialValues={formValues || defaultValues} // Use default values if formValues is null
          >
            <Form.Item
              label="เหตุผลที่ลาออกเนื่องจาก"
              name="because_of"
            >
              <Input.TextArea readOnly />
            </Form.Item>

            <Form.Item
              label="สถานที่พัก"
              name="accommodation"
            >
              <Input readOnly />
            </Form.Item>

            <Divider />

            <h3>ที่อยู่ที่ท่านพัก</h3>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="บ้านเลขที่" name="house_no">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="หมู่ที่" name="village_no">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ซอย" name="allay">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ถนน" name="road">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ตำบล/แขวง" name="sub_district">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="อำเภอ/เขต" name="district">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="จังหวัด" name="province">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ไปรษณีย์" name="post_code">
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="เบอร์โทรศัพท์" name="phone_number">
                  <Input readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ReadResignationForm;
