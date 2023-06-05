import { PhonebookForm } from 'components/Phonebook/PhonebookForm';
import { PhonebookList } from 'components/Phonebook/PhonebookList';
import { PhonebookFilter } from 'components/Phonebook/PhonebookFilter';
import {
  PhonebookWrap,
  FormsWrap,
} from 'components/Phonebook/Phonebook.styled';
import { useGetContactsQuery } from 'redux/contacts/contactsSlice';

const Phonebook = () => {
  const { data, isLoading, error } = useGetContactsQuery();

  return (
    <PhonebookWrap>
      <h2>Phonebook</h2>
      <FormsWrap>
        <PhonebookFilter /> <PhonebookForm data={data} />
      </FormsWrap>
      <PhonebookList data={data} isLoading={isLoading} error={error} />
    </PhonebookWrap>
  );
};

export default Phonebook;
