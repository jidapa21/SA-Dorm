import React, { useEffect, useState } from 'react';
import { Layout, Table, Row, Col, Divider, message, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AnnouncementInterface } from '../../interfaces/Announcement';
import { GetLatestAnnouncement } from '../../services/https';
import { theme } from 'antd';
import { extend } from 'dayjs';

  

const { Content } = Layout;

const Announcement: React.FC = () => {
  const [announcement, setAnnouncement] = useState<AnnouncementInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns: ColumnsType<AnnouncementInterface> = [
  
    {
      title: "ชื่อ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "เนื้อหา",
      dataIndex: "content",
      key: "content",
    },
  ];
  
  const getAnnouncement = async () => {
    let res = await GetLatestAnnouncement();
    if (res.status == 200) {
      setAnnouncement(res.data);
    } else {
      setAnnouncement([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };
  
  useEffect(() => {
    getAnnouncement();
  }, []);

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 550,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {contextHolder}
        <Row>
          <Col span={12}>
            <h2>ประกาศข่าวสาร</h2>
          </Col>
          <Col span={12} style={{ textAlign: 'end', alignSelf: 'center' }}>
            <Button onClick={getAnnouncement} disabled={loading}>
              Refresh
            </Button>
          </Col>
        </Row>
        <Divider />
        {error && (
          <div style={{ color: 'red', marginBottom: '1em' }}>
            Error: {error}
          </div>
        )}
        <div style={{ marginTop: 20 }}>
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={announcement}
            loading={loading}
            style={{ width: '100%', overflow: 'auto' }}
            pagination={false}
            locale={{ emptyText: loading ? 'Loading...' : 'No announcement available' }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Announcement;