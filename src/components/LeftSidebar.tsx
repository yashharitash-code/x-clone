import { FaFeather, FaRegUser, FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { GoHomeFill } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import { BiBell, BiEnvelope } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { TbDotsCircleHorizontal } from 'react-icons/tb'
import Profile from './Profile'
import LogoutButton from './LogoutButton'

export default function LeftSidebar() {
    return (
        <aside className="fixed left-0 top-0 w-[50px] lg:w-[400px] p-1 lg:p-4 h-screen lg:pl-30">
            <p className="mb-6 text-white">
                <FaXTwitter size={30} />
            </p>
            <div className="space-y-2">
                <Link href="/home" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
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

                <Link href="/home/profile" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <FaRegUser size={30} />
                    <span className="hidden lg:inline text-xl font-bold">Profile</span>
                </Link>


                <Link href="/table" className='text-white flex items-center lg:gap-3 p-3 rounded-full hover:bg-hover'>
                    <TbDotsCircleHorizontal size={30} />
                    <span className="hidden lg:inline text-xl font-bold">More</span>
                </Link>
            </div>

            <LogoutButton />
            <button className='bg-primary p-3 mt-3 rounded-full cursor-pointer text-white lg:hidden'>
                <FaFeather size={20} />
            </button>

            <Profile />
        </aside >
    )
}
