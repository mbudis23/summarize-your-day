'use client';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";  // Corrected import path
import { useState } from "react";

export default function LoginCard() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("\u00A0");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("\u00A0");
    
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData, {
                withCredentials: true // Ensures cookies such as session IDs are sent with the request
            });
            console.log('Login success:', response.data.message);
            router.push('/dashboard');  // Redirect to dashboard or appropriate route
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error during login:', error);
                // Properly handle error data
                setErrorMessage(error.response?.data?.message || 'Login failed, please try again');
            } else {
                console.error('Unknown error during login:', error);
                setErrorMessage('An unexpected error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between">
            <h1 className="text-center font-black text-[32px]">
                Member Login
            </h1>
            <p>{"\u00A0"}</p>
            <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit}>
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-black rounded-[4px] text-white py-[2px] px-[8px]"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
            {errorMessage && (
                <p className='text-center font-light text-red-500'>
                    {errorMessage}
                </p>
            )}
            <p className="text-center">
                Don't have an account? <Link href={'/register'}>Register here</Link>
            </p>
        </div>
    );
}
