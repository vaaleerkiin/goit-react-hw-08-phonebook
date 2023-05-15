import { Forms } from 'components/Phonebook/Phonebook.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(6).required(),
  number: yup.string().min(7).max(9).required(),
});
export const PhonebookForm = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.contacts.data);

  const handleSubmit = ({ name, number }) => {
    if (state.some(el => el.name.toLowerCase().includes(name.toLowerCase()))) {
      alert(`${name} is alreadyin contacts`);
      return;
    } else {
      dispatch(addContacts({ name, number }));
    }
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
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
          <ErrorMessage name="name" render={msg => <div>{msg}</div>} />
        </label>
        <label>
          Number
          <Field type="number" name="number" />
          <ErrorMessage name="number" render={msg => <div>{msg}</div>} />
        </label>
        <button type="submit">Add contact</button>
      </Forms>
    </Formik>
  );
};
