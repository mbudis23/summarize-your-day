'use client';
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function RegisterCard() {
    const [formData, setFormData] = useState({
        _username: '',
        _email: '',
        _password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            console.log('Registration successful:', response.data);
            // Optionally redirect the user or show a success message
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between">
            <h1 className="text-center font-black text-[32px]">Registration</h1>
            {errorMessage && <p className="text-center font-light text-red-500">{errorMessage}</p>}
            <form className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                    <input
                        className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                        placeholder="Full Name"
                        type="text"
                        name="_username"
                        value={formData._username}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                        placeholder="Email"
                        type="email"
                        name="_email"
                        value={formData._email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                        placeholder="Password"
                        type="password"
                        name="_password"
                        value={formData._password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-black rounded-[4px] text-white py-[2px] px-[8px]" onClick={handleSubmit}>REGISTER</button>
                </div>
            </form>
            <div>
                <p className="text-center">Already have an account? <Link href={'/login'}>Login</Link></p>
            </div>
        </div>
    );
}
