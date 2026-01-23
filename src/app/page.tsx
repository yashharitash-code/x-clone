import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
        <h2 className="font-bold text-3xl text-primary-text">
          Sign in to X
        </h2>
        <button className="bg-white w-full mt-8 h-10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full">
          <Image
            src="/images/google-icon.png"
            alt="Google Logo"
            width={470}
            height={470}
            className="w-6 h-6 object-cover"
          />
          <span>Sign in with Google</span>
        </button>
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-border"></div>
          <span className="mx-4 text-md text-primary-text">or</span>
          <div className="flex-grow h-px bg-border"></div>
        </div>
        <input type="text" placeholder="Phone, Email or Username" className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
        <button className="text-black w-full mt-8 rounded-full flex h-10 items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white ">Continue</button>
        <button className="text-white w-full mt-8 rounded-full flex h-10 items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold border border-border hover:text-black">Forgot Password</button>

        <div className="text-secondary-text mt-8">
          <span className="mr-1">Don&apos;t have an account?</span>
          <Link href="#" className="text-primary">Sign up</Link>
        </div>
      </div>

    </div>
  );
}