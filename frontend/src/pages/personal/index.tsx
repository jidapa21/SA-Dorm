import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { ListStudents, ListPersonal, ListAddress } from "../../services/https/index";
import { PersonalInterface } from "../../interfaces/Personal";
import { StudentInterface } from "../../interfaces/Student";
import { AddressInterface } from "../../interfaces/Address";
import { Space, Table, Button, Col, Row, Divider, message, Card } from "antd";
import dayjs from "dayjs";

interface CombinedData extends PersonalInterface, StudentInterface ,AddressInterface{} // Combining both interfaces

function Personal() {
  const navigate = useNavigate();
  const [data, setData] = useState<CombinedData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  
  const getData = async () => {
    try {
      const [personalRes, studentRes, addressRes] = await Promise.all([
        ListPersonal(),
        ListStudents(),
        ListAddress(),
      ]);
  
      if (personalRes.status === 200 && studentRes.status === 200 && addressRes.status === 200) {
        console.log("Personal Response:", personalRes);
        console.log("Student Response:", studentRes);
        console.log("Address Response:", addressRes);
  
        // ใช้ Student เป็นหลักในการเชื่อมโยงข้อมูล
        const combinedData = studentRes.data.map((student: StudentInterface) => {
          const matchingPersonal = personalRes.data.find((personal: PersonalInterface) => personal.StudentID === student.StudentID);
          const matchingAddress = addressRes.data.find((address: AddressInterface) => address.StudentID === student.StudentID);
          
          return {
            ...student,             // ข้อมูลจาก Student เป็นหลัก
            ...matchingPersonal,    // เพิ่มข้อมูล Personal ที่เชื่อมโยง
            ...matchingAddress      // เพิ่มข้อมูล Address ที่เชื่อมโยง
          };
        });
  
        setData(combinedData);
      } else {
        messageApi.open({
          type: "error",
          content: "Error fetching data",
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Failed to fetch data",
      });
    }
  };  

  useEffect(() => {
    getData();
  }, []);

  const columns: ColumnsType<CombinedData> = [
    /*{
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },*/
    {
      title: "ข้อมูลนักศึกษา",
      key: "student_info",
      render: (record) => (
        <>
          <div className="card" style={{ marginTop: 10, padding: 0 }}>
          <Card
              style={{ color: "#001d66" }}
              type="inner"
              title={<span style={{ color: "#061178" }}>1. ข้อมูลส่วนตัวนักศึกษา</span>}
            >
              <table className="info-table">
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>ชื่อเล่น</td>
                    <td>{record.Nickname}</td>
                    <td style={{ backgroundColor: "#f0f0f0" }}>วันเกิด</td>
                    <td>{dayjs(record.birthday).format("dddd DD MMM YYYY")}</td>
                  </tr>
                  <tr>
                    <td>รหัสบัตรประชาชน</td>
                    <td>{record.CitizenID}</td>
                    <td>หมายเลขโทรศัพท์มือถือ</td>
                    <td>{record.Phone}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>สัญชาติ</td>
                    <td>{record.Nationality}</td>
                    <td style={{ backgroundColor: "#f0f0f0" }}>เชื้อชาติ</td>
                    <td>{record.Race}</td>
                  </tr>
                  <tr>
                    <td>ศาสนา</td>
                    <td>{record.Religion}</td>
                    <td>กรุ๊ปเลือด</td>
                    <td>{record.BloodGroup}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: "#f0f0f0" }}>โรคประจำตัว (ถ้ามี)</td>
                    <td colSpan={3}>{record.UD}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <Card style={{ marginTop: 10 }} type="inner" title={<span style={{ color: '#061178' }}>2. ที่อยู่ปัจจุบัน(ตามทะเบียนบ้าน)</span>} >
            <table className="info-table ">
                <tbody>
                  <tr>
                  <td style={{ backgroundColor: '#f0f0f0' }}>บ้านเลขที่</td>
                    <td>{record.HouseNo}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>หมู่ที่</td>
                    <td>{record.VillageNo}</td>
                  </tr>
                  <tr>
                    <td>ชื่อหมู่บ้าน</td>
                    <td>{record.Village}</td>
                    <td>ซอย</td>
                    <td>{record.Alley}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>ถนน</td>
                    <td>{record.Road}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>ตำบล/แขวง</td>
                    <td>{record.SubDistrict}</td>
                  </tr>
                  <tr>
                    <td>อำเภอ/เขต</td>
                    <td>{record.District}</td>
                    <td>จังหวัด</td>
                    <td>{record.Province}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>รหัสไปรษณีย์</td>
                    <td colSpan={3}>{record.PostCode}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <Card style={{ marginTop: 10 }} type="inner" title={<span style={{ color: '#061178' }}>3. เกี่ยวกับครอบครัว</span>} >
              <table className="info-table ">
                <tbody>
                  <tr>
                  <td style={{ backgroundColor: '#f0f0f0' }}>ชื่อ - สกุลบิดา</td>
                    <td>{record.FathersName}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>ชื่อ - สกุลมารดา</td>
                    <td>{record.MathersName}</td>
                  </tr>
                  <tr>
                    <td>อาชีพบิดา</td>
                    <td>{record.OccupationFather}</td>
                    <td>อาชีพมารดา</td>
                    <td>{record.OccupationMather}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>หมายเลขโทรศัพท์มือถือบิดา</td>
                    <td>{record.PhoneFather}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>หมายเลขโทรศัพท์มือถือมารดา</td>
                    <td>{record.PhoneMather}</td>
                  </tr>
                  <tr>
                    <td>สถานภาพครอบครัว</td>
                    <td>{record.FamilyStatusID}</td>
                    <td>ผู้ปกครอง</td>
                    <td>{record.GuardiansID}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>หรือผู้ปกครอง ชื่อ/สกุล</td>
                    <td>{record.OrGuardiansName}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>เกี่ยวข้องเป็น</td>
                    <td>{record.Relationship}</td>
                  </tr>
                  <tr>
                    <td>อาชีพ</td>
                    <td>{record.OccupationGuardian}</td>
                    <td>หมายเลขโทรศัพท์มือถือ</td>
                    <td>{record.PhoneGuardian}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
            <Card style={{ marginTop: 10 }} type="inner" title={<span style={{ color: '#061178' }}>4. ข้อมูลอื่นๆ</span>} >
              <table className="info-table ">
                <tbody>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>สำเร็จการศึกษาขั้นสุดท้ายจาก</td>
                    <td colSpan={3}>{record.LatestGraduationFrom}</td>
                  </tr>
                  <tr>
                    <td>เมื่อปี พ.ศ.</td>
                    <td>{record.GraduatedYear}</td>
                    <td>GPAX</td>
                    <td>{record.Gpax}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>พาหนะส่วนตัวที่ใช้</td>
                    <td>{record.PersonalVehicles}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>สี</td>
                    <td>{record.Color}</td>
                  </tr>
                  <tr>
                    <td>หมายเลขทะเบียน</td>
                    <td>{record.PlateNo}</td>
                    <td>วันครบกำหนดเสียภาษี</td>
                    <td>{record.TaxDate}</td>
                  </tr>
                  <tr>
                    <td style={{ backgroundColor: '#f0f0f0' }}>จังหวัด</td>
                    <td>{record.ProvinceVehicle}</td>
                    <td style={{ backgroundColor: '#f0f0f0' }}>ใบขับขี่</td>
                    <td>{record.LicenseID}</td>
                  </tr>
                  <tr>
                    <td>ประเภท (ถ้ามี)</td>
                    <td>{record.Type}</td>
                    <td>วันบัตรหมดอายุ</td>
                    <td>{record.ExpiredCard}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        </>
      ),
      colSpan: 6, // Combine columns
    },
    /*
    {
      title: "",
      render: (record) => (
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          onClick={() => navigate(`/personal/edit/${record.ID}`)}
        >
          แก้ไขข้อมูล
        </Button>
      ),
      colSpan: 0,
    },*/
  ];

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ข้อมูลนักศึกษา</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/personal/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />

      <div style={{ marginTop: -10 }}>
        <Table
          rowKey="ID"
          columns={columns}
          dataSource={data}
          style={{ width: "100%", overflow: "scroll" }}
          pagination={false}
        />
      </div>
    </>
  );
}

export default Personal;