"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import useSubmitText from "@/hooks/useSubmitText";

const Page = () => {
  const {
    handleSubmitText,
    setAuthor,
    setImage,
    setText,
    setTitle,
    setImageURL,
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
        <label>
          Text
          <textarea
            onChange={(e) => setText(e.target.value)}
            spellCheck="false"
            required
          ></textarea>
        </label>

        <Input
          labelText="Title"
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          labelText="Author"
          type="text"
          required
          onChange={(e) => setAuthor(e.target.value)}
        />
        <div className="flex flex-col mt-4">
          <Input
            labelText="Choose image"
            type="file"
            name="text-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files)}
          />

          <span className="text-center mt-4">OR</span>

          <Input
            labelText="Image URL"
            type="text"
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <Button>Upload</Button>
      </form>
    </section>
  );
};

export default Page;
