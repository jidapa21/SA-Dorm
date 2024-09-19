import {
  Button,
  Space,
  Form,
  Input,
  Radio,
  Row,
  Col,
  Card,
  Divider,
  Typography,
  notification,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import "../../repair/index.css";

import { ResigningFormInterface } from "./../../../interfaces/ResigningForm";
import { StudentInterface } from "./../../../interfaces/Student";
import { DormInterface } from "./../../../interfaces/Dorm";
import { RoomInterface } from "./../../../interfaces/Room";
import {
  CreateResigningForm,
  GetListFormStudent,
} from "./../../../services/https";


export default function Index() {
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

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const [value, setValue] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [student, setStudent] = useState<StudentInfoRecord[]>([]);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

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

  const onFinish = async (values: ResigningFormInterface) => {
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

    let res = await CreateResigningForm(values);
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
          openNotification(
            "error",
            "เกิดข้อผิดพลาด!",
            "เกิดข้อผิดพลาดในการบันทึกข้อมูล"
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("เกิดข้อผิดพลาดในการดึงข้อมูล");
        openNotification(
          "error",
          "เกิดข้อผิดพลาด!",
          "เกิดข้อผิดพลาดในการบันทึกข้อมูล"
        );
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
        <h2>แบบฟอร์มลาออกหอพัก</h2>
        <Divider />
        <Form name="StudentDetails" form={form} layout="vertical">
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
          name="ResigningForm"
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="on"
        >
          <Row gutter={64}>
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
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value="บ้านพัก">บ้านพัก</Radio>
                    <Radio value="หอพักภายนอกมหาวิทยาลัย">
                      หอพักภายนอกมหาวิทยาลัย
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="เหตุผลที่ลาออกเนื่องจาก"
                name="because_of"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเหตุผลในการลาออกจากหอพัก !",
                  },
                ]}
              >
                <Input.TextArea />
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
