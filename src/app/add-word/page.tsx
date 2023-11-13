"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { useSubmitWord } from "@/hooks/useSubmitWord";

const Page = () => {
  const { handleSubmitWord, setWord, word } = useSubmitWord();
  return (
    <section
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmitWord}
    >
      <h1>
        <Title>Add word</Title>
      </h1>

      <form className="flex flex-col gap-4">
        <Input
          labelText="Word"
          type="text"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />

        <Button>Add word</Button>
      </form>
    </section>
  );
};

export default Page;
