import SummarizeCard from "@/components/scoped/dashboard-page/summarize-card";
import SummarizeOption from "@/components/scoped/dashboard-page/summarize-option";

export default function DashboardPage(){
    return(
        <main className="bg-white text-black min-h-screen flex flex-col p-[24px]">
            <SummarizeOption/>
            <SummarizeCard/>
        </main>
    )
}