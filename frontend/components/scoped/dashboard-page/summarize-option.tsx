'use client';
import { useState } from "react";
import { AiOutlineFileAdd, AiOutlineReload } from "react-icons/ai";
import SummarizeAddCard from "./summarize-add-card";

export default function SummarizeOption() {
    const [addCardOpen, setAddCardOpen] = useState(false);

    return (
        <div className="w-full border-black border-[1px] rounded-[8px] p-[12px] flex justify-end gap-[12px]">
            <button className="text-[24px]" onClick={() => { /* potentially reload functionality here */ }}>
                <AiOutlineReload />
            </button>
            <button className="text-[24px]" onClick={() => setAddCardOpen(true)}>
                <AiOutlineFileAdd />
            </button>

            {addCardOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <SummarizeAddCard closeFunction={() => setAddCardOpen(false)} />
                </div>
            )}
        </div>
    );
}
