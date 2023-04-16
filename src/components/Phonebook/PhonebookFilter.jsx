export const PhonebookFilter = ({ value, onChange }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </div>
  );
};
