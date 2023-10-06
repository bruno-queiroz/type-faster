import { createText } from "@/services/api/createText";
import { uploadToImgbb } from "@/services/api/uploadToImgbb";
import React, { useState } from "react";

const useSubmitText = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<FileList | null>(null);

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("image", image?.[0] || "");

    const imageUrl = await uploadToImgbb(form);

    const textData = {
      text,
      title,
      author,
      image: imageUrl?.data?.url,
    };

    await createText(textData);
  };

  return {
    setText,
    setTitle,
    setAuthor,
    setImage,
    handleSubmitText,
  };
};

export default useSubmitText;
