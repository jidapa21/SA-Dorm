import React, { useEffect } from "react"; 
import { Modal, Row, Col, Divider, Table, Button, message } from "antd"; 
import type { TableProps } from "antd"; 
import { CreateReservation } from "../../../services/https"; 
import { ReservationInterface } from "../../../interfaces/Reservation";
import { RoomInterface } from "../../../interfaces/Room"; 
import axios from "axios";

/*interface Room {
  RoomNumber: string;
  DormStatus: string;
  Available: boolean;
  Floor: number;
  Dorm: {
    DormName: string;
    Gender: {
      Gender: string;
    };
  };
  ID: number; 
}*/

interface ReviewModalProps {
  isVisible: boolean;  
  handleCancel: () => void;
  room: RoomInterface | null;  
  dorm_id: number; 
  room_id?: number; 
  updateReservationsCount: () => Promise<void>; // New prop
}

const Model: React.FC<ReviewModalProps> = ({
  isVisible,
  handleCancel,
  room,
  dorm_id, 
  room_id,
  updateReservationsCount // New prop
}) => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "รหัสนักศึกษา",
      dataIndex: "sid",
      key: "sid",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ชื่อ - นามสกุล",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "สำนัก",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "ชั้นปี",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "ค่าห้อง",
      dataIndex: "roomRate",
      key: "roomRate",
    },
  ];

  const data = [
    {
      key: "A",
      name: "John Brown",
      sid: "B6512345",
      major: "Engineering",
      year: 3,
      roomRate: "2,900",
    },
    {
      key: "B",
      name: "Jim Green",
      sid: "B6554321",
      major: "Engineering",
      year: 3,
      roomRate: "2,900",
    },
    {
      key: "C",
      name: "Joe Black",
      sid: "B6543210",
      major: "Engineering",
      year: 3,
      roomRate: "2,900",
    },
  ];

  const handleConfirm = async () => {
    if (!room) {
      message.error("Room information is missing.");
      return;
    }
    console.log("Dorm ID:", dorm_id); 
    console.log("ID room:", room_id);

    const reservationData: ReservationInterface = {
      ID: undefined,
      ReservationDate: new Date(), 
      StudentID: 3, //นศ.ที่จองหอ
      DormID: dorm_id, 
      RoomID: room_id, 
    };

    try {
      await CreateReservation(reservationData); 
      message.success("จองหอพักสำเร็จ!"); 
      
      // Call the function to update the reservation counts
      await updateReservationsCount(); 

      setTimeout(() => {
        handleCancel();
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message || "An error occurred."); 
      } else {
        message.error("An unexpected error occurred."); 
      }
    }
  };

  return (
    <Modal
      title={<span style={{ fontSize: '16px' }}>ห้อง {room ? room.RoomNumber : 'Loading...'}</span>}
      visible={isVisible} //ให้หน้า pop-up แสดงแล้วปิดลงได้
      onCancel={handleCancel}
      footer={null}
      className="modal-comment"
      centered
    >
      {room ? (
        <>    
          <Col>
            <h2 style={{ color: "#1f1f1f", fontSize: '24px' }}>รายชื่อผู้จอง</h2>
          </Col>
          <Divider style={{ marginTop: "8px", marginBottom: "16px"}}/>
          <Row>
            <Col>
              <div className="text-sub">ปีการศึกษา 1/2565</div>
            </Col>
          </Row>
          <Divider style={{ marginTop: "16px" }} />
          <Table columns={columns} dataSource={data} pagination={false} />
          <br />
        </>
      ) : (
        <p>Loading room details...</p>
      )}
      <Button className="custom-button primary-button" type="primary" onClick={handleConfirm}>
        ยืนยัน
      </Button>
    </Modal>
  );
};

export default Model;