import React from 'react';
import "./Bmain.css";
import { Col, Divider, Row } from 'antd';
import { NavLink ,Link} from 'react-router-dom';

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

const MainDorm4: React.FC = () => (
  <>
    <Row>
      <Col span={12}>
        <h2 style={{color: '#1f1f1f'}}>จองหอพักหญิง 4</h2>
      </Col>
    </Row>
    <Divider />
    <Divider orientation="left">ชั้นที่ 1</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <Link to="/booking">
        <div style={style}>
          <div>4100</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4101</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4102</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4103</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4104</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4105</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4106</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4107</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4108</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4109</div><br/><br/><div>0/3</div>
        </div></Link>
    </div>

    <Divider orientation="left">ชั้นที่ 2</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <Link to="/booking">
        <div style={style}>
          <div>4200</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4201</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4202</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4203</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4204</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4205</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4206</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4207</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4208</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4209</div><br/><br/><div>0/3</div>
        </div></Link>
    </div>

    <Divider orientation="left">ชั้นที่ 3</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <Link to="/booking">
        <div style={style}>
          <div>4300</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4301</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4302</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4303</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4304</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4305</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4306</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4307</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4308</div><br/><br/><div>0/3</div>
        </div></Link>
      <Link to="/booking">
        <div style={style}>
          <div>4309</div><br/><br/><div>0/3</div>
        </div></Link>
    </div>
  </>
);

export default MainDorm4;