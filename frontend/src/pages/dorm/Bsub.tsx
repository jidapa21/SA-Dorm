import React from 'react'
import { NavLink ,Link} from 'react-router-dom';
import "./Bsub.css";
import "./Bmain.css";

function Bsub() {
  return (
    <>
      <div className='flex-sub'>
        <Link to="/Bmain"><div>กลับหน้าจองหอพัก</div></Link>
        <div className='text-sub1'>Non-Air Conditioner</div>
      </div>
      <br/>
      <br/>
      <div className='text-sub2'>หอพัก 4</div>
      <br/>
      <div className='flex-sub'>
        <div className='box-1'>ห้อง 410</div>
        <div className='box-2'>ปีการศึกษา 1/2569</div>
      </div>
      <div className='container-sub'>
        <div className='background-sub'>
          <div className='grid-sub'>
            <div className='item-sub1'>รายชื่อผู้พัก</div><br/>
            <div className='item-sub'>รหัสนักศึกษา</div>
            <div className='item-sub'>ชื่อ - นามสกุล</div>
            <div className='item-sub'>สำนัก</div>
            <div className='item-sub'>ชั้นปี</div>
            <div className='item-sub'>A</div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'>B</div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'>C</div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
            <div className='item-sub'></div>
          </div>
        </div>
      </div>
        <Link to="/Confirm"><div className='confirmButton'>ยืนยัน</div></Link>
    </>
  )
}
export default Bsub