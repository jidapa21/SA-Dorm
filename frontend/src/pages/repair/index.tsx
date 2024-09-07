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
  message
} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { RepairInterface } from "./../../interfaces/repairing";
import "./../repair/index.css";

export default function index() {

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
      title: "ชื่อ",
      dataIndex: "FirstName",
      key: "firstname",
    },
    {
      title: "นามสกุล",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "เพศ",
      dataIndex: "Gender",
      key: "gender",
      render: (item) => Object.values(item.Name),
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "วันเกิด",
      dataIndex: "BirthDay",
      key: "birthday",
      render: (record) => <p>{dayjs(record).format("dddd DD MMM YYYY")}</p>,
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => navigate(`/customer/edit/${record.ID}`)}
            shape="circle"
            icon={<EditOutlined />}
            size={"large"}
          />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];
  return (
    <>
      <br />
      <Card>
        <h2>แจ้งซ่อม</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          //onFinish={onFinish}
          autoComplete="off"
        >
          <h3>ผู้รับบริการ B191563</h3>
          <h3>กานต์รวี</h3>
          <h3>นภารัตน์</h3>
        </Form>
      </Card>
      <div className="container">
        <div className="background">
          <div className="flex-form">
            <div className='name-text info-box'>
              <div className='name-text flex1'>
                <div>ผู้รับบริการ</div>
                <div>B191563</div>
                <div>กานต์รวี</div>
                <div>นภารัตน์</div>
              </div>
              <div className='name-text flex1'>
                <div>อาคาร</div>
                <div>4</div>
                <div>ห้อง</div>
                <div>414A</div>
              </div>
            </div>
            <br />
            <br />
            <Form
              name="basic"
              layout="vertical"
              autoComplete="off"
            >
              <Row gutter={[16, 0]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="หัวข้อการขอรับบริการ"
                    name="subject"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกหัวข้อการขอรับบริการ !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="ภาพประกอบ"
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเพิ่มรูปภาพประกอบ !",
                      },
                    ]}
                  >
                    <Upload
                      name="file"
                      action="/upload.do"
                      listType="picture"
                      beforeUpload={() => false} // Prevent auto upload
                    >
                      <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
                    </Upload>
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
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="รายละเอียดสถานที่รับบริการ"
                    name="location_detail"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกรายละเอียดสถานที่รับบริการ !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                  <Form.Item
                    label="หมายเหตุ"
                    name="remark"
                  >
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
                    <Input />
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
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end">
                <Col style={{ marginTop: "40px" }}>
                  <Form.Item>
                    <Space>
                      <Link to="/Repairing">
                        <Button htmlType="button" style={{ marginRight: "10px" }}>
                          ยกเลิก
                        </Button>
                      </Link>
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
          </div>
        </div>
      </div >
    </>
  );
}