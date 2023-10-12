import { createText } from "@/services/api/createText";
import { ImageResponse, uploadToImgbb } from "@/services/api/uploadToImgbb";
import React, { useState } from "react";

const useSubmitText = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const [imageURL, setImageURL] = useState("");

  const handleSubmitText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imgbbUrl: ImageResponse | null = null;
    if (image || imageURL !== "") {
      const form = new FormData();
      form.append("image", image?.[0] || imageURL);

      imgbbUrl = await uploadToImgbb(form);
    }

    const textData = {
      text,
      title,
      author,
      image: imgbbUrl?.data?.url || null,
    };

    const response = await createText(textData);
    console.log(response);
  };

  return {
    setText,
    setTitle,
    setAuthor,
    setImage,
    setImageURL,
    handleSubmitText,
  };
};

export default useSubmitText;
