import { PhonebookForm } from 'components/Phonebook/PhonebookForm';
import { PhonebookList } from 'components/Phonebook/PhonebookList';
import { PhonebookFilter } from 'components/Phonebook/PhonebookFilter';
import {
  PhonebookWrap,
  FormsWrap,
} from 'components/Phonebook/Phonebook.styled';

const Phonebook = () => {
  return (
    <PhonebookWrap>
      <h2>Phonebook</h2>
      <FormsWrap>
        <PhonebookFilter /> <PhonebookForm />
      </FormsWrap>
      <PhonebookList />
    </PhonebookWrap>
  );
};

export default Phonebook;
