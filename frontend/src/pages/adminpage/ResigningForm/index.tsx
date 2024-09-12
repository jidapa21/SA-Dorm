import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, Card } from 'antd';
import ReadResignationForm from './ReadResignationForm/index';
import { GetListResignationForm } from '../../../services/https';
import { ResigningFormInterface } from "../../../interfaces/ResigningForm";

const { Title } = Typography;

interface TableResigningFormRecord extends ResigningFormInterface {
  key: string;
  date: string;
}

const ResigningForm: React.FC = () => {
  const [resigningForm, setResigning] = useState<ResigningFormInterface[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        const data = await GetListResignationForm();
        if (data) {
          const transformedData = data.map((item: ResigningFormInterface, index: number) => ({
            ...item,
            key: item.ID?.toString() || index.toString(),
            //date: item.BuildingName || "Unknown",  // ใช้ชื่อหอที่มาจากฐานข้อมูล
          }));
          setResigning(transformedData);
        }
      } catch (error) {
        console.error('Error fetching repairs:', error);
      }
    };

    fetchRepairs();
  }, []);

  const handleDetailsClick = (ID: string) => {
    setSelectedKey(ID);
  };

  const handleBackClick = () => {
    setSelectedKey(null);
  };

  const columns = [
    {
      title: 'รายการแจ้งซ่อม',
      children: [
        {
          dataIndex: 'date',
          key: 'date',
          render: (text: string) => (
            <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#4A4A4A' }}>{text}</div>
          ),
        },
        {
          key: 'details',
          render: (_: any, record: TableResigningFormRecord) => (
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
          <ReadResignationForm ID={selectedKey} />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            bordered={true}
            style={{ width: '100%', maxWidth: '1100px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: '#FFFFFF' }}
          >
            <Table
              columns={columns}
              dataSource={resigningForm}
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

export default ResigningForm;