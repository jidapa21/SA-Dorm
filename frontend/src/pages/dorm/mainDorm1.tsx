import React, { useEffect, useState } from 'react';
import "./Bmain.css";
import { Col, Divider, Row } from 'antd';
import { Link } from 'react-router-dom';

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

const MainDorm1: React.FC = () => {
  const [RoomBook, setRoomBook] = useState([]);
  
  useEffect(()=>{
    
  },[])

  return (
    <>
      <Row className="row-container" >
        <Col><h2 style={{ color: '#1f1f1f' }}>จองหอพักชาย</h2></Col>
        <Col><h2 className="heading-red">Air conditioner</h2></Col>
      </Row>
      <Divider />
      <Divider orientation="left">ชั้นที่ 1</Divider>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1100</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1101</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1102</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1103</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1104</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1105</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1106</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1107</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1108</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/dorm-booking/booking">
          <div style={style}>
            <div>1109</div><br/><br/><div>0/3</div>
          </div>
        </Link>
      </div>

      <Divider orientation="left">ชั้นที่ 2</Divider>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
        <Link to="/booking">
          <div style={style}>
            <div>1200</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1201</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1202</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1203</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1204</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1205</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1206</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1207</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1208</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1209</div><br/><br/><div>0/3</div>
          </div>
        </Link>
      </div>

      <Divider orientation="left">ชั้นที่ 3</Divider>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
        <Link to="/booking">
          <div style={style}>
            <div>1300</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1301</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1302</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1303</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1304</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1305</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1306</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1307</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1308</div><br/><br/><div>0/3</div>
          </div>
        </Link>
        <Link to="/booking">
          <div style={style}>
            <div>1309</div><br/><br/><div>0/3</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MainDorm1;