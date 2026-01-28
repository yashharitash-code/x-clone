"use client"
import GoBackButton from '@/components/GoBackButton'
import React, { useEffect, useState } from 'react'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { FiRepeat } from 'react-icons/fi'
import { IoIosStats } from 'react-icons/io'
import Image from 'next/image'
import Link from 'next/link'
import { BsThreeDots } from 'react-icons/bs'
import ReplyPost from '@/components/ReplyPost'
import Comments from '@/components/Comments'
import { useSearchParams } from 'next/navigation'



export default function Page({ params }: { params: { postid: string } }) {
    const searchParams = useSearchParams()
    const [post, setPost] = useState<{ url: string | null; title: string; avatar_url: (string | null); name: string; username: string } | null>(null)

    useEffect(() => {
        const url = searchParams.get('url')
        const title = searchParams.get('title')
        const avatar_url = searchParams.get('avatar_url')
        const name = searchParams.get('name')
        const username = searchParams.get('username')

        if (title) {
            setPost({
                url: url ? decodeURIComponent(url) : null,
                title: decodeURIComponent(title),
                avatar_url: avatar_url ? decodeURIComponent(avatar_url) : null,
                name: name ? decodeURIComponent(name) : 'Zara Anaya Patel',
                username: username ? decodeURIComponent(username) : 'zara'
            })
        }
    }, [searchParams])

    if (!post) {
        return (
            <div className="text-secondary-text text-center py-10">
                Post not found.
            </div>
        )
    }
    return (
        <div>
            <div className="flex justify-between items-center mb-3 px-4 py-2">
                <div className="text-white flex items-center gap-3">

                    <GoBackButton />
                    <span className='font-bold text-lg'>Post</span>

                </div>
                <button className='border border-boreder rounded-full px-4 py-1 cursor-pointer text-white'>Reply</button>
            </div>
            <div className="px-4 py-2 flex gap-3 border-b border-border">
                <Image src={post.avatar_url || '/images/image1.jpg'} alt='profile-pic' width={100} height={100}
                    className='w-10 h-10 object-cover rounded-full shrink-0'
                />
                <div className="w-full">
                    <div className="flex justify-between gap-2 text-sm">
                        <div className="flex gap-1 items-center text-sm">
                            <span className='text-white font-bold '>{post.name}</span>
                            <span className='text-secondary-text'>@{post.username}</span>
                            <span className='text-secondary-text'>4h</span>
                        </div>
                        <BsThreeDots className='text-secondary-text' />
                    </div>
                    <div
                        className='text-white my-2 block'
                        dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    {post.url && (
                        <div>
                            <Image src={post.url} alt={post.title} width={600} height={600} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover' />
                        </div>
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
            <ReplyPost />
            <Comments />
            <Comments />
        </div>
    )
}
