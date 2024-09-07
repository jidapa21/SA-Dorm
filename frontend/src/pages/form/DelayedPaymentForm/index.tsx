import {
    Button,
    Space,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { NavLink, Link } from 'react-router-dom';
import "../../repair/index.css";

export default function index() {

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
        },
      };

    return (
        <>
            <div className='title-1-flex'>
                <div className='text-1'>
                    แบบฟอร์มขอผ่อนผันการชำระ
                    ค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำประปา                    
                </div>
            </div>
            <br />
            <div className="full-width-line"></div>
            <br />
            <div className="container">
            <div className="background">
                <div className="flex-form">
                    <div className='name-text info-box flex1'>
                        <div>ผู้ทำเรื่อง</div>
                        <div>B191563</div>
                        <div>กานต์รวี</div>
                        <div>นภารัตน์</div>
                        <br />
                        <br />
                    </div>


                    <Form layout="horizontal">
                        <Row gutter={64}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    label="ค่าหอพัก"
                                    name="dorm_payment"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    label="ค่าไฟฟ้า"
                                    name="electricly_bill"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    label="ค่าน้ำ"
                                    name="water_bill"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    label="เนื่องจาก"
                                    name="because_of"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณากรอกเหตุผลในการขอผ่อนผันชำระ !",
                                        },
                                    ]}
                                >
                                    <Input.TextArea />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    label="ชำระภายในวันที่"
                                    name="due_date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "กรุณาเลือกวัน/เดือน/ปี !",
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col style={{ marginTop: "40px" }}>
                                <Form.Item>
                                    <Space>
                                        <Link to="/DelayedPaymentForm">
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
            </div >
        </>
    );
}