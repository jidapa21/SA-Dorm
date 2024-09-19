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
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import "../../repair/index.css";

import { ResigningFormInterface } from "./../../../interfaces/ResigningForm";
import {
  GetStudentsById,
  CreateResigningForm,
  GetRepair,
} from "./../../../services/https";

const myId = localStorage.getItem("id");

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

  interface DataType {
    ID: number;
    Date: Date;
    Because_Of: string;
    Accommodation: string;
    Status: string;
    ReservationID: number;
    AdminID: number;
  }

  const columns: ColumnsType<ResigningFormInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "หัวข้อการขอรับบริการ",
      dataIndex: "Date",
      key: "date",
    },
    {
      title: "รายละเอียดการขอรับบริการ",
      dataIndex: "Because_Of",
      key: "because_of",
    },
    {
      title: "รายละเอียดสถานที่รับบริการ",
      dataIndex: "Accommodation",
      key: "accommodation",
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
              onClick={() => CreateResigningForm(record)}
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

  const [form] = Form.useForm();

  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
  };

  const onFinish = async (values: ResigningFormInterface) => {
    values.Accommodation = value.toString(); // กำหนดค่า Request จาก Radio Group
    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.Date = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID on finish is not found.",
      });
    }

    let res = await CreateResigningForm(values);
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
        <h2>แบบฟอร์มลาออกหอพัก</h2>
        <Divider />
        <Form
          name="title"
          form={form}
          layout="vertical"
        >
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
                    <Radio value="หอพักภายนอกมหาวิทยาลัย">หอพักภายนอกมหาวิทยาลัย</Radio>
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
