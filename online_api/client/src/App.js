import { Layout } from 'antd';
import 'antd/dist/reset.css';
import { Route, Routes } from 'react-router-dom';
import AccountDetails from './components/AccountDetails';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import RoomDetails from './components/RoomDetails';
import RoomsMn from './components/RoomsMn';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './components/Search';
const { Content } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: '20px 15px',
          minHeight: '80vh',
        }}
      >
        <Routes>
          <Route index element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/search'
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path='/rooms-mn'
            element={
              <ProtectedRoute>
                <RoomsMn />
              </ProtectedRoute>
            }
          />
          <Route
            path='/playground'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/rooms/:roomId'
            element={
              <ProtectedRoute>
                <RoomDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
