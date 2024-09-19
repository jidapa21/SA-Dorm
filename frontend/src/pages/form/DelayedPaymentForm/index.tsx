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
  notification,
  InputNumber,
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
import { StudentInterface } from "./../../../interfaces/Student";
import { DormInterface } from "./../../../interfaces/Dorm";
import { RoomInterface } from "./../../../interfaces/Room";
import {
  CreateDelayedPaymentForm,
  GetListFormStudent,
  ListDelayedPaymentForms,
  UpdateDelayedPaymentForm,
} from "../../../services/https";
import "../../repair/index.css";

const myId = localStorage.getItem("id");

export default function DelayedPaymentFormCreate() {
  const navigate = useNavigate();
  const [messageApi] = message.useMessage();
  const [form] = Form.useForm();

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentInfoRecord[]>([]);

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
    Date_Submission: Date;
    Dorm_Payment: number;
    Electricly_Bill: number;
    Water_Bill: number;
    Because_Of: string;
    Due_Date: Date;
    Status: string;
    ReservationID: number;
    AdminID: number;
  }

  interface StudentInfoRecord
    extends StudentInterface,
      DormInterface,
      RoomInterface {
    key: string | null; // Allow null
    DormID: number;
    StudentID: string;
    FirstName: string;
    LastName: string;
    RoomNumber: number;
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
      //render: (record) => <p>{dayjs(record).format("dddd DD MMM YYYY")}</p>,
    },
    {
      title: "สถานะ",
      dataIndex: "Status",
      key: "status",
    },
    {
      title: "รหัสแอดมิน",
      dataIndex: "AdminID",
      key: "adminid",
    },
    {
      title: "รหัสการจอง",
      dataIndex: "ReservationID",
      key: "reservationid",
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
          ) : (
            // ไม่แสดงอะไรถ้า myId ตรงกับ record.ID
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
      ),
    },
  ];

  const data: DataType[] = [];

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  const openNotification = (
    type: "success" | "info" | "warning" | "error",
    message: string,
    description?: string
  ) => {
    notification[type]({
      message: message,
      description: description,
      placement: "bottomRight",
    });
  };

  const onFinish = async (values: DelayedPaymentFormInterface) => {
    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.Date_Submission = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      openNotification(
        "error",
        "ไม่พบ Student ID",
        "ไม่สามารถส่งข้อมูลได้เนื่องจากไม่พบ Student ID"
      );
      return;
    }

    let res = await CreateDelayedPaymentForm(values);
    console.log(res);
    if (res) {
      openNotification(
        "success",
        "บันทึกข้อมูลสำเร็จ",
        "ข้อมูลของคุณได้ถูกบันทึกเรียบร้อยแล้ว"
      );
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
    } else {
      openNotification(
        "error",
        "เกิดข้อผิดพลาด!",
        "เกิดข้อผิดพลาดในการบันทึกข้อมูล"
      );
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    const fetchData = async () => {
      try {
        const data = await GetListFormStudent();
        console.log("Received data:", data);

        // ตรวจสอบว่า student, dorm และ room มีข้อมูลหรือไม่
        if (data && data.reservation && data.student) {
          const studentData = {
            key: studentId,
            StudentID: data.student.student_id || "ไม่พบข้อมูล",
            FirstName: data.student.first_name || "ไม่พบข้อมูล",
            LastName: data.student.last_name || "ไม่พบข้อมูล",
            DormID: data.reservation.Dorm.ID || "ไม่พบข้อมูล",
            RoomNumber: data.reservation.Room.room_number || "ไม่พบข้อมูล",
          };

          setStudent([studentData]); // Setting student data
        } else {
          setErrorMessage("ไม่พบข้อมูลการแจ้งซ่อม");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("เกิดข้อผิดพลาดในการดึงข้อมูล");
      }
    };

    if (studentId) {
      fetchData();
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
        <Form name="StudentDetails" layout="vertical" autoComplete="off">
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical">
                <Text>
                  {student.length > 0 ? student[0].StudentID : "ไม่พบข้อมูล"}{" "}
                  {student.length > 0 ? student[0].FirstName : "ไม่พบข้อมูล"}{" "}
                  {student.length > 0 ? student[0].LastName : "ไม่พบข้อมูล"}
                </Text>
                <Text>
                  หอ {student.length > 0 ? student[0].DormID : "ไม่พบข้อมูล"}{" "}
                  ห้อง{" "}
                  {student.length > 0 ? student[0].RoomNumber : "ไม่พบข้อมูล"}
                </Text>
              </Space>
            </Col>
            <Col>
              <Text>วันที่ปัจจุบัน: {formattedDate}</Text>
            </Col>
          </Row>
        </Form>

        <br />

        <Form
          name="DelayedPaymentForm"
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="on"
        >
          <Row gutter={64}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="ค่าหอพัก" name="Dorm_Payment">
                <InputNumber
                  placeholder="2400.00"
                  style={{ width: "100%" }}
                  step={0.01}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Row />
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="ค่าไฟฟ้า" name="Electricly_Bill">
                <InputNumber
                  placeholder="100.00"
                  style={{ width: "100%" }}
                  step={0.01}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Row />
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item label="ค่าน้ำ" name="Water_Bill">
                <InputNumber
                  placeholder="50.00"
                  style={{ width: "100%" }}
                  step={0.01}
                  min={0}
                />
              </Form.Item>
            </Col>
            <Row />
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
                <Input.TextArea placeholder="รายรับไม่พอจ่าย" />
              </Form.Item>
            </Col>
            <Row />
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
                  <Button
                    htmlType="button"
                    onClick={handleReset}
                    style={{ marginRight: "10px" }}
                  >
                    ยกเลิก
                  </Button>
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
