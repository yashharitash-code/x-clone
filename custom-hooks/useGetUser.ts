import { useState, useEffect } from 'react';
import { useUserSession } from './useUserSession';
import { supabase } from '../lib/SupabaseClient';

type Profile = {
    username: string;
    name: string;
    avatar_url: string;
    email: string;
};

export const useGetUser = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { session } = useUserSession();
    const [loading, setLoading] = useState(true);
    const userId = session?.user.id ?? null;

    useEffect(() => {
        if (!userId) return;

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, name, avatar_url, email')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                console.error('ProfileError:', error);
                setProfile(null);
            } else {
                setProfile(data);
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    return { profile, session, loading };
};
