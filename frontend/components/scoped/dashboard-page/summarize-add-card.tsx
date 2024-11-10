import axios from "axios";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Cookies from 'js-cookie';

function getCookie(name) {
    const nameEQ = name + "="; // Menambahkan '=' untuk memastikan pencocokan yang tepat
    const ca = document.cookie.split(';'); // Memisahkan string cookie menjadi array berdasarkan ';'
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1); // Menghapus spasi di awal jika ada
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length)); // Jika nama cookie cocok, kembalikan nilainya
    }
    return null; // Kembalikan null jika tidak ada cookie dengan nama tersebut
}

export default function SummarizeAddCard({ closeFunction }) {
    const token = Cookies.get('token');

    const [formData, setFormData] = useState({
        date: new Date().toISOString().substring(0, 10),
        rate: 0,
        summarize: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(token);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        alert(getCookie('token'))
        

        if (!token) {
            setError("Authentication error: No token provided.");
            setLoading(false);
            return;  // Early return if no token is found
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/reports', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Add Summarize success:', response.data.message);
            closeFunction(); // Optionally clear form and/or close modal here
        } catch (error) {
            console.error('Error during Add Summarize:', error);
            setError("Failed to submit: " + (error.response?.data?.message || 'An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[360px] h-[480px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between bg-white text-black">
            <div className="w-full flex justify-end">
                <button className="text-[24px]" onClick={closeFunction}>
                    <AiOutlineClose/>
                </button>
            </div>
            <h1 className="text-center font-black text-[32px]">Add Summarize</h1>
            <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit}>
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    type="text"
                    name="summarize"
                    value={formData.summarize}
                    onChange={handleChange}
                    required
                />
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-black rounded-[4px] text-white py-[2px] px-[8px]"
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </form>
            {error && <p className="text-center text-red-500">{error}</p>}
        </div>
    );
}
