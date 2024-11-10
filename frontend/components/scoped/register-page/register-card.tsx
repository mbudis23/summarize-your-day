'use client';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterCard() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
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
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log('Registration success:', response.data.message);
            setErrorMessage(response.data.message);
            router.push('/login');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('Error during registration:', error);
                setErrorMessage(error.response?.data?.message || 'Registration failed, please try again');
            } else {
                console.error('Unknown error during registration:', error);
                setErrorMessage('An unexpected error occurred, please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between">
            <h1 className="text-center font-black text-[32px]">
                Register
            </h1>
            <p>{"\u00A0"}</p>
            <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit}>
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
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
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
            {errorMessage && (
                <p className='text-center font-light text-red-500'>
                    {errorMessage}
                </p>
            )}
            <p className="text-center">
                Already have an account? <Link href={'/login'}>Login</Link>
            </p>
        </div>
    );
}