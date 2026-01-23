"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { signUpUser } from "../../../../services/auth";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/SupabaseClient";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setMessage("All fields are required.");
            return;
        }

        const result = await signUpUser(email, password);
        if (result?.error) {
            setMessage(result.error);
            return;
        } else {
            setMessage("Signup successful");
            setTimeout(() => {
                router.replace('/auth/callback');
            }, 2000);
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.replace('/auth/callback');
            }
        };
        checkSession();
    }, []);
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
                <h2 className="font-bold text-3xl text-primary-text mb-12">
                    Sign up to X
                </h2>
                {message && <p className="bg-primary py-1 mb-4 font-semibold text-center">{message}</p>}
                <form onSubmit={signup}>
                    <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
                    <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
                    <button className="text-black w-full mt-8 rounded-full flex h-10 items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white ">Continue</button>
                </form>



                <div className="text-secondary-text mt-8">
                    <span className="mr-1">Already have an account?</span>
                    <Link href="/" className="text-primary">Sign in</Link>
                </div>
            </div>

        </div>
    );
}