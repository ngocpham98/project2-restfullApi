import { Button, Input, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../constants';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const RoomDetails = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoom = async (id) => {
      try {
        setLoading(true);
        const { data } = await axios.post(`${apiUrl}/rooms/get_room`, {
          token: userInfo.token,
          room_id: id,
        });
        setRoom(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom(roomId);
  }, [roomId]);

  return (
    <div className='container'>
      <Button type='primary' className='mb-4' onClick={() => navigate(-1)}>
        Quay lại
      </Button>
      {loading ? (
        <>
          <Spin />
        </>
      ) : (
        <>
          {!!room ? (
            <div
              style={{
                borderRadius: 10,
                backgroundImage: `url('/room-inside.jpg')`,
                width: '100%',
                backgroundSize: 'cover',
                height: 500,
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <ReactAudioPlayer
                src='/room-music.mp3'
                autoPlay
                volume={0.5}
                loop
              />
              <div className='flex items-start justify-between py-8 px-4'>
                <div>
                  <h1 className='text-white font-bold'>{room.room_name}</h1>
                  <p className='text-white'>Host: {room.author.username}</p>
                </div>
                <div className='flex items-end justify-start flex-col'>
                  <p className='text-white'>Số người chơi: {room.current}</p>
                  <p className='text-white'>Số người tối đa: {room.max}</p>
                  <p className='text-white'>Tốc độ: {room.speed}x</p>
                </div>
              </div>

              <div className='absolute bottom-2 py-8 px-4'>
                <Space direction='horizontal'>
                  <Input placeholder='Nhập nội dung chat...' />
                  <Button type='primary'>Gửi</Button>
                </Space>
              </div>
            </div>
          ) : (
            <p className='mt-8'>No data</p>
          )}
        </>
      )}
    </div>
  );
};

export default RoomDetails;
