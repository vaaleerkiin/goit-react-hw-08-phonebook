import { useDeleteContactsMutation } from 'redux/contactsSlice';
import ClipLoader from 'react-spinners/ClipLoader';
export const PhonebookItem = ({ name, phone, id }) => {
  const [deleteContact, { isLoading: isUpdating }] =
    useDeleteContactsMutation();

  return (
    <li>
      {name}: {phone}
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => {
          deleteContact(id);
        }}
      >
        {isUpdating && <ClipLoader size={6} />}
        Delete
      </button>
    </li>
  );
};
