import { useSelector, useDispatch } from 'react-redux';
import { removeContacts } from 'redux/contactsSlice';

export const PhonebookList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.data);
  const filter = useSelector(state => state.filter);

  const visibleContacts = () => {
    return [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  if (!contacts.length) {
    return;
  }

  return (
    <ul>
      {visibleContacts().map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <button
            type="button"
            onClick={() => dispatch(removeContacts({ id }))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
