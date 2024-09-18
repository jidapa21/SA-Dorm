import {
  Button,
  Space,
  Form,
  Input,
  Radio,
  Row,
  Col,
  notification,
  DatePicker,
  Card,
  Divider,
  Typography,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import "../../repair/index.css";

import { En_ExitingFormInterface } from "./../../../interfaces/En_ExitingForm";
import { StudentInterface } from "./../../../interfaces/Student";
import { DormInterface } from "./../../../interfaces/Dorm";
import { RoomInterface } from "./../../../interfaces/Room";
import {
  CreateEn_ExitingForm,
  GetListFormStudent,
} from "./../../../services/https";

const myId = localStorage.getItem("id");

export default function EnExitingFormCreate() {
  
  interface StudentInfoRecord
  extends StudentInterface,
    DormInterface,
    RoomInterface {
  key: string;
  DormID: number;
  StudentID: string;
  FirstName: string;
  LastName: string;
  RoomNumber: number;
}
  /*
  interface DataType {
    ID: number;
    Date_Submission: Date;
    Request: string;
    Because_Of: string;
    Date_Request: Date;
    Status: string;
    ReservationID: number;
    AdminID: number;
  }

  const columns: ColumnsType<En_ExitingFormInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "วันที่ส่งเรื่อง",
      dataIndex: "Date_Submission",
      key: "date_submission",
    },
    {
      title: "เรื่องที่ขอ",
      dataIndex: "Request",
      key: "request",
    },
    {
      title: "เนื่องจาก",
      dataIndex: "Because_Of",
      key: "because_of",
    },
    {
      title: "วันที่ขออนุญาติ",
      dataIndex: "Date_Request",
      key: "date_request",
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
              onClick={() => CreateEn_ExitingForm(record)}
            >
              ยืนยัน
            </Button>
          )}
        </>
      ),
    },
  ];

  const data: DataType[] = [];
*/
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [repairing, setRepairing] = useState<En_ExitingFormInterface | null>(
    null
  );

  const [form] = Form.useForm();

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

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

  const openNotification = (type: 'success' | 'info' | 'warning' | 'error', message: string, description?: string) => {
    notification[type]({
      message: message,
      description: description,
      placement: 'bottomRight',
    });
  };

  const onFinish = async (values: En_ExitingFormInterface) => {
  
    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.Date_Submission = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      openNotification('error', 'ไม่พบ Student ID', 'ไม่สามารถส่งข้อมูลได้เนื่องจากไม่พบ Student ID');
      return;
    }
    
    let res = await CreateEn_ExitingForm(values);
    console.log(res);
    if (res) {
      openNotification('success', 'บันทึกข้อมูลสำเร็จ', 'ข้อมูลของคุณได้ถูกบันทึกเรียบร้อยแล้ว');
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
    } else {
      openNotification('error', 'เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    const fetchData = async () => {
      try {
        const data = await GetListFormStudent();
        console.log("Received data:", data);

        // ตรวจสอบว่า student, dorm และ room มีข้อมูลหรือไม่
        if (data && data.length > 0) {
          const combinedData = data.map((item: any, index: number) => ({
            key: `item-${index}`,
            StudentID: item.reservation?.student?.student_id || "ไม่พบข้อมูล",
            FirstName: item.reservation?.student?.first_name || "ไม่พบข้อมูล",
            LastName: item.reservation?.student?.last_name || "ไม่พบข้อมูล",
            DormID: item.reservation?.Dorm?.ID || "ไม่พบข้อมูล",
            RoomNumber: item.reservation?.Room?.RoomNumber || "ไม่พบข้อมูล",
          }));

          setStudent(combinedData); // ตั้งค่าข้อมูลให้กับ state
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
        <h2>แบบฟอร์มขออนุญาติเข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
        <Divider />
        <Form name="StudentDetails" form={form} layout="vertical">
        <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical">
                    <Text>
                      {student.length > 0
                        ? student[0].StudentID
                        : "ไม่พบข้อมูล"}{" "}
                      {student.length > 0
                        ? student[0].FirstName
                        : "ไม่พบข้อมูล"}{" "}
                      {student.length > 0 ? student[0].LastName : "ไม่พบข้อมูล"}
                    </Text>
                    <Text>
                      หอ{" "}
                      {student.length > 0 ? student[0].DormID : "ไม่พบข้อมูล"}{" "}
                      ห้อง{" "}
                      {student.length > 0
                        ? student[0].RoomNumber
                        : "ไม่พบข้อมูล"}
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
          name="En_ExitingForm"
          form={form}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="on"
        >
          <Row gutter={64}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="เรื่องที่ขอ:"
                name="Request"
                rules={[
                  { required: true, message: "กรุณาเลือกเรื่องที่ขออนุญาติ !" },
                ]}
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value="ขอกลับหอพักหลังเวลาปิดหอพัก">
                      ขอกลับหอพักหลังเวลาปิดหอพัก
                    </Radio>
                    <Radio value="ขอออกจากหอพักก่อนเวลาเปิดหอพัก">
                      ขอออกจากหอพักก่อนเวลาเปิดหอพัก
                    </Radio>
                    <Radio value="ค้างคืนนอกหอพัก">ค้างคืนนอกหอพัก</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="เนื่องจาก"
                name="Because_Of"
                rules={[{ required: true, message: "กรุณากรอกเหตุผล !" }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="วันที่ขออนุญาติ"
                name="Date_Request"
                rules={[
                  { required: true, message: "กรุณาเลือกวัน/เดือน/ปี !" },
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
