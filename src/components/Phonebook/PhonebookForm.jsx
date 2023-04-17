import { Forms } from 'components/Phonebook/Phonebook.styled';
import { Formik, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(6).required(),
  number: yup.string().min(7).max(9).required(),
});
export const PhonebookForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
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

PhonebookForm.propTypes = { onSubmit: PropTypes.func.isRequired };
