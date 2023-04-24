import PropTypes from 'prop-types';

export const PhonebookList = ({ contacts, onClick }) => {
  if (!contacts.length) {
    return;
  }
  return (
    <ul>
      {contacts.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <button type="button" onClick={() => onClick(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
PhonebookList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};
