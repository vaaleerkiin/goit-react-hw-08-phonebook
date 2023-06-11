import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BeatLoader from 'react-spinners/BeatLoader';
import { PhonebookItem } from './PhonebookItem';

export const PhonebookList = ({ data, isLoading, error }) => {
  const filter = useSelector(state => state.filter);

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
        <ul style={{ width: '100%', padding: 0 }}>
          {visibleContacts().map(({ name, number, id }) => (
            <PhonebookItem
              key={id}
              id={id}
              name={name}
              number={number}
              data={data}
            />
          ))}
        </ul>
      )}
      {error && toast.error(error.error) && null}
    </>
  );
};
