import React, { useState, useEffect } from 'react';
import { Table, message, Button, Modal, Form, Input, Typography } from 'antd';
import { AadminInterface } from '../../../interfaces/Admin'; // Ensure the path to the interface is correct
import { Adminlist, CreateAdmin, DeleteAdmin } from "../../../services/https";

const { Title } = Typography;

const ManageAdmin: React.FC = () => {
    const [admins, setAdmins] = useState<AadminInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm();
    const myId = localStorage.getItem("id"); // ดึงข้อมูลจาก localStorage

    if (!myId) {
        message.error("ไม่พบ Admin ID ใน localStorage");
        return null; // Return null to avoid rendering the component if ID is missing
    }

    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            try {
                const response = await Adminlist();
                if (response.status === 200) {
                    setAdmins(response.data);
                } else {
                    message.error('ไม่พบข้อมูลแอดมิน');
                }
            } catch (error) {
                message.error('เกิดข้อผิดพลาดในการดึงข้อมูลแอดมิน');
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    const handleAddAdmin = async (values: AadminInterface) => {
        setLoading(true);
        try {
            const response = await CreateAdmin(values);
            if (response.status === 200) {
                message.success('เพิ่มแอดมินสำเร็จ');
                setIsModalVisible(false);
                form.resetFields();
                const fetchAdmins = async () => {
                    const response = await Adminlist();
                    if (response.status === 200) {
                        setAdmins(response.data);
                    }
                };
                fetchAdmins();
            } else {
                message.error('ไม่สามารถเพิ่มแอดมินได้');
            }
        } catch (error) {
            message.error('เกิดข้อผิดพลาดในการเพิ่มแอดมิน');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (id: any) => {
        const numericId = Number(id);
        if (isNaN(numericId)) {
            message.error('ID ของแอดมินไม่ถูกต้อง');
            return;
        }

        setLoading(true);
        try {
            const response = await DeleteAdmin(numericId);
            if (response.status === 200) {
                message.success('ลบแอดมินสำเร็จ');
                const fetchAdmins = async () => {
                    const response = await Adminlist();
                    if (response.status === 200) {
                        setAdmins(response.data);
                    }
                };
                fetchAdmins();
            } else {
                message.error('ไม่สามารถลบแอดมินได้');
            }
        } catch (error) {
            message.error('เกิดข้อผิดพลาดในการลบแอดมิน');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'ID', dataIndex: 'ID', key: 'ID' },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'First Name', dataIndex: 'first_name', key: 'FirstName' },
        { title: 'Last Name', dataIndex: 'last_name', key: 'LastName' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        {
            title: 'Action',
            key: 'action',
            render: (_text: any, record: AadminInterface) => (
                <Button 
                    type="default" // Adjusted for consistency
                    danger 
                    onClick={() => handleDeleteAdmin(record.ID)} // Ensure record.ID is not undefined
                    style={{
                        backgroundColor: '#ff4d4f', // Red background color
                        color: '#fff', // White text color
                        borderColor: '#ff4d4f', // Red border color
                        borderRadius: '4px', // Rounded corners
                        borderWidth: '2px', // Thicker border
                        padding: '6px 12px', // Adjust padding
                    }}
                >
                    ลบ
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Title level={2} style={{ margin: 0, color: '#333' }}>
                    จัดการแอดมิน
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
            <Button 
                type="primary" 
                onClick={() => setIsModalVisible(true)} 
                style={{ marginBottom: 16 }}
            >
                เพิ่มแอดมิน
            </Button>
            <Table
                dataSource={admins}
                columns={columns}
                rowKey="ID"
                loading={loading}
                bordered
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title="เพิ่มแอดมิน"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddAdmin}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'กรุณากรอก Username' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password" // Ensure consistency with API field
                        label="Password"
                        rules={[{ required: true, message: 'กรุณากรอก Password' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="first_name" // Ensure consistency with API field
                        label="First Name"
                        rules={[{ required: true, message: 'กรุณากรอก First Name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="last_name" // Ensure consistency with API field
                        label="Last Name"
                        rules={[{ required: true, message: 'กรุณากรอก Last Name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone" // Ensure consistency with API field
                        label="Phone"
                        rules={[{ required: true, message: 'กรุณากรอก Phone' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            เพิ่มแอดมิน
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageAdmin;
