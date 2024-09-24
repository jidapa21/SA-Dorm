import React, { useEffect, useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import Modal from "./Model/Model";
import { GetRoomsByFloorAndDorm, GetReservationsByRoomID } from "../../services/https";
import { RoomInterface } from "../../interfaces/Room"; 
import "./Bmain.css";

/*interface Room {
  id: number; 
  RoomNumber: string;
  DormStatus: string;
  Available: boolean;
  Floor: number;
  Dorm: {
    dorm_name: string;
    Gender: {
      Gender: string;
    };
  };
  ID: number; 
}*/

const style: React.CSSProperties = { 
  padding: '30px 0', 
  borderRadius: '8px',
  height: '90px',
  border: '2px solid #d6d6d6',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center', 
  justifyContent: 'center',
  textAlign: 'center'
};

const MainDorm: React.FC = () => {
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomInterface | null>(null);
  const [floorsData, setFloorsData] = useState<{ floor: number; rooms: RoomInterface[]; count: number[]; }[]>([]);

  const showModal = (room: RoomInterface) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
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
          Floor: Number(room.Floor)
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
    const counts = await Promise.all(rooms.map(async (room) => {
      try {
        const response = await GetReservationsByRoomID(room.ID!);//ใส่ ! แก้ขัดไปก่อน
        return response && !response.error ? response.length : 0;
      } catch (error) {
        console.error("Error fetching reservations count:", error);
        return 0; // Return 0 in case of error
      }
    }));
    return counts;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dorm = Number(queryParams.get('dorm'));

  useEffect(() => {
    const fetchAllRooms = async () => {
      const floors = [1, 2, 3];
      const allRooms = await Promise.all(floors.map(floor => fetchRoomData(floor, dorm)));
      
      const counts = await fetchReservationsCount(allRooms.flat());
      setFloorsData(allRooms.map((rooms, index) => ({
        floor: floors[index],
        rooms,
        count: counts.slice(index * rooms.length, (index + 1) * rooms.length)
      })));
      
      setLoading(false);
    };

    fetchAllRooms();
  }, [dorm]);

  const updateReservationsCount = async () => {
    const counts = await fetchReservationsCount(floorsData.flatMap(floorData => floorData.rooms));
    setFloorsData(prevFloorsData => prevFloorsData.map((floorData, index) => ({
      ...floorData,
      count: counts.slice(index * floorData.rooms.length, (index + 1) * floorData.rooms.length)
    })));
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
        <Col><h2 style={{ color: '#1f1f1f' }}>จองหอพัก {dorm}</h2></Col>
        <Col><h2 className="heading-red">Air conditioner</h2></Col>
      </Row>
      <Divider />

      {floorsData.map(({ floor, rooms, count }) => (
        <div key={floor}>
          <div>ชั้นที่ {floor}</div><br />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
            {rooms.map((room, index) => (
              <div key={room.ID} style={style} onClick={() => showModal(room)}>
                <div>{room.RoomNumber}</div>
                <br /><br />
                <div>{count[index]}/3</div> {/* Show the count for each room */}
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
      <Modal isVisible={isModalVisible} handleCancel={handleCancel} room={selectedRoom} dorm_id={dorm} room_id={selectedRoom?.ID} updateReservationsCount={updateReservationsCount} />
    </>
  );
};

export default MainDorm;