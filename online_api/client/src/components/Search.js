import React, { useEffect, useState } from 'react';
import { useBoundStore } from '../store';
import axios from 'axios';
import { apiUrl } from '../constants';
import { Avatar, Card, Col, Form, List, Row, Input } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;
const { Search: AntdSearch } = Input;

const Search = () => {
  const [form] = Form.useForm();
  const keyword = useBoundStore((state) => state.keyword);
  const [data, setData] = useState();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const updateKeyword = useBoundStore((state) => state.updateKeyword);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(`${apiUrl}/search`, {
        keyword,
        token: userInfo.token,
      });

      setData(data.data.result);
    };
    fetchData();
  }, [keyword]);

  const onFinish = async (values) => {
    updateKeyword(values.keyword);
  };

  const onSearch = async (value) => {
    updateKeyword(value);
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
            <AntdSearch
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

      <h1 className='mb-4'>Kết quả tìm kiếm cho từ khóa "{keyword}"</h1>
      <h3>Rooms</h3>
      {data?.rooms?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {data?.rooms?.map((room) => (
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
        </Row>
      ) : (
        <span>Không có dữ liệu</span>
      )}

      <h3 className='mt-4'>Người dùng (username)</h3>
      {data?.users?.length > 0 ? (
        <List
          itemLayout='horizontal'
          dataSource={data?.users}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={item.username}
                description={item.username}
              />
            </List.Item>
          )}
        />
      ) : (
        <span>Không có dữ liệu</span>
      )}

      <h3 className='mt-4'>Comments</h3>
      {data?.comments?.length > 0 ? (
        <List
          itemLayout='horizontal'
          dataSource={data?.comments}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={item.author.username}
                description={item.content}
              />
            </List.Item>
          )}
        />
      ) : (
        <span>Không có dữ liệu</span>
      )}
    </div>
  );
};

export default Search;
