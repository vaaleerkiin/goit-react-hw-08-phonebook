import { PhonebookForm } from 'components/Phonebook/PhonebookForm';
import { PhonebookList } from 'components/Phonebook/PhonebookList';
import { PhonebookFilter } from 'components/Phonebook/PhonebookFilter';
import { PhonebookWrap } from 'components/Phonebook/Phonebook.styled';

export const Phonebook = () => {
  return (
    <PhonebookWrap>
      <h2>Phonebook</h2>
      <PhonebookForm />
      <h2>Contacts</h2>
      <PhonebookFilter />
      <PhonebookList />
    </PhonebookWrap>
  );
};
