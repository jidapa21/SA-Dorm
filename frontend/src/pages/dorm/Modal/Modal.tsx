import React, { useEffect, useState } from "react";
import { Modal, Row, Col, Divider, Table, Button, message } from "antd";
import type { TableProps } from "antd";
import {
  CreateReservation,
  GetReservationsByRoomID,
  GetStudentsByRoomID,
  GetReservationsByStudentID,
} from "../../../services/https";
import { ReservationInterface } from "../../../interfaces/Reservation";
import { RoomInterface } from "../../../interfaces/Room";
import axios from "axios";
import "./Bsub.css";

interface ReviewModalProps {
  isVisible: boolean;
  handleCancel: () => void;
  room: RoomInterface | null;
  dorm_id: number;
  room_id?: number;
  updateReservationsCount: () => Promise<void>;
  amount: number;
}

const ModalTest: React.FC<ReviewModalProps> = ({
  isVisible,
  handleCancel,
  room,
  dorm_id,
  room_id,
  updateReservationsCount,
}) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reservedStudentIDs, setReservedStudentIDs] = useState<Set<number>>(new Set());
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState<boolean>(true);
  const SID = localStorage.getItem("id"); // เรียก ID นักศึกษา (string)
  const studentID = SID ? parseInt(SID, 10) : null; // แปลงเป็น number หรือ null


  const columns: TableProps<any>["columns"] = [
    { title: "รหัสนักศึกษา", dataIndex: "StudentID", key: "StudentID" },
    { title: "ชื่อ - นามสกุล", dataIndex: "name", key: "name" },
    { title: "สำนัก", dataIndex: "major", key: "major" },
    { title: "ชั้นปี", dataIndex: "year", key: "year" },
    { title: "ค่าห้อง", dataIndex: "amount", key: "amount" },
  ];

  
  const fetchStudents = async () => {
    setLoading(true);
    setStudents([]);
    setReservedStudentIDs(new Set());
  
    if (room && room.ID) {
      try {
        const result = await GetStudentsByRoomID(room.ID);
        console.log(`Fetching dorm with amount: ${room.Dorm.amount}`);
        console.log(`Fetching dorm with room_id: ${room.ID}`);

        if (Array.isArray(result)) {
          const formattedStudents = result.map((student) => ({
            StudentID: student.student_id || "ไม่ระบุ",
            name: `${student.first_name || "ไม่ระบุ"} ${student.last_name || "ไม่ระบุ"}`,
            major: student.major || "ไม่ระบุ",
            year: student.year || "ไม่ระบุ",
            amount: room.Dorm.amount || "ไม่ระบุ",
          }));          
          setStudents(formattedStudents);
          const reservedIDs = new Set(result.map((student) => student.StudentID));
          setReservedStudentIDs(reservedIDs);
          setIsConfirmButtonDisabled(reservedIDs.has(studentID));
        } else {
          setIsConfirmButtonDisabled(false);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        message.error("ไม่สามารถดึงข้อมูลนักศึกษาได้");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };   


  useEffect(() => {
    if (isVisible) {
      fetchStudents();
    }
  }, [room, isVisible]);

  const handleConfirm = async () => {
    if (!room) {
      message.error("ข้อมูลห้องไม่ถูกต้อง");
      return;
    }
  
    if (studentID === null) {
      message.error("ID นักเรียนไม่พบ");
      return;
    }
  
    try {
      // Check if the student has any existing reservations
      const studentReservations = await GetReservationsByStudentID(studentID);
      if (studentReservations.length > 0) {
        message.warning("นักเรียนได้จองห้องแล้ว กรุณายกเลิกการจองห้องก่อนจองห้องใหม่");
        return;
      }
  
      // Check if the room is already fully booked
      const reservations = await GetReservationsByRoomID(room.ID);
      if (reservations.length >= 3) {
        message.error("ห้องนี้ถูกจองเต็มแล้ว");
        return;
      }
  
      // Proceed to create a new reservation
      const reservationData: ReservationInterface = {
        ID: undefined,
        reservation_date: new Date(),
        student_id: studentID,
        dorm_id: dorm_id,
        room_id: room_id,
      };
  
      await CreateReservation(reservationData);
      message.success("จองห้องสำเร็จ!");
      await updateReservationsCount();
  
      // Close the modal after a short delay
      setTimeout(() => handleCancel(), 1000);
    } catch (error) {
      console.error("Error during reservation:", error);
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data.message || "เกิดข้อผิดพลาดในการจองห้อง");
      } else {
        message.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
      }
    }
  };  

  const handleModalClose = async () => {
    handleCancel();
  };

  return (
    <Modal
      title={`ห้อง ${room ? room.room_number : "Loading..."}`}
      open={isVisible}
      onCancel={handleModalClose}
      footer={null}
      centered
    >
      {room ? (
        <>
          <Row>
            <Col>
              <h2>รายชื่อผู้ร่วมจอง</h2>
            </Col>
          </Row>
          <Divider />

          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : students.length === 0 ? (
            <p>ยังไม่มีผู้จอง</p>
          ) : (
            <Table columns={columns} dataSource={students} pagination={false} loading={loading} />
          )}

          <div className="flex-right">
            <Button
              type="primary"
              onClick={handleConfirm}
              disabled={isConfirmButtonDisabled} // ปิดการใช้งานปุ่มตามเงื่อนไข
            >
              ยืนยัน
            </Button>
          </div>
        </>
      ) : (
        <p>Loading room details...</p>
      )}
    </Modal>
  );
};

export default ModalTest;
