import { deleteContact } from 'redux/contacts/operations';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
export const PhonebookItem = ({ name, phone, id }) => {
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  return (
    <li>
      {name}: {phone}
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          dispatch(deleteContact(id));
        }}
      >
        {isLoading && <ClipLoader size={6} />}
        Delete
      </button>
    </li>
  );
};
