import React from 'react';

const AccountDetails = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <div className='container'>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '10px 15px',
          borderRadius: 10,
        }}
      >
        <p>ID: {userInfo.id}</p>
        <p>Username: {userInfo.username}</p>
        <p>Email: {userInfo.email || 'N/A'}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
