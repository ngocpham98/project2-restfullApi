import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';
import { useEffect, useState } from 'react';

const Login = () => {
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
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        ...values,
      });

      localStorage.setItem('userInfo', JSON.stringify(data.data));
      message.success('Đăng nhập thành công');

      window.location.reload();
      setTimeout(() => {
        navigate('/playground');
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
        name='normal_login'
        className='login-form'
        onFinish={onFinish}
        style={{
          minWidth: 500,
          background: '#fff',
          padding: '20px 15px',
          borderRadius: 10,
        }}
      >
        <h1 className='text-center'>Đăng nhập</h1>
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
            className='login-form-button'
            loading={loading}
          >
            Đăng nhập
          </Button>
          <div className='mt-2'>
            Bạn chưa có tài khoản?
            <Link to='/signup' className='ml-2'>
              Đăng ký
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
