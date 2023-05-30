import { Forms } from 'components/Phonebook/Phonebook.styled';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  useAddContactsMutation,
  useGetContactsQuery,
} from 'redux/contactsSlice';

const schema = yup.object().shape({
  name: yup.string().min(6).required(),
  phone: yup.string().min(7).max(9).required(),
});

export const PhonebookForm = () => {
  const [addContact] = useAddContactsMutation();
  const { data } = useGetContactsQuery();

  const handleSubmit = values => {
    if (
      data.some(el => el.name.toLowerCase().includes(values.name.toLowerCase()))
    ) {
      alert(`${values.name} is alreadyin contacts`);
      return;
    } else {
      addContact(values);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
      validationSchema={schema}
    >
      <Forms>
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage
            name="name"
            render={msg => <span style={{ color: 'red' }}>{msg}</span>}
          />
        </label>
        <label>
          Number
          <Field type="number" name="phone" />
          <ErrorMessage
            name="phone"
            render={msg => <span style={{ color: 'red' }}>{msg}</span>}
          />
        </label>
        <button type="submit">Add contact</button>
      </Forms>
    </Formik>
  );
};
