"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signUpUser } from "../../../../services/auth"
import { useRouter } from "next/navigation"
import { supabase } from "../../../../lib/SupabaseClient"
import Form from "@rjsf/mui"
import validator from "@rjsf/validator-ajv8"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./signup.css"

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1DA1F2",
        },
        background: {
            default: "#000000",
            paper: "#000000",
        },
        text: {
            primary: "#ffffff",
            secondary: "#a8a8a8",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#000000",
                        borderRadius: "0.375rem",
                        "& fieldset": {
                            borderColor: "#262626",
                        },
                        "&:hover fieldset": {
                            borderColor: "#262626",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#1DA1F2",
                            borderWidth: "2px",
                        },
                    },
                    "& .MuiInputBase-input": {
                        padding: "1rem",
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#ffffff",
                    fontWeight: 500,
                    "&.Mui-focused": {
                        color: "#1DA1F2",
                    },
                },
            },
        },
    },
})

const schema = {
    title: "",
    type: "object",
    properties: {
        email: {
            type: "string",
            title: "Email",
            format: "email",
        },
        password: {
            type: "string",
            title: "Password",
        },
    },
    required: ["email", "password"],
}

const uiSchema = {
    email: {
        "ui:placeholder": "Email",
    },
    password: {
        "ui:widget": "password",
        "ui:placeholder": "Password",
    },
}

export default function Home() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")

    const handleSubmit = async (data: any) => {
        const { email, password } = data.formData

        if (!email.trim() || !password.trim()) {
            setMessage("All fields are required.")
            return
        }

        const result = await signUpUser(email, password)
        if (result?.error) {
            setMessage(result.error)
            return
        } else {
            setMessage("Signup successful")
            setTimeout(() => {
                router.replace("/auth/callback")
            }, 2000)
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            if (session) {
                router.replace("/auth/callback")
            }
        }
        checkSession()
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="h-screen flex items-center justify-center">
                <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
                    <h2 className="font-bold text-3xl text-primary-text mb-12">
                        Sign up to X
                    </h2>
                    {message && (
                        <p className="bg-primary py-1 mb-4 font-semibold text-center text-black">
                            {message}
                        </p>
                    )}
                    <div className="rjsf-form">
                        <Form
                            schema={schema}
                            uiSchema={uiSchema}
                            formData={formData}
                            onSubmit={handleSubmit}
                            onChange={(data) => setFormData(data.formData)}
                            validator={validator}
                        />
                    </div>
                    <button
                        onClick={() => handleSubmit({ formData })}
                        className="text-black w-full mt-8 rounded-full flex h-10 items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 font-semibold bg-white"
                    >
                        Continue
                    </button>

                    <div className="text-secondary-text mt-8">
                        <span className="mr-1">Already have an account?</span>
                        <Link href="/" className="text-primary">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}