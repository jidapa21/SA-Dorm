import {
    Button,
    Space,
    Form,
    Input,
    Row,
    Col,
    DatePicker,
    Card,
    Divider,
    Typography,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { NavLink, Link } from 'react-router-dom';
const { Text } = Typography;
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
            <Card>
                <h2>แบบฟอร์มขอผ่อนผันการชำระค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำประปา</h2>
                <Divider />
                <Form
                    name="basic"
                    layout="vertical"
                    //onFinish={onFinish}
                    autoComplete="off"
                >
                    <Space direction="vertical">
                        <Text>ผู้รับบริการ  B191563  กานต์รวี  นภารัตน์</Text>
                        <Text>อาคาร  4  ห้อง  414A</Text>
                    </Space>
                </Form>

                <br />

                <Form
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                >
                    <Row gutter={64}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าหอพัก"
                                name="dorm_payment"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าไฟฟ้า"
                                name="electricly_bill"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าน้ำ"
                                name="water_bill"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            </Card>
        </>
    );
}