import { Modal, Button } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const DocsModal = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModal = () => setIsModalOpen(prevState => !prevState);

  return (
    <>
      <a
        href="https://github.com/vaaleerkiin/goit-react-hw-08-phonebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/vaaleerkiin/goit-react-hw-08-phonebook
      </a>
      {isLoggedIn && (
        <>
          <Button type="primary" size="large" onClick={toogleModal}>
            Docs
          </Button>
          <Modal
            width={1440}
            title="Docs"
            open={isModalOpen}
            onOk={toogleModal}
            onCancel={toogleModal}
            footer={null}
          >
            <iframe
              title="docs"
              src="https://connections-api.herokuapp.com/docs/"
              style={{
                width: '100%',
                maxHeight: 500,
                minHeight: 500,
                border: '1px solid black',
                borderRadius: 4,
              }}
            ></iframe>
          </Modal>
        </>
      )}
    </>
  );
};
