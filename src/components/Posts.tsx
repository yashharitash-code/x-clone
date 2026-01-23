import React from 'react'
import Image from 'next/image'
import { BsThreeDots } from 'react-icons/bs'
import Link from 'next/dist/client/link'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { FiRepeat } from 'react-icons/fi'
import { IoIosStats } from 'react-icons/io'


export default function Posts() {
    return (
        <div>
            <div className="px-4 py-2 flex gap-3 border-b border-border">
                <Image src='/images/image1.jpg' alt='profile-pic' width={100} height={100}
                    className='w-10 h-10 object-cover rounded-full shrink-0'
                />
                <div className="w-full">
                    <div className="flex justify-between gap-2 text-sm">
                        <div className="flex gap-1 items-center text-sm">
                            <span className='text-white font-bold '>Zara Anaya Patel</span>
                            <span className='text-secondary-text'>@zara</span>
                            <span className='text-secondary-text'>4h</span>
                        </div>
                        <BsThreeDots className='text-secondary-text' />
                    </div>
                    <Link href="#" className='text-white my-2 block'>
                        Sometimes the darkness feels more honest than the light.
                    </Link>
                    <Link href="#">
                        <Image src='/images/post1.jpg' alt='post-iamge' width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover' />
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
            <div className="px-4 py-2 flex gap-3 border-b border-border">
                <Image src='/images/image1.jpg' alt='profile-pic' width={100} height={100}
                    className='w-10 h-10 object-cover rounded-full shrink-0'
                />
                <div className="w-full">
                    <div className="flex justify-between gap-2 text-sm">
                        <div className="flex gap-1 items-center text-sm">
                            <span className='text-white font-bold '>Zara Anaya Patel</span>
                            <span className='text-secondary-text'>@zara</span>
                            <span className='text-secondary-text'>4h</span>
                        </div>
                        <BsThreeDots className='text-secondary-text' />
                    </div>
                    <Link href="#" className='text-white my-2 block'>
                        Sometimes the darkness feels more honest than the light.
                    </Link>
                    <Link href="#">
                        <Image src='/images/post1.jpg' alt='post-iamge' width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover' />
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
            <div className="px-4 py-2 flex gap-3 border-b border-border">
                <Image src='/images/image1.jpg' alt='profile-pic' width={100} height={100}
                    className='w-10 h-10 object-cover rounded-full shrink-0'
                />
                <div className="w-full">
                    <div className="flex justify-between gap-2 text-sm">
                        <div className="flex gap-1 items-center text-sm">
                            <span className='text-white font-bold '>Zara Anaya Patel</span>
                            <span className='text-secondary-text'>@zara</span>
                            <span className='text-secondary-text'>4h</span>
                        </div>
                        <BsThreeDots className='text-secondary-text' />
                    </div>
                    <Link href="#" className='text-white my-2 block'>
                        Sometimes the darkness feels more honest than the light.
                    </Link>
                    <Link href="#">
                        <Image src='/images/post1.jpg' alt='post-iamge' width={1800} height={1800} className='h-70 md:h-130 w-full rounded-lg border border-border object-cover' />
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
        </div>
    )

}
