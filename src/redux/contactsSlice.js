import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = { data: [] };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContacts: (state, { payload }) => {
      state.data.unshift({
        id: nanoid(10),
        name: payload.name,
        number: payload.number,
      });
    },
    removeContacts: (state, { payload }) => {
      return state.data.filter(({ id }) => payload.id !== id);
    },
  },
});

export const { addContacts, removeContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
