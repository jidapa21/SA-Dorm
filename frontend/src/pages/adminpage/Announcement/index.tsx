import React, { useState } from 'react';
import { Input, Button, message, Space, Typography } from 'antd';
import { CreateAnnouncement } from "../../../services/https";

const { Title } = Typography;
const { TextArea } = Input;

const Announcement: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (!title || !content) {
      messageApi.open({
        type: 'error',
        content: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      return;
    }
    try {
      const response = await CreateAnnouncement({ Title: title, Content: content });

      if (response.status === 200) {
        messageApi.open({
          type: 'success',
          content: 'ประกาศถูกสร้างเรียบร้อยแล้ว',
        });
        setTitle('');
        setContent('');
      } else {
        messageApi.open({
          type: 'error',
          content: `เกิดข้อผิดพลาดในการสร้างประกาศ: ${response.data.message || response.statusText}`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      messageApi.open({
        type: 'error',
        content: `เกิดข้อผิดพลาดในการสร้างประกาศ: ${(error as Error).message}`,
      });
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Header with underline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Title level={2} style={{ margin: 0, color: '#333' }}>
        แจ้งข่าวสาร
        </Title>
        <div style={{ width: '100%', maxWidth: '600px', height: '3px', backgroundColor: '#1890ff', marginTop: '5px', borderRadius: '2px' }} />
      </div>

      {/* Title TextArea with label */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>หัวข้อ</label>
        <TextArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="เพิ่มหัวข้อที่นี่"
          autoSize
          style={{ width: '100%' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '18px', marginBottom: '8px' }}>เนื้อหา</label>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="เพิ่มเนื้อหาที่นี่"
          autoSize={{ minRows: 3, maxRows: 10 }}
          style={{ width: '100%' }}
        />
      </div>

      {contextHolder}
      <Space style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button 
          onClick={handleSubmit} 
          style={{ backgroundColor: '#1890ff', color: 'white', borderColor: '#1890ff' }} 
        >
          ยืนยัน
        </Button>
      </Space>
    </div>
  );
};

export default Announcement;
