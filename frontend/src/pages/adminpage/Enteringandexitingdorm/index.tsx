import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, Card } from 'antd';
import ReadEnteringAndExitingDorm from '../Enteringandexitingdorm/ReadEnteringandexitingdorm/index';
import { ListEn_ExitingForm } from '../../../services/https';
import { En_ExitingFormInterface } from "../../../interfaces/En_ExitingForm"

const { Title } = Typography;

interface TableEn_ExitingFormInterfaceRecord extends En_ExitingFormInterface {
  key: string;
  date: string;
}

const EnteringAndExitingDorm: React.FC = () => {
  const [repairs, setEnteringAndExitingDorm] = useState<TableEn_ExitingFormInterfaceRecord[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchEn_ExitingForm = async () => {
      try {
        const data = await ListEn_ExitingForm();
        console.log('Data from API:', data); // ตรวจสอบข้อมูลที่ได้จาก API
        if (data) {
          const filteredData = data.filter((item: En_ExitingFormInterface) => item.status !== 'completed')
          const transformedData = filteredData.map((item: En_ExitingFormInterface, index: number) => ({
            ...item,
            key: item.ID?.toString() || index.toString(),
          }));
          console.log('Transformed Data:', transformedData); // ตรวจสอบข้อมูลหลังการแปลง
          setEnteringAndExitingDorm(transformedData);
        }
      } catch (error) {
        console.error('Error fetching En_ExitingForm:', error);
      }
    };
  
    fetchEn_ExitingForm();
    const intervalId = setInterval(fetchEn_ExitingForm, 3000); // รีเฟรชข้อมูลทุกๆ 30 วินาที
    return () => clearInterval(intervalId); // ล้าง interval เมื่อคอมโพเนนต์ถูกทำลาย
  }, []); 
  const handleDetailsClick = (ID: string) => {
    setSelectedKey(ID);
  };

  const handleBackClick = () => {
    setSelectedKey(null);
  };

  const columns = [
    {
      title: 'รายการฟอร์มผ่อนผัน',
      children: [
        {
            title: 'สภานะ',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (
              <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#4A4A4A' }}>{text}</div>
            ),
        },
        {
          key: 'details',
          render: (_: any, record: TableEn_ExitingFormInterfaceRecord) => (
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                onClick={() => handleDetailsClick(record.key)}
                style={{ marginTop: '8px' }}
              >
                ดูรายละเอียด
              </Button>
            </div>
          ),
        },
      ],
    },
  ];
  return (
    <div style={{ padding: '20px', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Header with underline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Title level={2} style={{ margin: 0, color: '#333' }}>
        แบบฟอร์มขออนุญาตเข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืน

        </Title>
        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            height: '3px',
            backgroundColor: '#1890ff',
            marginTop: '5px',
            borderRadius: '2px',
          }}
        />
      </div>
      {selectedKey ? (
        <div>
          <Button
            type="default"
            onClick={handleBackClick}
            style={{ marginBottom: '16px', borderColor: '#d9d9d9', color: '#1890ff' }}
          >
            กลับไปหน้าเดิม
          </Button>
          <ReadEnteringAndExitingDorm ID ={Number(selectedKey)} />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            bordered={true}
            style={{ width: '100%', maxWidth: '1100px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#FFFFFF' }}
          >
            <Table
              columns={columns}
              dataSource={repairs}
              pagination={false}
              bordered
              showHeader={false}
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnteringAndExitingDorm;