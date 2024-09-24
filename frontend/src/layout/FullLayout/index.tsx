// Layout ของหอพักนักศึกษา กำหนด Routes เส้นทางที่นี่
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../../App.css";
import { HistoryOutlined, HomeOutlined,WalletOutlined,SolutionOutlined,TeamOutlined ,ToolOutlined,FormOutlined,UserOutlined, DownOutlined, FacebookOutlined,} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Button, message, Avatar,MenuProps, Dropdown, Space,Flex, Tag } from "antd";
import Homepages from "../../pages/homepage";
import Paymentpages from "../../pages/payment";
import MainDorm1 from "../../pages/dorm/mainDorm1";
import MainDorm2 from "../../pages/dorm/mainDorm2";
import MainDorm3 from "../../pages/dorm/mainDorm3";
import MainDorm4 from "../../pages/dorm/mainDorm4";
import Booking from "../../pages/dorm/Booking";
import Personal from "../../pages/personal";
import Listpages from "../../pages/list";
import Repairpages from "../../pages/repair";
import DelayedPaymentpages from "../../pages/form/DelayedPaymentForm";
import EnExitingpages from "../../pages/form/EnExitingForm";
import Resigningpages from "../../pages/form/ResigningForm";
import Statusgpages from "../../pages/status";
import PersonalCreate from "../../pages/personal/create";
import PersonalChange from "../../pages/personal/edit";
import { GetStudentsById } from "../../services/https";
const { Header, Content, Footer, Sider } = Layout;


const FullLayout: React.FC = () => {
  const page = localStorage.getItem("page");
  const [messageApi, contextHolder] = message.useMessage();
  const [studentId, setStudentId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
   
  const setCurrentPage = (val: string) => {
    localStorage.setItem("page", val);
  };
  const Logout = () => {
    localStorage.clear();
    messageApi.success("ออกจากระบบสำเร็จ");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };
  
  const getStudentData = async (id: string) => {
    try {
      const studentRes = await GetStudentsById(id);
      if (studentRes.status === 200) {
        setStudentId(studentRes.data.student_id);
        setStudentName(`${studentRes.data.first_name} ${studentRes.data.last_name}`);
      }
    } catch (error) {
      console.error("Error fetching student data", error);
    }
  };
  useEffect(() => {
    const studentIdFromStorage = localStorage.getItem("id");
    if (studentIdFromStorage) {
      getStudentData(studentIdFromStorage);
    }
  }, []);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined style={{ marginRight: 8 }} /> {/* เพิ่มไอคอนผู้ใช้ */}
          My Account
        </span>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <Link to="/personal">
          ข้อมูลส่วนตัว
        </Link>
      ), 
    },
    {
      key: '3',
      label: 'ออกจากระบบ',
      onClick: Logout, // เรียกใช้ฟังก์ชัน Logout เมื่อคลิก
    },
    
  ];
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
            </div>
            <div
              style={{
                textAlign: "center",
                fontSize: "16px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
            </div>
            <div className="student-container">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#FFCC99" }} // Avatar background color
          />
          <div className="student-details">
            <div className="student-id">{studentId}</div>
            <div className="student-name">{studentName}</div>
          </div>
        </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={[page ? page : "homepage"]}
              mode="inline"
            >
              <Menu.Item
                key="homepage"
                onClick={() => setCurrentPage("homepage")}
              >
                <Link to="/">
                 <HomeOutlined /> 
                  <span>หน้าหลัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="personal"
                onClick={() => setCurrentPage("personal")}
              >
                <Link to="/personal">
                  <SolutionOutlined /> 
                  <span>ข้อมูลส่วนตัว</span>
                </Link>
              </Menu.Item>

              <Menu.SubMenu
                key="dorm-booking"
                title={
                  <span>
                   <FormOutlined /> 
                    <span>จองหอพัก</span>
                  </span>
                }
              >
                <Menu.Item key="mainDorm1">
                  <Link to="/dorm-booking/mainDorm1">
                    <span>หอพักชาย 1</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="mainDorm2">
                  <Link to="/dorm-booking/mainDorm2">
                    <span>หอพักชาย 2</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="mainDorm3">
                  <Link to="/dorm-booking/mainDorm3">
                    <span>หอพักหญิง 3</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="mainDorm4">
                  <Link to="/dorm-booking/mainDorm4">
                    <span>หอพักหญิง 4</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>


              <Menu.Item
                key="list"
                onClick={() => setCurrentPage("list")}
              >
                <Link to="/list">
                  <TeamOutlined /> 
                  <span>รายชื่อผู้พัก</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="payment"
                onClick={() => setCurrentPage("payment")}
              >
                <Link to="/payment">
                  <WalletOutlined />
                  <span>แจ้งยอดชำระ</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="repair"
                onClick={() => setCurrentPage("repair")}
              >
                <Link to="/repair">
                 <ToolOutlined /> 
                  <span>แจ้งซ่อม</span>
                </Link>
              </Menu.Item>
              <Menu.SubMenu
                key="form"
                title={
                  <span>
                   <FormOutlined /> 
                    <span>แบบฟอร์ม</span>
                  </span>
                }
              >
                <Menu.Item key="DelayedPayment">
                  <Link to="/form/DelayedPayment">
                    <span>ฟอร์มผ่อนผัน</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="EnExiting">
                  <Link to="/form/EnExiting">
                    <span>ฟอร์มขออนุญาตเข้า-ออก</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="Resigning">
                  <Link to="/form/Resigning">
                    <span>ฟอร์มลาออก</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item
                key="status"
                onClick={() => setCurrentPage("status")}
              >
                <Link to="/status">
                <HistoryOutlined />
                  <span>ติดตามสถานะ</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <Button onClick={Logout} style={{ margin: 4 }}>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
      {/* ส่วนสำหรับแท็กโซเชียลมีเดีย */}
      <Flex gap="4px 0" wrap>
      <a href="https://www.facebook.com/SUTdorm" target="_blank" rel="noopener noreferrer">
        <Tag icon={<FacebookOutlined />} color="#3b5999">
          Facebook
        </Tag>
      </a>
      {/* คุณสามารถเพิ่มแท็กอื่น ๆ ได้ที่นี่ */}
    </Flex>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
          My Options
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      
    </Header>
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }} />
      <div
        style={{
          padding: 24,
          minHeight: '100%',
          background: colorBgContainer,
        }}
          >
            <Routes>
              <Route path="/" element={<Homepages />} />
              <Route path="/personal" element={<Personal />} />
              <Route path="/personal/create" element={<PersonalCreate />} />
             <Route path="/personal/edit/:id" element={<PersonalChange />} /> 
              <Route path="/payment" element={<Paymentpages />} />
              <Route path="/dorm-booking/mainDorm1" element={<MainDorm1 />} />
              <Route path="/dorm-booking/mainDorm2" element={<MainDorm2 />} />
              <Route path="/dorm-booking/mainDorm3" element={<MainDorm3 />} />
              <Route path="/dorm-booking/mainDorm4" element={<MainDorm4 />} />
              <Route path="/dorm-booking/booking" element={<Booking />} />
              <Route path="/list" element={<Listpages />} />
              <Route path="/repair" element={<Repairpages />} />
              <Route path="/form/DelayedPayment" element={<DelayedPaymentpages />} />
              <Route path="/form/EnExiting" element={<EnExitingpages />} />
              <Route path="/form/Resigning" element={<Resigningpages />} />
              <Route path="/status" element={<Statusgpages />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Dormitory
        </Footer>
      </Layout>
    </Layout>
  );
};
export default FullLayout;