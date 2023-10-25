import Link from "next/link";
import Title from "./Title";

const SignUpModal = () => {
  return (
    <div className="bg-neutral-900 text-white p-4 rounded">
      <Title>
        <h2 className="mb-2">Sign Up</h2>
      </Title>
      <p>Create an account to save your progress.</p>
      <Link
        href="/sign-up"
        className="block w-[max-content] ml-auto bg-white rounded text-neutral-900 font-bold mt-2 px-2 py-1"
      >
        Create
      </Link>
    </div>
  );
};

export default SignUpModal;
