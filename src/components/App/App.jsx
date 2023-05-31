import { Containers } from 'components/Containers/Container';
import { Wrap } from 'components/App/App.styled';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operation';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Wrap>
        <Containers>
          <Phonebook />
        </Containers>
      </Wrap>
      <ToastContainer />
    </>
  );
};
