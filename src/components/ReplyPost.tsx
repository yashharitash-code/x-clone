"use client"
import Image from 'next/image'
import { TbHomeQuestion, TbPhoto } from 'react-icons/tb'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { IoLocateOutline } from 'react-icons/io5'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { useState, useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'

export default function ReplyPost() {
    const [reply, setReply] = useState('')
    const [showPicker, setShowPicker] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileref = useRef<HTMLInputElement>(null);
    const isDisabled = reply.trim() === "" && !imagePreview;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const removeImage = () => {
        setImagePreview(null);
        if (fileref.current) {
            fileref.current.value = '';
        }
    }

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setReply((prev) => prev + emojiData.emoji);
    }

    return (
        <div className="flex gap-4 p-4 border border-border">
            <Image src='/images/profile.jpg' alt='profile-pic' width={1440}
                height={960} className='w-12 h-12 object-cover rounded-full' />
            <div className="w-full">
                <textarea placeholder="what's happening?" className='w-full placeholder:text-secondary-text outline-none text-xl resize-none text-white' value={reply} onChange={(e) => { setReply(e.target.value) }}></textarea>
                {imagePreview && <div className="h-60 md:h-100 rounded-lg overflow-hidden border border-border mb-10 relative">
                    <Image src={imagePreview} alt='preview-pic' width={1440} height={960} className='w-full h-full object-cover' />
                    <button className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-50 cursor-pointer grid place-items-center" onClick={removeImage}>
                        <RxCross2 />
                    </button>
                </div>}

                <div className="flex justify-between py-4 items-center border-t border-border">
                    <div className="flex gap-3">
                        <div className="text-primary cursor-pointer" onClick={() => fileref.current?.click()}  >
                            <TbPhoto size={20} />
                        </div>
                        <div className="text-primary cursor-pointer" onClick={() => setShowPicker(!showPicker)}>
                            <FaRegFaceSmile size={20} />
                        </div>
                        <div className="text-primary cursor-pointer">
                            <IoLocateOutline size={20} />
                        </div>
                        <div className="text-primary cursor-pointer">
                            <RiCalendarScheduleLine size={20} />
                        </div>
                    </div>
                    {
                        isDisabled ? (
                            <button className='text-black bg-secondary-text py-2 px-5 font-semibold cursor-pointer rounded-full'>Post</button>
                        ) : (
                            <button className='text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full'>Post</button>
                        )
                    }
                    {showPicker && <div className="fixed z-10 top-10 left-1/2 w-[90%] max-w-2xl -translate-x-1/2">
                        <EmojiPicker theme={Theme.DARK}
                            onEmojiClick={onEmojiClick}
                            style={{
                                width: '100%',
                                background: 'black',
                            }} />
                    </div>}

                </div>
                <input type="file" ref={fileref} className='hidden' onChange={handleFileChange} />
            </div>

        </div>
    )
}
