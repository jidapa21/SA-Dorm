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
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
import { GetStudentsById, CreateRepair } from "./../../services/https";
import "./../repair/index.css";
import Repairing from "./../adminpage/Repairing";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
type CombinedData = ReservationInterface & StudentInterface & RepairInterface & DormInterface & RoomInterface;

export default function RepairCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [studentData, setStudentData] = useState<StudentInterface | null>(null);
  const [repairing, setRepairing] = useState<RepairInterface | null>(null);
  const [reservationData, setReservationData] = useState<{
    reservation: ReservationInterface | null;
    student: StudentInterface | null;
    dorm: DormInterface | null;
    room: RoomInterface | null;
  }>({
    reservation: null,
    student: null,
    dorm: null,
    room: null,
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const studentID = localStorage.getItem("studentID");
  const studentDbID = localStorage.getItem("id");

  const submitRepairRequest = async (repairData) => {
    const studentID = localStorage.getItem("studentID");
    const studentDbID = localStorage.getItem("id"); // ดึง ID ของนักศึกษา

    const data = {
      ...repairData,
      student_id: studentID,
      student_db_id: studentDbID, // ส่ง ID ของนักศึกษาไปใน request
    };

    try {
      const res = await axios.post(`${apiUrl}/repair`, data);
      if (res.status === 200) {
        message.success("แจ้งซ่อมสำเร็จ");
      } else {
        message.error("การแจ้งซ่อมล้มเหลว");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาด");
    }
  };

  const getRepairData = async (id: string) => {
    try {
      const response = await fetch(`/api/repairs/${id}`);
      const data = await response.json();

      // Extract reservation from data
      const reservation = data.Reservation;
      const student = reservation.Student;
      const dorm = reservation.Dorm;
      const room = reservation.Room;

      setRepairing(data);
      setReservationData({
        reservation,
        student,
        dorm,
        room,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch repair data.",
      });
    }
  };

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

  const showSuccessMessage = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "Successfully saved data",
    });
  }, [messageApi]);

  const showErrorMessage = useCallback(() => {
    messageApi.open({
      type: "error",
      content: "An error occurred!",
    });
  }, [messageApi]);

  const onFinish = async (values: repairData) => {
    values.Image = fileList[0]?.thumbUrl || '';
    values.ID = repairing?.ID;
    let res = await CreateRepair(values);
    if (res) {
      showSuccessMessage();
      setTimeout(() => navigate("/repair"), 2000);
    } else {
      showErrorMessage();
    }
    const studentID = localStorage.getItem("studentID");
    const studentDbID = localStorage.getItem("id"); // ดึง ID ของนักศึกษา

    const data = {
      ...repairData,
      student_id: studentID,
      student_db_id: studentDbID, // ส่ง ID ของนักศึกษาไปใน request
    };

    try {
      const res = await axios.post(`${apiUrl}/repair`, data);
      if (res.status === 200) {
        message.success("แจ้งซ่อมสำเร็จ");
      } else {
        message.error("การแจ้งซ่อมล้มเหลว");
      }
    } catch (error) {
      message.error("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    if (studentID) {
      getRepairData(studentID);  // Fetch repair data using studentId
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
          {studentData ? (
            <Card>
              <h2>แจ้งซ่อม</h2>
              <Divider />
              <Form
                name="repairDetails"
                layout="vertical"
                autoComplete="off"
              >
                <Space direction="vertical">
                  {repairing && reservationData.reservation ? (
                    <>
                      {reservationData.student && (
                        <>
                          <Text>
                            ผู้รับบริการ {studentID} {reservationData.student.FirstName} {reservationData.student.LastName}
                          </Text>
                        </>
                      )}
                      {reservationData.dorm && reservationData.room && (
                        <>
                          <Text>
                            Dorm: {reservationData.dorm.ID} Room: {reservationData.room.RoomNumber}
                          </Text>
                        </>
                      )}
                    </>
                  ) : (
                    <Text>Loading...</Text>
                  )}
                </Space>
              </Form>
  
              <br />
  
              <Form
                name="basic2"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <Form.Item
                      label="หัวข้อการขอรับบริการ"
                      name="Subject"
                      rules={[
                        { required: true, message: "กรุณากรอกหัวข้อการขอรับบริการ !" },
                      ]}
                    >
                      <Input placeholder="อ่างน้ำตัน" />
                    </Form.Item>
                  </Col>
  
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                      label="ภาพประกอบ"
                      name="Image"
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
  
                  {/* Other Form Items */}
                  
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
                </Row>
              </Form>
            </Card>
          ) : (
            <Spin />
          )}
        </Space>
      </>
    );
  }
  