"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import useSubmitText from "@/hooks/useSubmitText";

const Page = () => {
  const { handleSubmitText, setAuthor, setImage, setText, setTitle } =
    useSubmitText();

  return (
    <section className="p-4">
      <h1>
        <Title>Create text</Title>
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmitText}>
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

        <Input
          labelText="Choose image"
          type="file"
          required
          name="text-image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
        />

        <Button>Upload</Button>
      </form>
    </section>
  );
};

export default Page;
