import Link from "next/link";

export default function LoginCard(){
    return(
        <div 
        className="w-[320px] h-[360px] border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between"
        >
            <h1 
            className="text-center font-black text-[32px]"
            >
                Member Login
            </h1>
            <p>{"\u00A0"}</p>
            <form className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
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
                    <button className="bg-black rounded-[4px] text-white py-[2px] px-[8px]">LOGIN</button>
                </div>
            </form>
            <p className="text-center font-light text-red-500">
                {"\u00A0"}
            </p>
            <div>
                <p className="text-center">Don't have an account? <Link href={'/register'}>Register</Link></p>
            </div>

        </div>
    )
}