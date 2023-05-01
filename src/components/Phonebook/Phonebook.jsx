import React, { useState, useEffect, useRef } from 'react';
import { PhonebookForm } from 'components/Phonebook/PhonebookForm';
import { PhonebookList } from 'components/Phonebook/PhonebookList';
import { PhonebookFilter } from 'components/Phonebook/PhonebookFilter';
import { PhonebookWrap } from 'components/Phonebook/Phonebook.styled';
import { nanoid } from 'nanoid';
const LOCAL_KEY = 'contacts';
export const Phonebook = () => {
  const [contacts, setContacts] = useState([
    // { id: nanoid(10), name: 'Rosie Simpson', number: '459-12-56' },
    // { id: nanoid(10), name: 'Hermione Kline', number: '443-89-12' },
    // { id: nanoid(10), name: 'Eden Clements', number: '645-17-79' },
    // { id: nanoid(10), name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const firstLoad = useRef(true);
  useEffect(() => {
    if (localStorage.getItem(LOCAL_KEY)) {
      const contacts = JSON.parse(localStorage.getItem(LOCAL_KEY));
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    setContacts(prevState => {
      if (
        prevState.some(el => el.name.toLowerCase().includes(name.toLowerCase()))
      ) {
        alert(`${name} is alreadyin contacts`);
        return [...prevState];
      } else
        return [
          ...prevState,
          { id: nanoid(10), name, number: formatNumber(number) },
        ];
    });
  };

  const handleChange = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    return [...contacts].filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteById = elId => {
    setContacts(prevState => {
      return [...prevState].filter(({ id }) => elId !== id);
    });
  };

  return (
    <PhonebookWrap>
      <h2>Phonebook</h2>
      <PhonebookForm onSubmit={handleSubmit}></PhonebookForm>
      <h2>Contacts</h2>
      <PhonebookFilter value={filter} onChange={handleChange} />
      <PhonebookList onClick={deleteById} contacts={visibleContacts()} />
    </PhonebookWrap>
  );
};

const formatNumber = number => {
  number = String(number);
  return (
    number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5, 9)
  );
};
