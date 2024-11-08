import Link from "next/link";

export default function NavigationBar(){
    return(
        <div className="w-full py-[4px] px-[24px] flex justify-between">
            <div>
                <h1 className="text-[36px] font-black">SumYourDay</h1>
            </div>
            <div className="flex gap-[8px] text-[16px] font-bold items-center">
                <Link href={'./'}>Profile</Link>
                <Link href={'./'}>Report</Link>
                <Link href={'./'}>Setting</Link>
            </div>
        </div>
    )
}