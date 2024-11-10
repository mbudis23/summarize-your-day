'use client'
import SummarizeCard from "@/components/scoped/dashboard-page/summarize-card";
import SummarizeOption from "@/components/scoped/dashboard-page/summarize-option";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';



export default function DashboardPage(){
    const [reports, setReports] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/reports', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true  // penting untuk kirim cookie/token jika diperlukan
                });
                setReports(response.data.reports);
            } catch (error) {
                console.error('Error fetching reports:', error);
                // Handle errors here, e.g., show error message
            }
        };

        fetchReports();
    }, []);
    return(
        <main className="bg-white text-black min-h-screen flex flex-col p-[24px]">
            <SummarizeOption/>
            {reports.map((report, index)=>(
                <SummarizeCard id={report._id} date={report.date} key={index} rate={report.rate} summarize={report.summarize}/>
            ))}
        </main>
    )
}