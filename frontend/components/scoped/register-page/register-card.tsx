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
        <div className="border-[1px] border-black p-[16px] rounded-[8px] flex flex-col gap-[16px]">
            <h1 className="text-[32px] font-bold text-center">
                Register
            </h1>
            <form className="flex flex-col gap-[8px] min-w-[300px]" onSubmit={handleSubmit}>
                <input
                    className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="name"
                    onChange={handleChange}
                    required
                />
                <input
                    className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    className="focus:outline-none focus:shadow-outline w-full px-[16px] py-[4px] rounded-[4px] border-b"
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="bg-black w-full text-white rounded-[4px] px-[16px] py-[4px] hover:underline"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {errorMessage && (
                <p className='text-red-500 text-center text-[12px]'>
                    {errorMessage}
                </p>
            )}
            <p className='text-black text-center'>
                Already have an account? <Link className="hover:underline" href={'/login'}>Login</Link>
            </p>
        </div>
    );
}


// 'use client';
// import Link from "next/link";
// import { useState } from "react";
// import axios from "axios";

// export default function RegisterCard() {
//     const [formData, setFormData] = useState({
//         _username: '',
//         _email: '',
//         _password: ''
//     });
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/users/register', formData);
//             console.log('Registration successful:', response.data);
//             // Optionally redirect the user or show a success message
//         } catch (error) {
//             setErrorMessage(error.response?.data?.message || 'Registration failed');
//             alert(error.message)
//         }
//     };

//     return (
//         <div className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between">
//             <h1 className="text-center font-black text-[32px]">Registration</h1>
//             {errorMessage && <p className="text-center font-light text-red-500">{errorMessage}</p>}
//             <form className="flex flex-col gap-[16px]">
//                 <div className="flex flex-col gap-[8px]">
//                     <input
//                         className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
//                         placeholder="Full Name"
//                         type="text"
//                         name="_username"
//                         value={formData._username}
//                         onChange={handleChange}
//                     />
//                     <input
//                         className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
//                         placeholder="Email"
//                         type="email"
//                         name="_email"
//                         value={formData._email}
//                         onChange={handleChange}
//                     />
//                     <input
//                         className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
//                         placeholder="Password"
//                         type="password"
//                         name="_password"
//                         value={formData._password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="flex justify-end">
//                     <button className="bg-black rounded-[4px] text-white py-[2px] px-[8px]" onClick={handleSubmit}>REGISTER</button>
//                 </div>
//             </form>
//             <div>
//                 <p className="text-center">Already have an account? <Link href={'/login'}>Login</Link></p>
//             </div>
//         </div>
//     );
// }
