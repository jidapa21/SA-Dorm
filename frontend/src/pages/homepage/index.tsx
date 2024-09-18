import React, { useState, useEffect } from 'react';
import './index.css';
import { Layout, List, Card, Typography, message } from 'antd';
import { AnnouncementInterface } from "../../interfaces/Announcement"; 
import { GetLatestAnnouncements } from '../../services/https';

const { Content } = Layout;
const { Title, Text } = Typography;

const App: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetLatestAnnouncements();
        console.log("Response:", response);
        if (response && Array.isArray(response)) {
          setAnnouncements(response);  // Assuming response is an array of announcements
        } else {
          message.error('Error fetching announcements');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Unexpected error occurred.');
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 550,
          background: '#fff',
          borderRadius: 8,
        }}
      >
        <Title level={2}>ข่าวสารประชาสัมพันธ์</Title>
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={announcements}
          renderItem={(item: AnnouncementInterface) => (
            <List.Item>
              <Card
                title={item.title || 'ไม่มีหัวข้อ'}
                bordered={true}
                style={{ borderRadius: 8 }}
              >
                <Text strong>วันที่: {item.date ? new Date(item.date).toLocaleDateString() : 'ไม่ระบุ'}</Text>
                <br />
                <Text>{item.content || 'ไม่มีเนื้อหา'}</Text>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default App;
