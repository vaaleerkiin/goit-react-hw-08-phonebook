import PropTypes from 'prop-types';
export const PhonebookFilter = ({ value, onChange }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" name="filter" value={value} onChange={onChange} />
    </div>
  );
};

PhonebookFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
