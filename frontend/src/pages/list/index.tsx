import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { GetStudentsByRoomID, GetUserRoom } from '../../services/https';  
import { RoomInterface } from "./../../interfaces/Room";

interface RoomPrice {
  room: RoomInterface | null;
  dorm_id: number;
  room_id?: number;
  amount: number;
}

const Listpages: React.FC<RoomPrice> = ({
  room,
}) => {
  console.log("Room data:", room);

  const [students, setStudents] = useState<any[]>([]);
  const [roomID, setRoomID] = useState<number | null>(null);
  const [dormAmount, setDormAmount] = useState<number | null>(null);

  useEffect(() => {
    const userID = 5;

    const fetchUserRoom = async () => {
      try {
        const roomData = await GetUserRoom(userID);
        console.log(roomData);

        if (Array.isArray(roomData) && roomData.length > 0) {
          const { room_id } = roomData[0];
          setRoomID(room_id);
        } else {
          console.error("ไม่พบข้อมูลห้องสำหรับผู้ใช้");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการตรวจสอบห้องของผู้ใช้:", error);
      }
    };

    fetchUserRoom();
  }, []);

  useEffect(() => {
    if (roomID !== null && room) {
      const fetchDormAmount = () => {
        try {
          if (room.Dorm && room.Dorm.amount) {
            setDormAmount(room.Dorm.amount);
          } else {
            console.error("ไม่พบข้อมูลค่าห้องในหอพัก");
            setDormAmount(null); // หรือค่าที่ต้องการแทน
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหอพัก:", error);
        }
      };
  
      fetchDormAmount();
    }
  }, [roomID, room]);

  useEffect(() => {
    if (roomID !== null) {
      const fetchStudents = async () => {
        try {
          const result = await GetStudentsByRoomID(roomID);
          console.log(result);

          if (Array.isArray(result)) {
            const formattedStudents = result.map(student => ({
              StudentID: student.student_id || 'ไม่ระบุ',
              name: `${student.first_name || 'ไม่ระบุ'} ${student.last_name || 'ไม่ระบุ'}`,
              major: student.major || 'ไม่ระบุ',
              year: student.year || 'ไม่ระบุ',
              amount: dormAmount || 'ไม่ระบุ', // ใช้ค่าหอพักจาก dorm
            }));

            setStudents(formattedStudents);
          } else {
            console.error(result.error || "เกิดข้อผิดพลาดในการดึงข้อมูลนักศึกษา");
          }
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
        }
      };

      fetchStudents();
    }
  }, [roomID, dormAmount]);

  const columns = [
    {
      title: 'รหัสนักศึกษา',
      dataIndex: 'StudentID',
      key: 'StudentID',
    },
    {
      title: 'ชื่อ - นามสกุล',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'สำนัก',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'ชั้นปี',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'ค่าห้อง',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={students} 
      pagination={false} 
      rowKey="StudentID" 
    />
  );
};

export default Listpages;
