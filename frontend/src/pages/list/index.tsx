import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { GetStudentsByRoomID, GetUserRoom } from '../../services/https'; 

const Listpages: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [roomID, setRoomID] = useState<number | null>(null); // State สำหรับ roomID

  useEffect(() => {
    const userID = 1; // กำหนด userID ที่ต้องการตรวจสอบ

    const fetchUserRoom = async () => {
      try {
        const roomData = await GetUserRoom(userID);
        console.log(roomData); // ตรวจสอบข้อมูลที่ได้รับ

        if (Array.isArray(roomData) && roomData.length > 0) {
          const { room_id } = roomData[0]; // ดึง room_id จากข้อมูล
          setRoomID(room_id); // ตั้งค่า roomID
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
    if (roomID !== null) {
      const fetchStudents = async () => {
        try {
          const result = await GetStudentsByRoomID(roomID);
          console.log(result); // ตรวจสอบข้อมูลนักศึกษา

          if (Array.isArray(result)) {
            const formattedStudents = result.map(student => ({
              StudentID: student.student_id || 'ไม่ระบุ',
              name: `${student.first_name || 'ไม่ระบุ'} ${student.last_name || 'ไม่ระบุ'}`, 
              major: student.major || 'ไม่ระบุ',
              year: student.year || 'ไม่ระบุ',
              roomRate: "2,900" || 'ไม่ระบุ', 
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
  }, [roomID]);

  
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
      dataIndex: 'roomRate',
      key: 'roomRate',
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