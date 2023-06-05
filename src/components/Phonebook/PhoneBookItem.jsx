import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { useDeleteContactsMutation } from 'redux/contacts/contactsSlice';
export const PhonebookItem = ({ name, phone, id }) => {
  const [deleteContatctById, { isLoading, isSuccess, isError }] =
    useDeleteContactsMutation();

  useEffect(() => {
    if (isError) {
      toast.error('Fail');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Success');
    }
  }, [isSuccess]);

  return (
    <li>
      {name}: {phone}
      <Button
        loading={isLoading}
        disabled={isLoading}
        type="primary"
        size="large"
        onClick={() => {
          deleteContatctById(id);
        }}
      >
        Delete
      </Button>
    </li>
  );
};
