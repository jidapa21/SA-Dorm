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
  notification,
  Typography,
  GetProp,
  UploadFile,
  UploadProps,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
const { Text } = Typography;
import ImgCrop from "antd-img-crop";

import { RepairInterface } from "./../../interfaces/repairing";
import { StudentInterface } from "./../../interfaces/Student";
import { DormInterface } from "./../../interfaces/Dorm";
import { RoomInterface } from "./../../interfaces/Room";
import { CreateRepair, GetListFormStudent } from "./../../services/https";
import "./../repair/index.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function RepairCreate() {
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

  const [messageApi, contextHolder] = message.useMessage();
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
    setFileList([]);
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

  const onFinish = async (values: RepairInterface) => {
    values.Image = fileList[0]?.thumbUrl || "";

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

    // สร้างรายการแจ้งซ่อม
    let res = await CreateRepair(values);
    console.log(res);
    if (res) {
      openNotification(
        "success",
        "บันทึกข้อมูลสำเร็จ",
        "ข้อมูลของคุณได้ถูกบันทึกเรียบร้อยแล้ว"
      );
      form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
      setFileList([]); // รีเซ็ตไฟล์อัปโหลด
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
      <Space direction="vertical">
        <>
          <Card>
            <h2>แจ้งซ่อม</h2>
            <Divider />
            <Form name="StudentDetails" layout="vertical" autoComplete="off">
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
              name="RepairDetails"
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
      </Space>
    </>
  );
}
