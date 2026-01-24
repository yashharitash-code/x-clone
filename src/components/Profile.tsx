'use client'
import React from 'react'
import Image from 'next/image'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useGetUser } from '../../custom-hooks/useGetUser'
import { Avatar } from '@mui/joy'
export default function Profile() {
    const { session, loading, profile } = useGetUser();
    if (!session) return null;
    if (!profile) return null;
    if (loading) return <h1 className='text-2xl text-white'>Loading...</h1>;
    return (
        <div className="mt-10 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
                {profile?.avatar_url && (<Avatar
                    src={profile.avatar_url}
                    alt="profile-pic"
                />)}
                <div className='hidden lg:block'>
                    <p className='font-semibold'>{profile?.name}</p>
                    <p className='text-secondary-text font-light'>@{profile?.username}</p>
                </div>
            </div>
            <HiDotsHorizontal className='hidden lg:block' />
        </div>
    )
}
