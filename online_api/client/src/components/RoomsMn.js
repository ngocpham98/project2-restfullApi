import { Button, Popconfirm, Space, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../constants';
import { Link } from 'react-router-dom';
import RoomsMnModal from './RoomsMnModal';

const RoomsMn = () => {
  const [rooms, setRooms] = useState([]);
  const [updateItem, setUpdateItem] = useState();
  const [showModal, setShowModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.post(`${apiUrl}/rooms/get_list_rooms`, {
        token: userInfo.token,
      });

      setRooms(data.data?.rooms);
    };

    fetchRooms();
  }, [updateTable]);

  const handleDelete = async (room_id) => {
    try {
      await axios.post(`${apiUrl}/rooms/delete_room`, {
        token: userInfo.token,
        room_id,
      });
      message.success('Xóa phòng thành công');
      setUpdateTable(!updateTable);
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      setUpdateItem(id);
      setShowModal(true);
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || error.message);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'room_id',
      key: 'room_id',
    },
    {
      title: 'Tên room',
      dataIndex: 'room_name',
      key: 'room_name',
    },
    {
      title: 'Số người chơi',
      dataIndex: 'players',
      key: 'players',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <div className='flex items-center justify-between'>
            <Link to={`/rooms/${record.room_id}`}>
              <Button className='mr-2'>Xem</Button>
            </Link>
            <Button className='mr-2' onClick={() => handleEdit(record.room_id)}>
              Sửa
            </Button>
            <Popconfirm
              title='Bạn có chắc chắn xóa?'
              onConfirm={() => handleDelete(record.room_id)}
            >
              <Button>Xóa</Button>
            </Popconfirm>
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className='container'>
      <div className='flex items-center justify-between mb-4'>
        <h1>Quản lý room</h1>
        <Button type='primary' onClick={() => setShowModal(true)}>
          Thêm mới
        </Button>
      </div>
      <Table columns={columns} dataSource={rooms} />
      <RoomsMnModal
        isShow={showModal}
        setShowModal={setShowModal}
        updateItem={updateItem}
        setUpdateTable={setUpdateTable}
        updateTable={updateTable}
      />
    </div>
  );
};

export default RoomsMn;
