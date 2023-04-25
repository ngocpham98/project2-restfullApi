import { Form, Input, InputNumber, Modal, Spin, message } from 'antd';
import axios from 'axios';
import { apiUrl } from '../constants';
import { useEffect, useState } from 'react';

const RoomsMnModal = ({
  isShow,
  setShowModal,
  updateItem,
  setUpdateTable,
  updateTable,
}) => {
  const [form] = Form.useForm();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.post(`${apiUrl}/rooms/get_room`, {
        token: userInfo.token,
        room_id: updateItem,
      });

      setRoom(data.data);
    };
    if (updateItem) {
      fetchRoom();
    }
  }, [updateItem, isShow]);

  useEffect(() => {
    form.setFieldsValue({
      room_name: room?.room_name,
      max: room?.max,
    });
  }, [room]);

  const handleAdd = async () => {
    try {
      setLoading(true);
      form.validateFields().then(async (values) => {
        await axios.post(`${apiUrl}/rooms/add_room`, {
          ...values,
          token: userInfo.token,
        });
        message.success('Tạo phòng thành công');
        setShowModal(false);
        setUpdateTable(!updateTable);
      });
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      form.validateFields().then(async (values) => {
        await axios.post(`${apiUrl}/rooms/edit_room`, {
          ...values,
          room_id: updateItem,
          token: userInfo.token,
        });
        message.success('Sửa phòng thành công');
        setShowModal(false);
        setUpdateTable(!updateTable);
      });
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={isShow}
      title={updateItem ? 'Chỉnh sửa room' : 'Thêm mới room'}
      onOk={updateItem ? handleUpdate : handleAdd}
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      {!room && updateItem ? (
        <Spin />
      ) : (
        <>
          <Form
            form={form}
            name='normal_room'
            className='room-form'
            initialValues={{
              room_name: updateItem && room.room_name,
              max: updateItem && room.max,
            }}
          >
            <Form.Item
              name='room_name'
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập tên phòng!',
                },
              ]}
            >
              <Input placeholder='Tên phòng' />
            </Form.Item>
            <Form.Item name='max'>
              <InputNumber
                style={{ width: 200 }}
                min={1}
                placeholder='Số người chơi tối đa'
              />
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default RoomsMnModal;
