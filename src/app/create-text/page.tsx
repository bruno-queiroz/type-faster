"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import useSubmitText from "@/hooks/useSubmitText";

const Page = () => {
  const {
    handleSubmitText,
    setAuthor,
    author,
    setImage,
    image,
    setText,
    text,
    setTitle,
    title,
    setImageURL,
    imageURL,
  } = useSubmitText();

  return (
    <section className="flex flex-col items-center p-4">
      <h1>
        <Title>Create text</Title>
      </h1>

      <form
        className="flex flex-col gap-4 max-w-[400px] w-full"
        onSubmit={handleSubmitText}
      >
        <label className="flex flex-col gap-1">
          Text
          <textarea
            onChange={(e) => setText(e.target.value)}
            className="border-[2px] border-neutral-900 rounded p-2"
            rows={5}
            spellCheck="false"
            required
            value={text}
          ></textarea>
        </label>

        <Input
          labelText="Title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          labelText="Author"
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="flex flex-col mt-4">
          <Input
            labelText="Choose image"
            type="file"
            name="text-image"
            accept="image/*"
            value={image as any}
            onChange={(e) => setImage(e.target.value)}
          />

          <span className="text-center mt-4">OR</span>

          <Input
            labelText="Image URL"
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <Button>Upload</Button>
      </form>
    </section>
  );
};

export default Page;
