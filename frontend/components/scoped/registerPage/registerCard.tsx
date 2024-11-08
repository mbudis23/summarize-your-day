import Link from "next/link";

export default function RegisterCard(){
    return(
        <div 
        className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between"
        >
            <h1 
            className="text-center font-black text-[32px]"
            >
                Registration
            </h1>
            <form className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                    <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    placeholder="Full Name" 
                    type="text"
                    />
                    <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    placeholder="Email" 
                    type="text"
                    />
                    <input
                    className="w-full py-[4px] px-[8px] outline-none border-b-gray-200 border-b-[1px] focus:border-gray-500"
                    placeholder="Password" 
                    type="text"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-black rounded-[4px] text-white py-[2px] px-[8px]">Register</button>
                </div>
            </form>
            <p className="text-center font-light text-red-500">
                {"\u00A0"}
            </p>
            <div>
                <p className="text-center">Already have an account? <Link href={'/login'}>Login</Link></p>
            </div>

        </div>
    )
}