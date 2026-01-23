'use client'
import React, { use, useEffect, useState } from 'react'
import { supabase } from '../../../../lib/SupabaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Page() {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<null | User>(null)
    const [isChecking, setIsChecking] = useState(true);

    const setupUserProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !name || !username) {
            setMessage("All fields are required.");
            return;
        }

        //upload user avatar
        const timestamp = Date.now();
        const imagePath = `${timestamp}-${image.name}`;
        const { error: imgError } = await supabase.storage.from('avatars').upload(imagePath, image);

        if (imgError) {
            setMessage("Image upload failed. Please try again.");
            return;
        }

        //generate public url for the uploaded image
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(imagePath);

        //insert data into profiles table
        const { error: insertError } = await supabase.from('profiles').insert({
            username,
            email: user?.email,
            name,
            avatar_url: publicUrl,
            id: user?.id
        });

        if (insertError) {
            setMessage("Profile setup failed. Please try again.");
            return;
        }

        setMessage("Profile setup successful.");
        setTimeout(() => {
            router.replace('/home');
        }, 2000);


    }

    useEffect(() => {
        const handleAuth = async () => {
            const { error: userError, data: { user } } = await supabase.auth.getUser()
            if (userError || !user) {
                router.replace('/auth/signup');
                return
            }

            setUser(user);

            //check if the user already has a profile
            const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
            if (profileError) {
                router.replace('/auth/signup');
                return;
            }
            if (profile) {
                router.replace('/home');
                return;
            }
            setIsChecking(false);
        }
        handleAuth();
    }, []);

    if (isChecking) {
        return <h1 className='text-xl text-white'>Checking Profile...</h1>;
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
                <h2 className="font-bold text-3xl text-primary-text mb-12">
                    Setup Profile
                </h2>
                {message && <p className="bg-primary py-1 mb-4 font-semibold text-center">{message}</p>}
                <form onSubmit={setupUserProfile}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="mb-6 w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
                    <label htmlFor='avatar' className='text-white block py-2' >Profile Picture</label>
                    <input onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const file = files[0];
                        setImage(file);
                    }} id="avatar" type="file" className="w-full bg-background outline-none rounded-md p-4 placeholder-secondary-text border border-border text-white" />
                    <button className="text-black w-full mt-8 rounded-full flex h-10 items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white ">Continue</button>
                </form>


            </div>

        </div>
    )
}
