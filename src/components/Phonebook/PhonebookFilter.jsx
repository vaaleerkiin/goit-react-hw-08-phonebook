import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';

export const PhonebookFilter = () => {
  const state = useSelector(state => state.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={state}
        onChange={e => dispatch(changeFilter({ value: e.target.value }))}
      />
    </div>
  );
};
