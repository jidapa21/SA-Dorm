import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

interface DataType {
  ID: number;
  Title: string;
  Type: string;
  Status: string;
}

const Index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/status'); // หรือ endpoint ของคุณ
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result); // ตรวจสอบข้อมูลที่ได้รับ
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const columns = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "หัวข้อ",
      dataIndex: "Title",
      key: "title",
    },
    {
      title: "ประเภท",
      dataIndex: "Type",
      key: "type",
    },
    {
      title: "สถานะ",
      dataIndex: "Status",
      key: "status",
      render: (status: string) => {
        let color: string;
        switch (status) {
          case "รอดำเนินการ":
            color = "#bfbfbf";
            break;
          case "กำลังดำเนินการ":
            color = "#1677ff";
            break;
          case "อนุมัติ":
          case "เสร็จสิ้น":
            color = "#52c41a";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <>
      <br />
      <div className="text-container">
        <div className="text-1">ติดตามสถานะของปัญหา</div>
      </div>
      <br />
      <br />
      <Table columns={columns} dataSource={data} rowKey="ID" />
    </>
  );
};

export default Index;
