import React, { useEffect, useState } from "react";
import { Col, Divider, Row, message } from "antd";
import { useLocation } from "react-router-dom";
import Modal from "./Modal/Modal";
import {  GetRoomsByFloorAndDorm,
          GetReservationsByStudentID,
          GetReservationsByRoomID, } from "../../services/https";
import { RoomInterface } from "./../../interfaces/Room";
import { ReservationInterface } from "../../interfaces/Reservation";
import "./Bmain.css";

const style: React.CSSProperties = {
  padding: "30px 0",
  borderRadius: "8px",
  height: "90px",
  border: "2px solid #d6d6d6",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const MainDorm: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); //เพื่อเปลี่ยนสถานะหน้า pop-up ว่าแสดงอยู่หรือไม่
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null); //เพื่อเก็บข้อมูลห้องที่ผู้ใช้คลิกเลือกห้องในขณะนั้นๆ
  const [floorsData, setFloorsData] = useState<
    { floor: number; rooms: RoomInterface[]; count: number[] }[]
  >([]); //เก็บข้อมูลของห้องที่แบ่งตามแต่ละชั้น โดยมีห้องและจำนวนการจองของแต่ละห้อง
  const [studentReservations, setStudentReservations] = useState<RoomInterface[]>([]); //เก็บข้อมูล(เก็บเป็นอาเรย์)และอัปเดตการจองห้องของนศ.ที่เข้าสู่ระบบอยู่

  const showModal = (room: RoomInterface) => {
    const floorIndex = floorsData.findIndex(floorData =>
      floorData.rooms.some(r => r.ID === room.ID) //ตรวจสอบว่า room.ID ที่เลือก ตรงกับ rooms ทั้งหมดที่มีไหม (เช็คโดยการวนลูป)
    );

    if (floorIndex === -1) return; //เช็คว่าพบห้องไหม ถ้าไม่=ไม่แสดง

    const currentReservationCount = floorsData[floorIndex].count[floorsData[floorIndex].rooms.findIndex(r => r.ID === room.ID)] || 0;
    //หาข้อมูลการจองของห้องที่ถูกเลือกในชั้นนั้นๆ จากนั้นใช้ index ในการดึงจำนวนการจองของห้องนั้น
    if (currentReservationCount >= 3) {
      message.warning("จองเต็มแล้ว");
    } else {
      setSelectedRoom(room);
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  }; //สำหรับการปิดหน้า pop-up

  const fetchRoomData = async (floor: number, dorm: number) => { //ใช้ดึงข้อมูลห้องในแต่ละชั้นของหอพัก
    try {
      const response = await GetRoomsByFloorAndDorm(floor, dorm); //ดึงข้อมูลห้องจาก API
      if (response && !response.error) { //ตรวจสอบว่าไม่เป็นค่าว่างและไม่มีข้อผิดพลาด
        const roomData = response.map((room: RoomInterface) => ({
          ...room,
          Floor: Number(room.floor),
        }));
        return roomData;
      } else {
        throw new Error("Room not found");
      }
    } catch (error) {
      setError("Error fetching room data");
      console.error("Error fetching room data:", error);
      return [];
    }
  };

  const fetchReservationsCount = async (rooms: RoomInterface[]) => { 
  //รับพารามิเตอร์เป็นอาเรย์ของห้อง(RoomInterface[]) ที่ต้องการดึงข้อมูลจำนวนการจองของแต่ละห้อง
    const counts = await Promise.all(
    //Promise.all จะทำการรอจนกว่า API ทั้งหมดที่ถูกเรียกใน map จะเสร็จสิ้นทุกตัว โดยรอผลลัพธ์ของแต่ละห้องพร้อมกันผลลัพธ์จากแต่ละห้องจะถูกส่งกลับมาในรูปแบบของอาร์เรย์
      rooms.map(async (room) => {
      //map ใช้วนลูปแต่ละห้องเพื่อเรียก API ดึงข้อมูลการจอง โดยใช้ฟังก์ชัน GetReservationsByRoomID(room.ID) ซึ่งจะดึงข้อมูลการจองของห้องที่มี ID ตรงกับ room.ID
        try { //จัดการข้อมูลการจอง
          const response = await GetReservationsByRoomID(room.ID);
          return response && !response.error ? response.length : 0;
          //เช็คว่ามีข้อมูล&ไม่มีข้อผิดพลาด รีเทิร์นจำนวนการจองของห้องนั้น
        } catch (error) { //การจัดการข้อผิดพลาด
          console.error("Error fetching reservations count:", error);
          return 0;
        }
      })
    );
    return counts;
  };

  const fetchStudentReservations = async () => {
    const studentID = localStorage.getItem("student_id");
    if (studentID) {
      const reservations: RoomInterface[] = await GetReservationsByStudentID(studentID);
      //ดึงข้อมูลการจองห้องทั้งหมดที่นักศึกษาคนนั้นได้ทำการจอง
      setStudentReservations(reservations); //บันทึกข้อมูลการจองห้องลงใน studentReservations
      console.log("Reservations fetched: ", reservations);
      console.log("Student Reserved Room IDs: ", reservations.map((res: RoomInterface) => res.ID)); // กำหนดประเภทให้กับ res
    }
  };  

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // สำหรับอ่าน query string (ส่วนหลังเครื่องหมาย ? ใน URL) และจัดการกับพารามิเตอร์ต่าง ๆ ที่อยู่ใน query string นั้น 
  // (?dorm=1&NameDorm=ABC)
  const dorm = Number(queryParams.get("dorm"));
  const namedorm = String(queryParams.get("NameDorm"));

  useEffect(() => { //จัดการกับการดึงข้อมูลห้องและข้อมูลการจองห้องในหอพัก  ***แสดงห้องพักบนหน้าจอเลย***
    const fetchAllRooms = async () => { 
      const floors = [1, 2, 3];
      const allRooms = await Promise.all( //ดึงข้อมูลห้อง
        floors.map((floor) => fetchRoomData(floor, dorm))
      );

      const counts = await fetchReservationsCount(allRooms.flat()); // flat()=ตัวแปลงอาเรย์ซ้อยเป็นอาเรย์ชั้นเดียว
      setFloorsData(
        allRooms.map((rooms, index) => ({ //ใช้ map เพื่อสร้างอาเรย์ใหม่ที่ประกอบด้วยหมายเลขชั้น, ข้อมูลห้อง, และจำนวนการจองที่สัมพันธ์กับห้องในแต่ละชั้น
          floor: floors[index],
          rooms,
          count: counts.slice(index * rooms.length, (index + 1) * rooms.length),
        }))
      );
      setLoading(false);
    };
    fetchAllRooms(); //เรียกใช้งานเพื่อเริ่มต้นการดึงข้อมูลห้อง
    fetchStudentReservations(); //เรียกใช้งานเพื่อดึงข้อมูลการจองของนักศึกษา
  }, [dorm]);

  const updateReservationsCount = async () => {
    const counts = await fetchReservationsCount( //เรียกใช้ fetchReservationsCount นี้เพื่อดึงจำนวนการจองห้องทั้งหมด
      floorsData.flatMap((floorData) => floorData.rooms) //โดยส่งข้อมูลห้องจาก floorsData
    );
    setFloorsData((prevFloorsData) => 
    //อัปเดตสถานะของ floorsData โดยการใช้ฟังก์ชันฟีด (functional update) ที่อิงจากค่าปัจจุบัน (prevFloorsData)
      prevFloorsData.map((floorData, index) => ({
      //สำหรับแต่ละ floorData, จะคัดลอกข้อมูลที่มีอยู่และอัปเดตจำนวนการจอง (count) ใหม่
        ...floorData,
        count: counts.slice( //จัดการแบ่งข้อมูลการจองสำหรับแต่ละชั้น  เพื่อดึงข้อมูลจำนวนการจองที่สัมพันธ์กับห้องในชั้นนั้น
          index * floorData.rooms.length,
          (index + 1) * floorData.rooms.length
        ),
      }))
    );
    // Fetch the latest student reservations after updating the counts
    fetchStudentReservations(); 
  };

  useEffect(() => {
    console.log("Student Reservations: ", studentReservations);
  }, [studentReservations]);  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Row className="row-container">
        <Col>
          <h2 style={{ color: "#1f1f1f" }}>{namedorm} {dorm}</h2>
        </Col>
        <Col>
          <h2 className="heading-red">
            {dorm === 1 || dorm === 3 ? "Air conditioner" : "non-Air conditioner"}
          </h2>
        </Col>
      </Row>
      <Divider />
      {floorsData.map(({ floor, rooms, count }) => (
        <div key={floor}>
          <div>ชั้นที่ {floor}</div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "10px" }}>
            {rooms.map((room, index) => { //เป็นการวนลูปผ่านอาร์เรย์และสร้างอาร์เรย์ใหม่
              const currentCount = count[index]; 
              const isFull = currentCount >= 3; // เช็คว่านศ.ห้องนี้เต็มหรือยัง
              // ใช้ studentReservations เพื่อหาว่าห้องนี้ถูกจองแล้วหรือไม่
              const isReserved = studentReservations.some((res: ReservationInterface) => res.room_id === room.ID);

              // ตรวจสอบค่าที่ถูกต้อง
              console.log(`Room ID: ${room.ID}, Is Reserved: ${isReserved}, Current Count: ${currentCount}`);

              const roomStyle = isFull && !isReserved
                ? { ...style, backgroundColor: '#ff0000', color: '#ffffff' }  // สีแดงเมื่อห้องเต็ม
                : isReserved && isFull
                ? { ...style, backgroundColor: '#00ff18', color: '#ffffff' }  // สีเขียวเมื่อห้องถูกจอง
                : isReserved && !isFull
                ? { ...style, backgroundColor: '#00ff18', color: '#ffffff' }  // สีเขียวเมื่อห้องถูกจอง
                : style;

              return (
                <div key={room.ID} style={roomStyle} onClick={() => showModal(room)}>
                  <div>{room.room_number}</div>
                  <br />
                  <br />
                  <div>{currentCount}/3</div>
                </div>
              );
            })}
          </div>
          <br />
        </div>
      ))}
      <Modal //คอมโพเนนต์สำหรับแสดงรายละเอียดเพิ่มเติมเมื่อห้องถูกคลิก
        isVisible={isModalVisible}
        handleCancel={handleCancel}
        room={selectedRoom}
        dorm_id={dorm}
        room_id={selectedRoom ? selectedRoom.ID : 0}
        updateReservationsCount={updateReservationsCount}
      />
    </>
  );
};

export default MainDorm;
