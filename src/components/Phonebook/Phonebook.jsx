import React, { Component } from 'react';
import { PhonebookForm } from 'components/Phonebook/PhonebookForm';
import { PhonebookList } from 'components/Phonebook/PhonebookList';
import { PhonebookFilter } from 'components/Phonebook/PhonebookFilter';
import { PhonebookWrap } from 'components/Phonebook/Phonebook.styled';

import { nanoid } from 'nanoid';
export class Phonebook extends Component {
  state = {
    contacts: [
      { id: nanoid(10), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(10), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(10), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(10), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formatNumber = number => {
    number = String(number);
    return (
      number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5, 9)
    );
  };

  handleSubmit = ({ name, number }) => {
    this.setState(prevState => {
      if (
        prevState.contacts.some(el =>
          el.name.toLowerCase().includes(name.toLowerCase())
        )
      ) {
        return alert(`${name} is alreadyin contacts`);
      } else
        return {
          contacts: [
            ...prevState.contacts,
            { id: nanoid(10), name, number: this.formatNumber(number) },
          ],
        };
    });
  };

  handleChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    console.log(this.state.contacts);
    return [...this.state.contacts].filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteById = elId => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts].filter(({ id }) => elId !== id),
      };
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <PhonebookWrap>
        <h2>Phonebook</h2>
        <PhonebookForm onSubmit={this.handleSubmit}></PhonebookForm>
        <h2>Contacts</h2>
        <PhonebookFilter value={filter} onChange={this.handleChange} />
        <PhonebookList
          onClick={this.deleteById}
          contacts={this.visibleContacts()}
        />
      </PhonebookWrap>
    );
  }
}
