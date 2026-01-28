"use client"

import React from 'react'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { FiRepeat } from 'react-icons/fi'
import { IoIosStats } from 'react-icons/io'
import { useGetTweets } from '../../custom-hooks/useTweet'
import { Avatar } from '@mui/material'



export default function Posts() {
    const { data: tweets, isLoading, isError } = useGetTweets()

    if (isLoading) {
        return (
            <div className="text-white text-center py-10">
                Loading posts...
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center py-10">
                Error loading posts. Please try again.
            </div>
        )
    }

    if (!tweets || tweets.length === 0) {
        return (
            <div className="text-secondary-text text-center py-10">
                No tweets yet. Be the first to post!
            </div>
        )
    }

    return (
        <div>
            {tweets.map((tweet) => (
                <div key={tweet.id} className="px-4 py-2 flex gap-3 border-b border-border">
                    <Avatar
                        src={tweet.profiles.avatar_url || '/images/image1.jpg'}
                        alt='profile-pic'
                    />
                    <div className="w-full">
                        <div className="flex justify-between gap-2 text-sm">
                            <div className="flex gap-1 items-center text-sm">
                                <span className='text-white font-bold'>{tweet.profiles.name}</span>
                                <span className='text-secondary-text'>@{tweet.profiles.username}</span>
                                <span className='text-secondary-text'>
                                    {new Date(tweet.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <BsThreeDots className='text-secondary-text' />
                        </div>
                        {tweet.content && (
                            <Link href={`/home/post/${tweet.id}?title=${encodeURIComponent(tweet.content)}&url=${encodeURIComponent(tweet.image_url || '')}&avatar_url=${encodeURIComponent(tweet.profiles.avatar_url || '')}&name=${encodeURIComponent(tweet.profiles.name)}&username=${encodeURIComponent(tweet.profiles.username)}`}>
                                <div
                                    className='text-white my-2 block'
                                    dangerouslySetInnerHTML={{ __html: tweet.content }}
                                />
                            </Link>
                        )}
                        {tweet.image_url && (
                            <Link href={`/home/post/${tweet.id}?title=${encodeURIComponent(tweet.content)}&url=${encodeURIComponent(tweet.image_url || '')}&avatar_url=${encodeURIComponent(tweet.profiles.avatar_url || '')}&name=${encodeURIComponent(tweet.profiles.name)}&username=${encodeURIComponent(tweet.profiles.username)}`}>
                                <Image
                                    src={tweet.image_url}
                                    width={600}
                                    height={600}
                                    alt="post-image"
                                    className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
                                />
                            </Link >
                        )}
                        <div className="flex justify-between my-4">
                            <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                                <FaRegComment />
                                <span className="text-sm">1.5k</span>
                            </div>
                            <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                                <FiRepeat />
                                <span className="text-sm">7.5k</span>
                            </div>
                            <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                                <FaRegHeart />
                                <span className="text-sm">2.5k</span>
                            </div>
                            <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                                <IoIosStats />
                                <span className="text-sm">5k</span>
                            </div>
                            <div className="text-secondary-text flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                                <FaRegBookmark />
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}
