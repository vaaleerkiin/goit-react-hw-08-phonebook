import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { Input, Tooltip } from 'antd';

export const PhonebookFilter = () => {
  const state = useSelector(state => state.filter);
  const dispatch = useDispatch();
  return (
    <div>
      <Tooltip
        trigger={['focus']}
        title="Find contacts by name"
        placement="topLeft"
      >
        <Input
          type="text"
          name="filter"
          placeholder="Find contacts by name"
          value={state}
          style={{ maxWidth: 300 }}
          onChange={e => dispatch(changeFilter({ value: e.target.value }))}
        />
      </Tooltip>
    </div>
  );
};
