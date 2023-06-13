import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { Input } from 'antd';

export const PhonebookFilter = () => {
  const state = useSelector(state => state.filter);
  const dispatch = useDispatch();
  return (
    <Input
      type="text"
      name="filter"
      placeholder="Find contacts by name"
      value={state}
      style={{ maxWidth: 200 }}
      onChange={e => dispatch(changeFilter({ value: e.target.value }))}
    />
  );
};
