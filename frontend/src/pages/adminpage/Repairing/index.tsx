import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, Card } from 'antd';
import ReadRepairing from './ReadRepairing/index';
import { GetListRepairs } from '../../../services/https';
import { RepairInterface } from "../../../interfaces/repairing";

const { Title } = Typography;

interface TableRepairRecord extends RepairInterface {
  key: string;
}

const Repairing: React.FC = () => {
  const [repairs, setRepairs] = useState<TableRepairRecord[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const data = await GetListRepairs();
        if (data) {
          // กรองข้อมูลที่มีสถานะ "completed"
          const filteredData = data.filter((item: RepairInterface) => item.status !== 'completed');
          const transformedData = filteredData.map((item: RepairInterface, index: number) => ({
            ...item,
            key: item.ID?.toString() || index.toString(),
          }));
          setRepairs(transformedData);
        }
      } catch (error) {
        console.error('Error fetching repairs:', error);
      }
    };

    fetchRepairs(); // เรียกข้อมูลครั้งแรก

    // ตั้งค่า setInterval
    const intervalId = setInterval(fetchRepairs, 3000); // รีเฟรชข้อมูลทุกๆ 30 วินาที

    return () => clearInterval(intervalId); // ล้าง interval เมื่อคอมโพเนนต์ถูกทำลาย
  }, []);

  const handleDetailsClick = (repairId: string) => {
    setSelectedKey(repairId);
  };

  const handleBackClick = () => {
    setSelectedKey(null);
  };

  const columns = [
    {
      title: 'รายการแจ้งซ่อม',
      children: [
        {
          title: 'สถานะ',
          dataIndex: 'status',
          key: 'status',
          render: (text: string) => (
            <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#4A4A4A' }}>{text}</div>
          ),
        },
        {
          key: 'details',
          render: (_: any, record: TableRepairRecord) => (
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
          รายการแจ้งซ่อม
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
          <ReadRepairing ID={Number(selectedKey)} />
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

export default Repairing;
