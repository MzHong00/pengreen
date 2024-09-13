import axios from "axios";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import { GrDocumentUpload } from "@react-icons/all-files/gr/GrDocumentUpload";

import { Button } from "shared/ui/Button";

import styles from "./choiceInput.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickCloseButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  dataIndex?: number;
}

export const ImageChoiceInput = ({
  dataIndex,
  onClickCloseButton,
  className,
  children,
  ...props
}: Props) => {
  const imageLoadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const file = e.currentTarget.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pengreen");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/db0ls9b6a/image/upload`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data.url); // 업로드된 이미지 URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className={styles.imageContainer}>
      <header className={styles.imageHeader}>
        <input
          className={`${styles.textInput} ${className}`}
          data-index={dataIndex}
          {...props}
        />
        <Button data-index={dataIndex} onClick={onClickCloseButton}>
          <IoMdClose color="red" size={18} />
        </Button>
      </header>
      <div>
        <label htmlFor="imageFile" className={styles.fileInput}>
          <GrDocumentUpload size={24} />
          {children}
        </label>
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          accept="image/*"
          onChange={imageLoadHandler}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
