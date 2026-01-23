import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Image from 'next/image'

export default function RightSidebar() {
    return (
        <aside className='fixed right-0 top-0 w-[450px] p-5 h-screen pr-20 hidden xl:block'>
            <div className="text-white flex items-center gap-2 border border-border rounded-full p-2">
                <IoSearchOutline />
                <input type='text' placeholder='Search' className='outline-none w-full' />
            </div>
            <div className="border border-border p-4 text-white mt-5 rounded-lg">
                <h3 className='font-bold text-2xl bt-4'>Subscribe to Premium</h3>
                <p>Subscribe to unlock new features and if eligible, receive a share of revenue</p>
                <button className="mt-4 bg-primary text-white py-2 px-5 font-semibold cursor-pointer rounded-full">Subscribe</button>
            </div>
            <div className="border border-border p-4 text-white mt-5 rounded-lg">
                <h3 className='mb-4 text-2xl font-bold'>Who to Follow</h3>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2 items-center">
                        <Image src='/images/image1.jpg' alt='profile-pic' width={800} height={800} className='w-10 h-10 object-cover rounded-full' />
                        <div className='text-white'>
                            <p>Zara Anya Patel</p>
                            <p className='text-secondary-text font-light'>@zara</p>
                        </div>
                    </div>
                    <div className="bg-white text-black py-2 px-5 font-semibold cursor-pointer rounded-full">
                        Follow
                    </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2 items-center">
                        <Image src='/images/image3.jpg' alt='profile-pic' width={800} height={800} className='w-10 h-10 object-cover rounded-full' />
                        <div className='text-white'>
                            <p>Olivia Scott</p>
                            <p className='text-secondary-text font-light'>@olivia</p>
                        </div>
                    </div>
                    <div className="bg-white text-black py-2 px-5 font-semibold cursor-pointer rounded-full">
                        Follow
                    </div>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2 items-center">
                        <Image src='/images/image2.jpg' alt='profile-pic' width={800} height={800} className='w-10 h-10 object-cover rounded-full' />
                        <div className='text-white'>
                            <p>Henry Donald</p>
                            <p className='text-secondary-text font-light'>@henry</p>
                        </div>
                    </div>
                    <div className="bg-white text-black py-2 px-5 font-semibold cursor-pointer rounded-full">
                        Follow
                    </div>
                </div>
            </div>
        </aside>
    )
}



