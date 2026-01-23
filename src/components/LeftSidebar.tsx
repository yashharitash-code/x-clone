import { FaFeather, FaRegUser, FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import Image from 'next/image'
import { GoHomeFill } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import { BiBell, BiEnvelope } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { TbDotsCircleHorizontal } from 'react-icons/tb'
import { HiDotsHorizontal } from 'react-icons/hi'

export default function LeftSidebar() {
    return (
        <aside className="fixed left-0 top-0 w-[50px] lg:w-[400px] p-1 lg:p-4 h-screen lg:pl-30">
            <p className="mb-6 text-white">
                <FaXTwitter size={30} />
            </p>
            <div className="space-y-2">
                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <GoHomeFill size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Home</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <IoSearchOutline size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Search</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <BiBell size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Notifications</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <BiEnvelope size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Messages</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <BsPeople size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Communities</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <FaXTwitter size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Premium</span>
                </Link>

                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <FaRegUser size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Profile</span>
                </Link>


                <Link href="#" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <TbDotsCircleHorizontal size={30} />
                    <span className="hidden lg:inline text-xl font-bold">More</span>
                </Link>
            </div>

            <button className="hidden lg:block bg-white text-black p-3 w-full mt-3 font-bold rounded-full cursor-pointer">
                Post
            </button>
            <button className='bg-primary p-3 mt-3 rounded-full cursor-pointer text-white lg:hidden'>
                <FaFeather size={20} />
            </button>

            <div className="mt-10 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image
                        src='/images/profile.jpg'
                        alt="Profile"
                        width={1440}
                        height={960}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className='hidden lg:block'>
                        <p className='font-semibold'>Yash Haritash</p>
                        <p className='text-secondary-text font-light'>@yashharitash</p>
                    </div>
                </div>
                <HiDotsHorizontal className='hidden lg:block' />
            </div>
        </aside >
    )
}
