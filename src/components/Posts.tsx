"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/link'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { FiRepeat } from 'react-icons/fi'
import { IoIosStats } from 'react-icons/io'
import { useInfiniteQuery } from '@tanstack/react-query'

type Photo = {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

const POSTS_PER_PAGE = 10

async function fetchPhotos({ pageParam = 1 }): Promise<Photo[]> {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=${POSTS_PER_PAGE}`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch photos')
    }
    return response.json()
}

export default function Posts() {
    const observerTarget = useRef<HTMLDivElement>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['photos'],
        queryFn: fetchPhotos,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === POSTS_PER_PAGE ? allPages.length + 1 : undefined
        },
        initialPageParam: 1,
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        const currentTarget = observerTarget.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    if (status === 'pending') {
        return (
            <div className="text-white text-center py-10">
                Loading posts...
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className="text-red-500 text-center py-10">
                Error loading posts. Please try again.
            </div>
        )
    }

    return (
        <div>
            {data.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.map((photo) => (
                        <div key={photo.id} className="px-4 py-2 flex gap-3 border-b border-border">
                            <Image
                                src='/images/image1.jpg'
                                alt='profile-pic'
                                width={100}
                                height={100}
                                className='w-10 h-10 object-cover rounded-full shrink-0'
                            />
                            <div className="w-full">
                                <div className="flex justify-between gap-2 text-sm">
                                    <div className="flex gap-1 items-center text-sm">
                                        <span className='text-white font-bold'>Zara Anaya Patel</span>
                                        <span className='text-secondary-text'>@zara</span>
                                        <span className='text-secondary-text'>4h</span>
                                    </div>
                                    <BsThreeDots className='text-secondary-text' />
                                </div>
                                <Link href={`/home/post/${photo.id}`} className='text-white my-2 block'>
                                    {photo.title}
                                </Link>
                                <Link href={`/home/post/${photo.id}`}>
                                    <Link href={`/home/post/${photo.id}`}>
                                        <Image
                                            src={`https://picsum.photos/id/${photo.id}/900/500`}
                                            width={900}
                                            height={500}
                                            alt="post-image"
                                            className="h-70 md:h-130 w-full rounded-lg border border-border object-cover"
                                        />
                                    </Link>

                                </Link>
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
                    ))}
                </React.Fragment>
            ))}

            <div ref={observerTarget} className="py-4 text-center text-secondary-text">
                {isFetchingNextPage && 'Loading more posts...'}
                {!hasNextPage && data.pages.length > 0 && 'No more posts to load'}
            </div>
        </div>
    )
}
