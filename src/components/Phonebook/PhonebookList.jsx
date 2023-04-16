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
