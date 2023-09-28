import Button from "@/components/Button";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { SiGithub as GithubIcon } from "react-icons/si";

const page = () => {
  return (
    <section className="flex flex-col items-center p-4">
      <h1 className="mb-4">
        <Title>Sign Up</Title>
      </h1>
      <div className="max-w-[400px] w-full">
        <form className="flex flex-col gap-4">
          <Input labelText="Nickname" type="text" />
          <Input labelText="Email" type="email" />
          <Input labelText="Password" type="password" />

          <Button py="0.75rem">Create Account</Button>
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <button className="flex justify-center items-center gap-1 py-1 px-4 rounded border-[2px] border-neutral-700 text-neutral-700">
            <GoogleIcon className="text-xl" />
            <span>Sign up with Google</span>
          </button>
          <button className="flex justify-center items-center gap-1 py-1 px-4 rounded border-[2px] border-neutral-700 text-neutral-700">
            <GithubIcon className="text-xl" />
            <span>Sign up with Github</span>
          </button>
        </div>
        <div className="flex flex-col items-center mt-4 gap-2 text-neutral-700">
          <span>Already have an account?</span>

          <button className="py-2 px-4 rounded font-bold text-neutral-700 border-neutral-900 border-[2px] w-full">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
