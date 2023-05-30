import { Containers } from 'components/Containers/Container';
import { Wrap } from 'components/App/App.styled';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ToastContainer } from 'react-toastify';

export const App = () => {
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
