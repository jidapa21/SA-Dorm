import {
  Button,
  Space,
  Form,
  Input,
  Radio,
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
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import "../../repair/index.css";

import { En_ExitingFormInterface } from "./../../../interfaces/En_ExitingForm";
import {
  GetStudentsById,
  CreateEn_ExitingForm,
  GetRepair,
} from "./../../../services/https";

const myId = localStorage.getItem("id");

export default function EnExitingFormCreate() {
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

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [repairing, setRepairing] = useState<En_ExitingFormInterface | null>(
    null
  );

  const [form] = Form.useForm();

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  const onFinish = async (values: En_ExitingFormInterface) => {
    values.Request = value.toString(); // กำหนดค่า Request จาก Radio Group
    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.Date_Submission = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID on finish is not found.",
      });
    }

    let res = await CreateEn_ExitingForm(values);
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
    } else {
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
        <h2>แบบฟอร์มขออนุญาติเข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
        <Divider />
        <Form name="En_ExitingForm" form={form} layout="vertical">
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical">
                <Text>ผู้รับบริการ B191563 กานต์รวี นภารัตน์</Text>
                <Text>อาคาร 4 ห้อง 414A</Text>
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
                name="Because_of"
                rules={[{ required: true, message: "กรุณากรอกเหตุผล !" }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="วันที่ขออนุญาติ"
                name="Date_request"
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
