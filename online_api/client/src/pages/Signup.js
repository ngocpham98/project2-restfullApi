import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';
import { useEffect, useState } from 'react';

const Singup = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!userInfo) {
      navigate('/playground');
    }
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/auth/signup`, {
        ...values,
      });

      message.success('Đăng ký thành công');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.log(error);
      message.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        name='normal_sigup'
        className='signup-form'
        onFinish={onFinish}
        style={{
          minWidth: 500,
          background: '#fff',
          padding: '20px 15px',
          borderRadius: 10,
        }}
      >
        <h1 className='text-center'>Đăng ký</h1>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Hãy nhập Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Hãy nhập Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              width: '100%',
            }}
            type='primary'
            htmlType='submit'
            className='signup-form-button'
            loading={loading}
          >
            Đăng ký
          </Button>
          <div className='mt-2'>
            Bạn đã có tài khoản?
            <Link to='/' className='ml-2'>
              Đăng nhập
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Singup;
