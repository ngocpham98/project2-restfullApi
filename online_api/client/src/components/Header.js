import { DownOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Space } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const { Header: AntdHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
    window.location.reload();
  };

  const items = [
    {
      label: <Link to='/account'>Thông tin tài khoản</Link>,
      key: '0',
    },
    {
      label: <Link to='/rooms-mn'>Quản lý room</Link>,
      key: '2',
      hidden: userInfo?.is_admin === '0',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={handleLogout}>Đăng xuất</div>,
      key: '1',
    },
  ];

  return (
    <AntdHeader
      style={{
        background: '#fff',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <div className='flex items-end justify-between h-full'>
        <Link
          to='/'
          style={{
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Roomy <span className='text-sm'>v1.0</span>
        </Link>
        {!!userInfo && (
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <Space className='cursor-pointer'>
                <BellOutlined />
                <span>{userInfo.username}</span>
                <Avatar
                  src={userInfo.avatar}
                  icon={<UserOutlined />}
                  size='large'
                />
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        )}
      </div>
    </AntdHeader>
  );
};

export default Header;
