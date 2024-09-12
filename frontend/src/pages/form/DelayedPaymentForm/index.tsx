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
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
const { Text } = Typography;

import { DelayedPaymentFormInterface } from "./../../../interfaces/delayedpaymentform";
import { CreateDelayedPaymentForm, GetDelayedPaymentForm, ListDelayedPaymentForms, UpdateDelayedPaymentForm } from "../../../services/https";
import "../../repair/index.css";

const myId = localStorage.getItem("id");

export default function DelayedPaymentFormCreate() {

    const navigate = useNavigate();
    const [messageApi] = message.useMessage();
    const [form] = Form.useForm();

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
    interface DataType {
        ID: number;
        Dorm_Payment: number;
        Electricly_Bill: number;
        Water_Bill: number;
        Because_Of: string;
        Due_Date: Date;
        Status: string;
        AdminID: string;
        ReservationID: string;
    }

    const columns: ColumnsType<DelayedPaymentFormInterface> = [
        {
            title: "ลำดับ",
            dataIndex: "ID",
            key: "id",
        },
        {
            title: "ค่าหอพัก",
            dataIndex: "Dorm_Payment",
            key: "dorm_payment",
        },
        {
            title: "ค่าไฟฟ้า",
            dataIndex: "Electricly_Bill",
            key: "electricly_bill",
        },
        {
            title: "ค่าน้ำ",
            dataIndex: "Water_Bill",
            key: "water_bill",
        },
        {
            title: "เนื่องจาก",
            dataIndex: "Because_Of",
            key: "because_of",
        },
        {
            title: "ชำระภายในวันที่",
            dataIndex: "Due_Date",
            key: "due_date",
            render: (record) => <p>{dayjs(record).format("dddd DD MMM YYYY")}</p>,
        },
        {
            title: "สถานะ",
            dataIndex: "Status",
            key: "status",
        },
        {
            title: "",
            render: (record) => (
                <>
                    {myId === record?.ID ? (

                        messageApi.open({
                            type: "error",
                            content: "Student ID on finish is not found.",
                        })

                        // ไม่แสดงอะไรถ้า myId ตรงกับ record.ID
                    ) : (
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<PlusOutlined />}
                            onClick={() => CreateDelayedPaymentForm(record)}
                        >
                            ยืนยัน
                        </Button>
                    )}
                </>
            )
        },
    ]

    const data: DataType[] = [];

    const onFinish = async (values: DelayedPaymentFormInterface) => {
    const studentId = localStorage.getItem("id");
    if (!studentId) {
        messageApi.open({
            type: "error",
            content: "Student ID not found.",
        });
        return;
    }

     // ตรวจสอบค่าและการแปลงประเภท
     values.Dorm_Payment = parseFloat(values.Dorm_Payment?.toString() || '0');
     values.Electricly_Bill = parseFloat(values.Electricly_Bill?.toString() || '0');
     values.Water_Bill = parseFloat(values.Water_Bill?.toString() || '0');
 
     // ตรวจสอบและแปลง Due_Date
     if (typeof values.Due_Date === 'object' && values.Due_Date !== null) {
         values.Due_Date = dayjs(values.Due_Date).toDate();
     }
 
     console.log("Submitting values:", values); // ตรวจสอบข้อมูลก่อนส่ง
 
     try {
         let res = await CreateDelayedPaymentForm(values);
         console.log("Response:", res);
         messageApi.open({
             type: "success",
             content: "บันทึกข้อมูลสำเร็จ",
         });
         form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
     } catch (error) {
         console.error("Error:", error);
         messageApi.open({
             type: "error",
             content: "เกิดข้อผิดพลาด!",
         });
     }
};
    useEffect(() => {
        const studentId = localStorage.getItem("id");
        if (studentId) {
            //getRepairing(studentId);  // Fetch repair data using studentId
        } else {
            messageApi.open({
                type: "error",
                content: "Student ID not found.",
            });
        }
    }, []);

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
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="on"
                >
                    <Row gutter={64}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าหอพัก"
                                name="Dorm_Payment"
                            >
                                <Input placeholder="2400.00"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าไฟฟ้า"
                                name="Electricly_Bill"
                            >
                                <Input placeholder="100.00"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ค่าน้ำ"
                                name="Water_Bill"
                            >
                                <Input placeholder="50.00"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="เนื่องจาก"
                                name="Because_Of"
                                rules={[
                                    {
                                        required: true,
                                        message: "กรุณากรอกเหตุผลในการขอผ่อนผันชำระ !",
                                    },
                                ]}
                            >
                                <Input.TextArea placeholder="รายรับไม่พอจ่าย"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชำระภายในวันที่"
                                name="Due_Date"
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