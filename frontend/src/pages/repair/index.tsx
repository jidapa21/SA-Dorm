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
  Modal,
  Select,
  message,
  Typography,
  GetProp,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const { Text } = Typography;
import ImgCrop from "antd-img-crop";

import { StudentInterface } from "../../interfaces/Student";
import { RepairInterface } from "./../../interfaces/repairing";
import { GetStudentsById, RepairingUI, GetRepairing, ListRepairings, UpdateRepairing } from "./../../services/https";
import "./../repair/index.css";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
interface CombinedData extends StudentInterface{} // Combining both interfaces

export default function RepairingCreate() {

  const [studentData, setStudentData] = useState<CombinedData | null>(null); // Store combined data

  const getStudentData = async (id: string) => {
    try {
      // Fetch all related data by student ID
      const [studentRes ] = await Promise.all([
        GetStudentsById(id),
      ]);

      if (
        studentRes.status === 200  
      ) {
        // Combine data into a single object
        const combinedData: CombinedData = {
          ...studentRes.data,
        };
        setStudentData(combinedData);
      } else {
        messageApi.open({
          type: "error",
          content: "Error fetching data",
        });
        setStudentData(null);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch student data.",
      });
      setStudentData(null);
    }
  };
    const columns: ColumnsType<RepairInterface> = [
      {
        title: "ลำดับ",
        dataIndex: "ID",
        key: "id",
      },
      {
        title: "หัวข้อการขอรับบริการ",
        dataIndex: "Subject",
        key: "subject",
      },
      {
        title: "ภาพประกอบ",
        dataIndex: "Image",
        key: "image",
        width: "15%",
        render: (text, record, index) => (
          <img src={record.Image} className="w3-left w3-circle w3-margin-right" width="100%" />
        )
      },
      {
        title: "รายละเอียดการขอรับบริการ",
        dataIndex: "Detail",
        key: "detail",
      },
      {
        title: "รายละเอียดสถานที่รับบริการ",
        dataIndex: "Location_Details",
        key: "location_details",
      },
      {
        title: "ช่องทางติดต่อ",
        dataIndex: "Contact",
        key: "contact",
      },
      {
        title: "ช่วงเวลาที่รับบริการ",
        dataIndex: "Time_Slot",
        key: "time_slot",
      },
      {
        title: "หมายเหตุ",
        dataIndex: "Remarks",
        key: "remarks",
      },
      {
        title: "สถานะ",
        dataIndex: "Status",
        key: "status",
        render: (text, record, index) => (
          <>
          </>
        ),
      },
    ];

    const navigate = useNavigate();
    const [users, setUsers] = useState<RepairInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

    const [fileList, setFileList] = useState<UploadFile[]>([]);
  
      const handleCancel = () => {
      setOpen(false);
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
      console.log("Preview Image URL: ", src);  // Check the preview URL
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    };
  
    const onFinish = async (values: RepairInterface) => {
      console.log("Form Values: ", values);  // Check form values
      values.Image = fileList[0]?.thumbUrl;  // Check image URL
      console.log("Image URL: ", values.Image);
    
      try {
        let res = await RepairingUI(values);
        console.log("API Response: ", res);
        if (res && res.message === "Created success") {
          messageApi.open({
            type: "success",
            content: "บันทึกข้อมูลสำเร็จ",
          });
          setTimeout(() => {
            navigate("/repair");
          }, 2000);
        } else {
          messageApi.open({
            type: "error",
            content: "เกิดข้อผิดพลาด !",
          });
        }
      } catch (error) {
        console.error("API Request Error: ", error);
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาด !",
        });
      }
    };
    
  
  return (
    <>
      <Card>
        <h2>แจ้งซ่อม</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          autoComplete="off"
        >
          <Space direction="vertical">
          <td>{record.student_id}</td>
            <Text>ผู้รับบริการ  B191563  กานต์รวี  นภารัตน์</Text>
            <Text>อาคาร  4  ห้อง  414A</Text>
          </Space>
        </Form>

        <br />

        <Form
          name="basic"
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
                    <Button icon={<UploadOutlined />} >Upload</Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รายละเอียดการขอรับบริการ"
                name="Detail"
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
                name="Location_Details"
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
              <Form.Item
                label="หมายเหตุ"
                name="Remarks"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ช่องทางติดต่อ"
                name="Contact"
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
                name="Time_Slot"
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
  );
}