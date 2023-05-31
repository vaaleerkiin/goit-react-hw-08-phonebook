import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';
import { PhonebookItem } from './PhoneBookItem';

export const PhonebookList = () => {
  const filter = useSelector(state => state.filter);
  const data = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
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
