import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';
import { useGetContactsQuery } from 'redux/contactsSlice';
import { PhonebookItem } from './PhoneBookItem';

export const PhonebookList = () => {
  const filter = useSelector(state => state.filter);

  const { data, error, isLoading } = useGetContactsQuery();

  const visibleContacts = () => {
    return [...data].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <>
      {isLoading && (
        <BeatLoader
          cssOverride={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      )}
      {data && !isLoading && (
        <ul>
          {visibleContacts().map(({ name, phone, id }) => (
            <PhonebookItem key={id} id={id} name={name} phone={phone} />
          ))}
        </ul>
      )}
      {error && toast.error(error.error) && null}
    </>
  );
};
