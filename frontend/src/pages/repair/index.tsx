import { Button, Space, Form, Input, Row, Col, Card, Divider, Typography, message, GetProp, UploadFile, UploadProps, Upload } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import { RepairInterface } from "./../../interfaces/repairing";
import { CreateRepair, GetListFormStudent, GetListFormDorm,} from "./../../services/https";
import "./../repair/index.css";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const { Text } = Typography;

export default function RepairCreate() {
  interface StudentInfoRecord {
    key: string | null; // Allow null
    dorm_name: string;
    StudentID: string;
    FirstName: string;
    LastName: string;
    room_number: number | string;
  }

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

  const handleReset = () => {
    form.resetFields(); // รีเซ็ตข้อมูลฟอร์ม
    setFileList([]);
  };

  const onFinish = async (values: RepairInterface) => {
    values.image = fileList[0]?.thumbUrl || "";

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
      let res = await CreateRepair(values);
      console.log(res);

      if (res && res.status === 201) { // ตรวจสอบว่ามีสถานะ HTTP 201 แสดงว่าคำขอสำเร็จ
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        form.resetFields(); // รีเซ็ตฟอร์มหลังบันทึกข้อมูลสำเร็จ
        setFileList([]);
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
                      ผู้รับบริการ{" "}
                      {student.length > 0 ? student[0].StudentID : "ไม่พบข้อมูล"}{" "}
                      {student.length > 0 ? student[0].FirstName : "ไม่พบข้อมูล"}{" "}
                      {student.length > 0 ? student[0].LastName : "ไม่พบข้อมูล"}
                    </Text>
                    <Text>
                      อาคาร:{" "}
                      {student.length > 0 ? student[0].dorm_name : "ไม่พบข้อมูล"}{" "}
                      ห้อง:{" "}
                      {student.length > 0  ? student[0].room_number : "ไม่พบข้อมูล"}
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
