import React from 'react'
import "./Bsub.css";

function List() {
  return (
    <>
      <div className='flex-sub'>
        <div className='text-sub1'>Non-Air Conditioner</div>
      </div>
      <br/><br/>
      <div className='text-sub2 top'>หอพัก 4</div>
      <br/><br/>
      <div className='flex-sub'>
        <div className='box-1'>ห้อง 410</div>
        <div className='box-2'>ปีการศึกษา 1/2569</div>
      </div>
      <div className='container-sub'>
        <div className='background-sub'>
          <div className='grid-list'>
            <div className='item-list1'>รายชื่อผู้พัก</div><br/>
            <div className='item-sub'>รหัสนักศึกษา</div>
            <div className='item-sub'>ชื่อ - นามสกุล</div>
            <div className='item-sub'>สำนัก</div>
            <div className='item-sub'>ชั้นปี</div>
            <div className='item-sub'>ค่าห้อง</div>
            <div className='item-sub'>A</div>
            <div className='item-sub color'>B6910000</div>
            <div className='item-sub color'>นางสาวกานต์รวี นภารัตน์</div>
            <div className='item-sub color'>วิศวกรรมศาสตร์</div>
            <div className='item-sub color'>1</div>
            <div className='item-sub color'>2,900</div>
          </div>
        </div>
      </div>
    </>
    
  )
}
export default List