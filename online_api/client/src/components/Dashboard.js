import { Avatar, Card, Col, Form, Input, Row, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';
import { useBoundStore } from '../store';
const { Search } = Input;
const { Meta } = Card;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const Dashboard = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const updateKeyword = useBoundStore((state) => state.updateKeyword);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.post(`${apiUrl}/rooms/get_list_rooms`, {
        token: userInfo.token,
      });
      setRooms(data.data.rooms);
    };
    fetchRooms();
  }, []);

  const onFinish = async (values) => {
    updateKeyword(values.keyword);
    navigate(`/search`);
  };

  const onSearch = async (value) => {
    updateKeyword(value);
    navigate(`/search`);
  };

  return (
    <div className='container'>
      <div className='flex items-center justify-center'>
        <Form
          form={form}
          name='normal_room'
          className='room-form'
          onFinish={onFinish}
        >
          <Form.Item name='keyword'>
            <Search
              onSearch={onSearch}
              placeholder='Tìm kiếm phòng, người chơi, bình luận...'
              size='middle'
              style={{
                width: 500,
              }}
            />
          </Form.Item>
        </Form>
      </div>

      <Row gutter={[16, 16]} className='mt-8'>
        {rooms?.length > 0 ? (
          <>
            {rooms?.map((room) => (
              <Col xs={24} sm={12} md={6}>
                <Link to={`/rooms/${room.room_id}`}>
                  <Card hoverable cover={<img alt='example' src='/room.png' />}>
                    <Meta
                      avatar={
                        <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
                      }
                      title={room.room_name}
                      description={`${room.players} người đang chơi`}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </>
        ) : (
          <>
            <Spin />
          </>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
