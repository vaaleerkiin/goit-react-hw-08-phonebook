import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Modal } from "antd";
import { RootState } from "redux/store";
import { useSelector } from "react-redux";
const { Dragger } = Upload;

interface IProps {
  open: boolean;
  toogleModal: () => void;
  refetch: () => void;
}
export const PhonebookAvatar: React.FC<IProps> = ({
  open,
  toogleModal,
  refetch,
}) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const props: UploadProps = {
    name: "avatar",
    multiple: true,
    action: "https://phonebook-0e5s.onrender.com/api/users/avatars",
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        refetch();
        toogleModal();
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      title={<h3 style={{ textAlign: "center" }}>Change avatar</h3>}
      open={open}
      onOk={toogleModal}
      onCancel={toogleModal}
      footer={null}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </Modal>
  );
};
