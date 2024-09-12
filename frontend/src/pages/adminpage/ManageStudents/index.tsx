import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, message, Select, DatePicker,InputNumber  } from 'antd';
import moment from 'moment';
import { ListStudents, DeleteStudentsById, CreateStudent } from '../../../services/https'; // Adjust the import path
import { StudentInterface } from '../../../interfaces/Student'; // Adjust the import path
import dayjs from 'dayjs';

const ManageStudents: React.FC = () => {
    const [students, setStudents] = useState<StudentInterface[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
      async function fetchStudents() {
        try {
          const response = await ListStudents();
          console.log('Fetched students:', response.data); // Debugging output
          setStudents(response.data || []);
        } catch (error) {
          message.error('Failed to fetch students.');
        }
      }
      fetchStudents();
    }, []);

    const handleCreate = async (values: StudentInterface) => {
      try {
        // Convert birthday to YYYY-MM-DD format using moment
        const formattedValues = {
          ...values,
          Birthday: values.Birthday ? moment(values.Birthday).format('YYYY-MM-DD') : undefined,
        };
        await CreateStudent(formattedValues);
        setIsModalVisible(false);
        form.resetFields();
        const response = await ListStudents();
        setStudents(response.data || []);
        message.success('Student added successfully.');
      } catch (error) {
        message.error('Failed to add student.');
      }
    };

    const handleDelete = async (id: number) => {
      try {
        await DeleteStudentsById(id.toString());
        const response = await ListStudents();
        setStudents(response.data || []);
        message.success('Student deleted successfully.');
      } catch (error) {
        message.error('Failed to delete student.');
      }
    };

    const columns = [
        { title: 'Student ID', dataIndex: 'student_id', key: 'student_id' },
        { title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
        { title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
        { title: 'Major', dataIndex: 'major', key: 'major' },
        {title: "วัน/เดือน/ปี เกิด",key: "birthday",render: (record) => <>{dayjs(record.birthday).format("DD/MM/YYYY")}</>},
        { title: 'Year', dataIndex: 'year', key: 'year' },
        { title: "Gender", key: "gender", render: (record) => <>{record?.gender?.gender}</>,},
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => handleDelete(record.ID as number)}>Delete</Button>
        ),
      },
    ];

    return (
      <>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Student
        </Button>
        <Table dataSource={students} columns={columns} rowKey="ID" />

        <Modal
          title="Add Student"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreate} layout="vertical">
            <Form.Item
                name="student_id"
                label="Student ID"
                rules={[{ required: true, message: 'Please input the student ID!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="first_name"
                label="First Name"
                rules={[{ required: true, message: 'Please input the first name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="last_name"
                label="Last Name"
                rules={[{ required: true, message: 'Please input the last name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="major"
                label="Major"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
            >
                <Input.Password />
            </Form.Item>
          <Form.Item
            label="วัน/เดือน/ปี เกิด"
            name="birthday"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกวัน/เดือน/ปี เกิด !",
              },
            ]}
                  >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          <Form.Item
            name="year"
            label="Year"
          rules={[
            {
              required: true,
              message: 'Please input the year!',
            },
          ]}
                >
            <InputNumber style={{ width: '100%' }} min={1} 
              />
              </Form.Item>
            <Form.Item
                name="gender_id"
                label="เพศ"
                rules={[{ required: true, message: "กรุณาเลือกเพศ !" }]}
            >
                <Select
                    style={{ width: "100%" }}
                    options={[
                        { value: 0, label: "กรุณาเลือกเพศ", disabled: true },
                        { value: 1, label: "Male" },
                        { value: 2, label: "Female" },
                    ]}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
};

export default ManageStudents;
