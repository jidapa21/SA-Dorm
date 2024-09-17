import {
  Button,
  Form,
  Input,
  Row,
  Space,
  Col,
  Upload,
  Card,
  Divider,
  message,
  Modal,
  Select,
  Typography,
  GetProp,
  UploadFile,
  UploadProps,
  Spin,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const { Text } = Typography;
import ImgCrop from "antd-img-crop";

import { StudentInterface } from "./../../interfaces/Student";
import { RepairInterface } from "./../../interfaces/repairing";
import { DormInterface } from "./../../interfaces/Dorm";
import { RoomInterface } from "./../../interfaces/Room";
import { ReservationInterface } from "./../../interfaces/Reservation";
import {
  GetStudentsById,
  CreateRepair,
  GetListRepairs,
  GetRepair,
} from "./../../services/https";
import "./../repair/index.css";
import Repairing from "./../adminpage/Repairing";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type CombinedData = ReservationInterface &
  StudentInterface &
  RepairInterface &
  DormInterface &
  RoomInterface;

const myId = localStorage.getItem("id");

export default function RepairCreate() {
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
    Title: string;
    Date_Submission: Date;
    Detail: string;
    Image: string;
    Location_Details: string;
    Contact: string;
    Time_Slot: string;
    Remarks: string;
    Status: string;
    ReservationID: number;
    AdminID: number;
  }
*/
  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const [student, setStudent] = useState<StudentInfoRecord[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: RepairInterface) => {
    values.Image = fileList[0]?.thumbUrl || "";

    const studentId = localStorage.getItem("id");
    if (studentId) {
      values.Date_Submission = new Date(); // เพิ่มวันที่ปัจจุบัน
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID on finish is not found.",
      });
    }
    // สร้างรายการแจ้งซ่อม
    let res = await CreateRepair(values);
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
      setFileList([]); // รีเซ็ตไฟล์อัปโหลด
      setTimeout(() => {
        // ตรวจสอบ URL ให้ถูกต้อง
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด!",
      });
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("id");
    const fetchRepairs = async () => {
      const response = await GetListRepairs();
      const data = await response.json(); // ตรวจสอบข้อมูลที่ได้รับ
      console.log(data);
      if (response) {
        setStudent(response.data);
        console.log("response ของ setStudent",data);
      } else {
        message.error("ไม่สามารถดึงข้อมูลการแจ้งซ่อมได้");
      }
    };
    if (studentId) {
    } else {
      messageApi.open({
        type: "error",
        content: "Student ID not found.",
      });
    }

    fetchRepairs();
  }, []);

  return (
    <>
      <Space direction="vertical">
        <>
          <Card>
            <h2>แจ้งซ่อม</h2>
            <Divider />
            <Form name="repairDetails" layout="vertical" autoComplete="off">
              <Row justify="space-between" align="middle">
                <Col>
                  <Space direction="vertical">
                    <Text>
                      {student.length > 0
                        ? student[0].StudentID
                        : "ไม่พบข้อมูล"}
                    </Text>
                    <Text>
                      {student.length > 0
                        ? student[0].FirstName
                        : "ไม่พบข้อมูล"}{" "}
                      {student.length > 0 ? student[0].LastName : "ไม่พบข้อมูล"}
                    </Text>
                    <Text>
                      หอพัก:{" "}
                      {student.length > 0 ? student[0].DormID : "ไม่พบข้อมูล"}{" "}
                      ห้อง:{" "}
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
              name="basic2"
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="on"
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="หัวข้อการขอรับบริการ"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกหัวข้อการขอรับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="อ่างน้ำตัน" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    label="ภาพประกอบ"
                    name="image"
                    valuePropName="fileList"
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={(file) => {
                          setFileList([...fileList, file]);
                          return false;
                        }}
                        maxCount={1}
                        multiple={false}
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="รายละเอียดการขอรับบริการ"
                    name="detail"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียดการขอรับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="ทำเศษอาหารตก" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="รายละเอียดสถานที่รับบริการ"
                    name="location_details"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียดสถานที่รับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="ห้องน้ำรวมชั้น 1" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item label="หมายเหตุ" name="Remarks">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="ช่องทางติดต่อ"
                    name="contact"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกช่องทางติดต่อ !",
                      },
                    ]}
                  >
                    <Input placeholder="ติดต่อเจ้าหน้าที่หน้าหอพัก" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="ช่วงเวลาที่รับบริการ"
                    name="time_slot"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกช่วงเวลาที่รับบริการ !",
                      },
                    ]}
                  >
                    <Input placeholder="9:00-16:00 น." />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col style={{ marginTop: "40px" }}>
                  <Form.Item>
                    <Space>
                      <Button htmlType="button" style={{ marginRight: "10px" }}>
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
      </Space>
    </>
  );
}
