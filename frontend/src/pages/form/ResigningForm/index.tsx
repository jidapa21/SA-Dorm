import { Button, Space, Form, Input, Radio, Row, Col, Card, Divider, Typography, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ResigningFormInterface } from "./../../../interfaces/ResigningForm";
import { CreateResigningForm, GetListFormStudent, GetListFormDorm } from "./../../../services/https";
import "../../repair/index.css";
const { Text } = Typography;

export default function Index() {
  interface StudentInfoRecord {
    key: string | null; // Allow null
    dorm_name: string;
    StudentID: string;
    FirstName: string;
    LastName: string;
    room_number: number | string;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);
  const [student, setStudent] = useState<StudentInfoRecord[]>([]);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  const onFinish = async (values: ResigningFormInterface) => {
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
      let res = await CreateResigningForm(values);
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
        <h2>แบบฟอร์มลาออกหอพัก</h2>
        <Divider />
        <Form name="StudentDetails" form={form} layout="vertical">
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
