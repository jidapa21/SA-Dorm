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

const MainDorm1: React.FC = () => (
  <>
    <div></div>
    <Divider orientation="left">ชั้นที่ 1</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4100</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4101</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4102</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4103</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4104</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4105</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4106</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4107</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4108</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4109</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
    </div>

    <Divider orientation="left">ชั้นที่ 2</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4200</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4201</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4202</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4203</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4204</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4205</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4206</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4207</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4208</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4209</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
    </div>

    <Divider orientation="left">ชั้นที่ 3</Divider>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4300</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4301</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4302</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4303</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4304</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4305</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4306</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4307</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4308</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
      <div style={style}>
      <Link to="/subDorm"><div>
        <div>4309</div><br/><br/><div>0/3</div>
        </div></Link>
      </div>
    </div>
  </>
);

export default MainDorm1;