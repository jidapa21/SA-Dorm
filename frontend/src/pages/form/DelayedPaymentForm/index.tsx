import { Button, Space, Form, Input, Row, Col, DatePicker, Card, Divider, InputNumber, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { DelayedPaymentFormInterface } from "./../../../interfaces/delayedpaymentform";
import { CreateDelayedPaymentForm, GetListFormStudent, GetListFormDorm } from "../../../services/https";
import "../../repair/index.css";
const { Text } = Typography;

export default function DelayedPaymentFormCreate() {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const [student, setStudent] = useState<StudentInfoRecord[]>([]);

  interface StudentInfoRecord {
    key: string | null; // Allow null
    dorm_name: string;
    StudentID: string;
    FirstName: string;
    LastName: string;
    room_number: number | string;
  }

  const disabledDate = (current: any) => {
    // เลือกวันที่ก่อนหน้าไม่ได้
    return current && current.isBefore(today, "day");
  };

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  const onFinish = async (values: DelayedPaymentFormInterface) => {
    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.date_submission = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบรหัสนักศึกษา",
      });
      return;
    }

    try {
      let res = await CreateDelayedPaymentForm(values);
      console.log(res);

      if (res && res.status === 201) { // ตรวจสอบว่ามีสถานะ HTTP 201 แสดงว่าคำขอสำเร็จ
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
      } else {
        messageApi.open({
          type: "error",
          content: "กรุณาจองห้องพัก",
        });
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    const fetchData = async () => {
      try {
        const dataStudent = await GetListFormStudent();
        const dataDorm = await GetListFormDorm();
        console.log("Received dataStudent:", dataStudent);
        console.log("Received dataDorm:", dataDorm);

        // ตรวจสอบว่ามีข้อมูล student หรือไม่
        if (dataStudent) {
          const studentData = {
            key: studentId,
            StudentID: dataStudent.student.student_id || "ไม่พบข้อมูล",
            FirstName: dataStudent.student.first_name || "ไม่พบข้อมูล",
            LastName: dataStudent.student.last_name || "ไม่พบข้อมูล",
          };

          // ถ้ามีหอและห้องพักแล้ว
          if (dataDorm && dataDorm.reservation) {
            const dormData = {
              dorm_name: dataDorm.reservation.Dorm.dorm_name,
              room_number: dataDorm.reservation.Room.room_number,
            };

            const combinedData = { ...studentData, ...dormData };
            setStudent([combinedData]);

            // ถ้าไม่มีหอและห้องพัก
          } else {
            const dormData = { dorm_name: "ไม่มีหอ", room_number: "ไม่มีห้อง" };
            const combinedData = { ...studentData, ...dormData };
            setStudent([combinedData]);
            messageApi.open({
              type: "error",
              content: "กรุณาจองห้องพัก",
            });
          }
        } else {
          messageApi.open({
            type: "error",
            content: "ไม่พบข้อมูลนักศึกษา",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง",
        });
      }
    };

    if (studentId) {
      fetchData();
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลนักศึกษา",
      });
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Card>
        <h2>แบบฟอร์มขอผ่อนผันการชำระค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำประปา</h2>
        <Divider />
        <Form name="StudentDetails" layout="vertical" autoComplete="off">
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical">
                <Text>
                  ผู้รับบริการ{" "}
                  {student.length > 0 ? student[0].StudentID : "ไม่พบข้อมูล"}{" "}
                  {student.length > 0 ? student[0].FirstName : "ไม่พบข้อมูล"}{" "}
                  {student.length > 0 ? student[0].LastName : "ไม่พบข้อมูล"}
                </Text>
                <Text>
                  อาคาร:{" "}
                  {student.length > 0 ? student[0].dorm_name : "ไม่พบข้อมูล"}{" "}
                  ห้อง:{" "}
                  {student.length > 0 ? student[0].room_number : "ไม่พบข้อมูล"}
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
                  placeholder="2900.00"
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
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                />
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