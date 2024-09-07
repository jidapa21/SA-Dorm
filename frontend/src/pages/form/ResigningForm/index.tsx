import React, { useState } from 'react';
import {
  Button,
  Space,
  Form,
  Input,
  Radio,
  Divider,
  Row,
  Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import "../../repair/index.css";

export default function Index() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const [componentDisabled, setComponentDisabled] = useState(true);

  const formItemLayout = {
    labelCol: {
      xs: { span: 36 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <br />
      <div className='title-1-flex'>
        <div className='text-1'>แบบฟอร์มลาออกหอพัก</div>
      </div>
      <br />
      <Divider />
      <br />
      <div className="container">
        <div className="background">
          <div className="flex-form">
            <div className='name-text info-box title-1-flex'>
              <div className='flex1'>
                <div>ผู้ทำเรื่อง</div>
                <div>B191563</div>
                <div>กานต์รวี</div>
                <div>นภารัตน์</div>
              </div>
              <div className='flex1'>
                <div>วันที่ปัจจุบัน: {formattedDate}</div>
              </div>
            </div>


            <Form
              name="layout-multiple-horizontal"
              layout="horizontal"
              {...formItemLayout}
            >
              <Row gutter={64}>
                <Col span={24}>
                  <Form.Item
                    label="เหตุผลที่ลาออกเนื่องจาก"
                    name="because_of"
                    rules={[{ required: true, message: 'กรุณากรอกเหตุผลในการลาออกจากหอพัก !' }]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="สถานที่พัก"
                    name="accommodation"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกสถานที่ที่ไปพักหลังลาออกจากหอพัก !",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="rest_home">บ้านพัก</Radio>
                      <Radio value="dormitory_outside">หอพักภายนอกมหาวิทยาลัย</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col style={{ marginTop: "40px" }}>
                  <Form.Item>
                    <Space>
                      <Link to="/ResigningForm">
                        <Button htmlType="button" style={{ marginRight: "10px" }}>
                          ยกเลิก
                        </Button>
                      </Link>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<PlusOutlined />}
                      >
                        ยืนยัน
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
