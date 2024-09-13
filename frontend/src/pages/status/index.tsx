import React, { useEffect, useState } from "react";
import { Tag, Table, Typography } from "antd";
import { GetListStatus } from "./../../services/https";

const { Title } = Typography;

interface DataType {
  No: number;
  Subject: string;
  Type: string;
  State: string[];
}

const columns = [
  {
    title: "ลำดับ",
    dataIndex: "No",
    key: "No",
    render: (text: number) => <a>{text}</a>,
  },
  {
    title: "หัวข้อ",
    dataIndex: "Subject",
    key: "Subject",
  },
  {
    title: "ประเภท",
    dataIndex: "Type",
    key: "Type",
  },
  {
    title: "สถานะ",
    key: "State",
    dataIndex: "State",
    render: (State: string[]) => (
      <>
        {State.map((State: string) => {
          let color: string;
          switch (State) {
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
          return (
            <Tag color={color} key={State}>
              {State.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const Index: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetListStatus();
        console.log("Data from API:", response); // ตรวจสอบข้อมูลที่ได้จาก API

        if (response && response.data) {
          // แปลงข้อมูลเป็นอาเรย์จาก response.data
          const apiData = response.data;

          const transformedData: DataType[] = [
            {
              No: 1,
              Subject: apiData.delayed_payment?.title || "ไม่พบข้อมูล",
              Type: apiData.delayed_payment?.type || "ไม่พบข้อมูล",
              State: [apiData.delayed_payment?.status || "ไม่พบข้อมูล"],
            },
            {
              No: 2,
              Subject: apiData.en_exiting?.title || "ไม่พบข้อมูล",
              Type: apiData.en_exiting?.type || "ไม่พบข้อมูล",
              State: [apiData.en_exiting?.status || "ไม่พบข้อมูล"],
            },
            {
              No: 3,
              Subject: apiData.repairing?.title || "ไม่พบข้อมูล",
              Type: apiData.repairing?.type || "ไม่พบข้อมูล",
              State: [apiData.repairing?.status || "ไม่พบข้อมูล"],
            },
            {
              No: 4,
              Subject: apiData.resigning?.title || "ไม่พบข้อมูล",
              Type: apiData.resigning?.type || "ไม่พบข้อมูล",
              State: [apiData.resigning?.status || "ไม่พบข้อมูล"],
            },
          ];

          console.log("Transformed Data:", transformedData); // ตรวจสอบข้อมูลหลังการแปลง
          setData(transformedData); // อัพเดท state ด้วย transformedData
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <>
      <br />
      <div className="text-container">
        <div className="text-1">ติดตามสถานะของปัญหา</div>
      </div>
      <br />
      <br />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Index;