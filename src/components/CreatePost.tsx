"use client"

import './create-post.css'

import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import Avatar from '@mui/joy/Avatar'
import Image from 'next/image'
import { useRef, useState, type ChangeEvent } from 'react'
import { FaRegFaceSmile } from 'react-icons/fa6'
import { IoLocateOutline } from 'react-icons/io5'
import { RiCalendarScheduleLine } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'
import { TbPhoto } from 'react-icons/tb'
import { useGetUser } from '../../custom-hooks/useGetUser'

type MenuBarProps = {
    editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
    if (!editor) return null

    return (
        <div className="editor-toolbar">
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`editor-btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                    type="button"
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`editor-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                    type="button"
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`editor-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
                    type="button"
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`editor-btn ${editor.isActive('paragraph') ? 'is-active' : ''}`}
                    type="button"
                >
                    Paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`editor-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
                    type="button"
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`editor-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
                    type="button"
                >
                    Italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`editor-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
                    type="button"
                >
                    Strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={`editor-btn ${editor.isActive('highlight') ? 'is-active' : ''}`}
                    type="button"
                >
                    Highlight
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
                    type="button"
                >
                    Left
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
                    type="button"
                >
                    Center
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
                    type="button"
                >
                    Right
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
                    type="button"
                >
                    Justify
                </button>
            </div>
        </div>
    )
}

export default function CreatePost() {
    const [showPicker, setShowPicker] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [hasText, setHasText] = useState(false)
    const fileref = useRef<HTMLInputElement>(null)
    const { loading, session, profile } = useGetUser()

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Placeholder.configure({
                placeholder: "What's happening?",
            }),
        ],
        content: '',
        onCreate: ({ editor }) => {
            setHasText(editor.getText().trim().length > 0)
        },
        onUpdate: ({ editor }) => {
            setHasText(editor.getText().trim().length > 0)
        },
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileref.current) {
            fileref.current.value = ''
        }
    }

    const onEmojiClick = (emojiData: EmojiClickData) => {
        editor?.chain().focus().insertContent(emojiData.emoji).run()
    }

    const isDisabled = !hasText && !imagePreview

    if (!session) return null
    if (!profile) return null
    if (loading) return <h1 className="text-2xl text-white">Loading...</h1>

    return (
        <div className="flex gap-4 p-4 border border-border rounded-xl bg-background">
            {profile?.avatar_url && (
                <Avatar
                    src={profile.avatar_url}
                    alt="profile-pic"
                />
            )}
            <div className="w-full">
                <div className="rounded-xl border border-border bg-hover mb-4">
                    <MenuBar editor={editor} />
                    <div className="px-4 pb-4 pt-3">
                        <EditorContent editor={editor} className="tiptap" />
                    </div>
                </div>

                {imagePreview && (
                    <div className="h-60 md:h-100 rounded-lg overflow-hidden border border-border my-6 relative">
                        <Image
                            src={imagePreview}
                            alt="preview-pic"
                            width={1440}
                            height={960}
                            className="w-full h-full object-cover"
                        />
                        <button
                            className="absolute top-5 right-5 bg-gray-600 w-10 h-10 text-2xl rounded-full opacity-70 cursor-pointer grid place-items-center"
                            onClick={removeImage}
                            type="button"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                )}

                <div className="flex justify-between py-4 items-center border-t border-border">
                    <div className="flex gap-3">
                        <button className="text-primary cursor-pointer" onClick={() => fileref.current?.click()} type="button">
                            <TbPhoto size={20} />
                        </button>
                        <button className="text-primary cursor-pointer" onClick={() => setShowPicker(!showPicker)} type="button">
                            <FaRegFaceSmile size={20} />
                        </button>
                        <button className="text-primary cursor-pointer" type="button">
                            <IoLocateOutline size={20} />
                        </button>
                        <button className="text-primary cursor-pointer" type="button">
                            <RiCalendarScheduleLine size={20} />
                        </button>
                    </div>
                    {isDisabled ? (
                        <button className="text-black bg-secondary-text py-2 px-5 font-semibold cursor-pointer rounded-full" disabled>
                            Post
                        </button>
                    ) : (
                        <button className="text-black bg-white py-2 px-5 font-semibold cursor-pointer rounded-full" type="button">
                            Post
                        </button>
                    )}
                    {showPicker && (
                        <div className="fixed z-10 left-1/2 w-[90%] max-w-2xl -translate-x-1/2 top-1/2 -translate-y-1/2">
                            <EmojiPicker
                                theme={Theme.DARK}
                                onEmojiClick={onEmojiClick}
                                style={{
                                    width: '100%',
                                    background: 'black',
                                }}
                            />
                        </div>
                    )}
                </div>
                <input type="file" ref={fileref} className="hidden" onChange={handleFileChange} />
            </div>
        </div>
    )
}
