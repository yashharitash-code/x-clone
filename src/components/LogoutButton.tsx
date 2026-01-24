'use client'

import Link from "next/link";
import { useUserSession } from "../../custom-hooks/useUserSession"
import { supabase } from "../../lib/SupabaseClient";
import Button from '@mui/joy/Button';

export default function LogoutButton() {
    const { session } = useUserSession();
    const LogoutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('LogoutError:', error.message);
        }
    }
    return (
        <>
            {
                session ? (<Button size="md" variant="outlined" color="neutral" onClick={LogoutUser} className="w-full">
                    Logout
                </Button>) : (<Link className="hidden lg:block bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer text-center" href="/">Login </Link>)
            }
        </>

    )
}
