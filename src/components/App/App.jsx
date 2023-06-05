import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from 'components/SharedLayout/SharedLayout';
import { useGetUserQuery } from 'redux/Auth/operations';
import { Phonebook } from 'pages/Phonebook';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MoonLoader from 'react-spinners/MoonLoader';

export const App = () => {
  const { isLoading } = useGetUserQuery();

  return (
    <>
      {isLoading ? (
        <div
          style={{
            backgroundColor: '#001529',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoonLoader size={50} color=" #1677ff" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Navigate to="contacts" />} />
            <Route path="contacts" element={<Phonebook />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Routes>
      )}

      <ToastContainer position="top-center" />
    </>
  );
};
