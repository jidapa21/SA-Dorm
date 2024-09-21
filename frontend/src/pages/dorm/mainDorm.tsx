import React, { useEffect, useState } from "react"; 
import { Col, Divider, Row, message } from "antd"; 
import { useLocation } from "react-router-dom"; 
import Modal from "./Modal/Modal"; 
import {
  GetRoomsByFloorAndDorm, GetReservationsByStudentID,
  GetReservationsByRoomID,
} from "../../services/https"; 
import { RoomInterface } from "./../../interfaces/Room"; 

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
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null); 
  const [floorsData, setFloorsData] = useState<
    { floor: number; rooms: RoomInterface[]; count: number[] }[]
  >([]); 
  const [studentReservations, setStudentReservations] = useState<RoomInterface[]>([]);

  const showModal = (room: RoomInterface) => {
    const floorIndex = floorsData.findIndex(floorData =>
      floorData.rooms.some(r => r.ID === room.ID)
    );
    
    if (floorIndex === -1) return;

    const currentReservationCount = floorsData[floorIndex].count[floorsData[floorIndex].rooms.findIndex(r => r.ID === room.ID)] || 0; 
    if (currentReservationCount >= 3) {
      message.warning("จองเต็มแล้ว"); 
    } else {
      setSelectedRoom(room); 
      setIsModalVisible(true); 
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  const fetchRoomData = async (floor: number, dorm: number) => {
    try {
      const response = await GetRoomsByFloorAndDorm(floor, dorm); 
      if (response && !response.error) {
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
    const counts = await Promise.all(
      rooms.map(async (room) => {
        try {
          const response = await GetReservationsByRoomID(room.ID); 
          return response && !response.error ? response.length : 0; 
        } catch (error) {
          console.error("Error fetching reservations count:", error); 
          return 0; 
        }
      })
    );
    return counts; 
  };

  const fetchStudentReservations = async () => {
    const studentID = localStorage.getItem("studentId");
    if (studentID) {
      const reservations = await GetReservationsByStudentID(Number(studentID));
      setStudentReservations(reservations);
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const dorm = Number(queryParams.get("dorm")); 
  const namedorm = String(queryParams.get("NameDorm"));

  useEffect(() => {
    const fetchAllRooms = async () => {
      const floors = [1, 2, 3]; 
      const allRooms = await Promise.all(
        floors.map((floor) => fetchRoomData(floor, dorm))
      ); 

      const counts = await fetchReservationsCount(allRooms.flat()); 
      setFloorsData(
        allRooms.map((rooms, index) => ({
          floor: floors[index],
          rooms,
          count: counts.slice(index * rooms.length, (index + 1) * rooms.length), 
        }))
      );

      setLoading(false); 
    };

    fetchAllRooms(); 
    fetchStudentReservations(); // เรียกฟังก์ชันดึงการจองห้องของนักศึกษา
  }, [dorm]); 

  const updateReservationsCount = async () => {
    const counts = await fetchReservationsCount(
      floorsData.flatMap((floorData) => floorData.rooms)
    ); 
    setFloorsData((prevFloorsData) =>
      prevFloorsData.map((floorData, index) => ({
        ...floorData,
        count: counts.slice(
          index * floorData.rooms.length,
          (index + 1) * floorData.rooms.length
        ), 
      }))
    );
  };

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
          <h2 className="heading-red">Air conditioner</h2>
        </Col>
      </Row>
      <Divider />
      {floorsData.map(({ floor, rooms, count }) => (
        <div key={floor}>
          <div>ชั้นที่ {floor}</div>
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "10px",
            }}
          >
            {rooms.map((room, index) => {
              const currentCount = count[index];
              const isFull = currentCount >= 3; 
              const isReserved = studentReservations.some(res => res.ID === room.ID); // เช็คว่ามีการจองห้องนี้ไหม

              const roomStyle = isFull ? { ...style, backgroundColor: 'red', color: 'white' } : 
                isReserved ? { ...style, backgroundColor: 'green', color: 'white' } : style; // เปลี่ยนสีเป็นเขียวหากจองไว้

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
      <Modal
        isVisible={isModalVisible}
        handleCancel={handleCancel}
        room={selectedRoom}
        dorm_id={dorm}
        room_id={selectedRoom ? selectedRoom.ID : 0}
        updateReservationsCount={updateReservationsCount}
        amount={dorm}
      />
    </>
  );
};

export default MainDorm;
