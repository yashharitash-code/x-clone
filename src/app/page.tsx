'use client'
import Image from "next/image";
import Link from "next/link";
import { signInUser } from "../../services/auth";
import { useEffect, useState } from "react";
import { sign } from "crypto";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/SupabaseClient";
import Button from "@mui/material/Button";
import Form from "@rjsf/mui"
import validator from "@rjsf/validator-ajv8"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "./auth/signup/signup.css"
import { RJSFSchema, UiSchema } from "@rjsf/utils"


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

const schema: RJSFSchema = {
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

const uiSchema: UiSchema = {
  email: {
    "ui:placeholder": "Email",
  },
  password: {
    "ui:widget": "password",
    "ui:placeholder": "Password",
  },
}

export default function Home() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const { email, password } = data.formData;

    if (!email.trim() || !password.trim()) {
      setMessage("All fields are required.");
      return;
    }

    const result = await signInUser(email, password);
    if (result?.error) {
      setMessage(result.error);
      return;
    } else {
      setMessage("Signin successful");
      setTimeout(() => {
        router.replace('/auth/callback')
      }, 2000);
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.replace('/auth/callback');
      }
    };
    checkSession();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-[300px] w-[95%] py-12 rounded-lg">
          <h2 className="font-bold text-3xl text-primary-text">
            Sign in to X
          </h2>
          <button className="bg-white w-full mt-8 h-10 flex justify-center items-center gap-2 cursor-pointer hover:bg-gray-200 rounded-full">
            <Image
              src="/images/google-icon.png"
              alt="Google Logo"
              width={470}
              height={470}
              className="w-6 h-6 object-cover"
            />
            <span>Sign in with Google</span>
          </button>
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-border"></div>
            <span className="mx-4 text-md text-primary-text">or</span>
            <div className="flex-grow h-px bg-border"></div>
          </div>
          {message && <p className="bg-primary py-1 mb-4 font-semibold text-center">{message}</p>}
          <div className="rjsf-form mb-4">
            <Form
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
              onSubmit={handleSubmit}
              onChange={(data) => setFormData(data.formData)}
              validator={validator}
            />
          </div>

          <Button variant="outlined" color="primary" fullWidth sx={{ borderColor: "#262626", color: "#1DA1F2", padding: "0.75rem", marginTop: "1rem" }}>
            Forgot password?
          </Button>

          <div className="text-secondary-text mt-8">
            <span className="mr-1">Don&apos;t have an account?</span>
            <Link href="/auth/signup" className="text-primary">Sign up</Link>
          </div>
        </div>

      </div>
    </ThemeProvider>
  );
}