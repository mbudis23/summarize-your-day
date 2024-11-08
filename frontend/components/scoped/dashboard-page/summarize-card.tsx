import { AiOutlineMore } from "react-icons/ai";
export default function SummarizeCard({date = "dd-mm-yyyy", rate = 0.0, summarize="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aspernatur amet voluptas quisquam corporis hic rerum similique minus eveniet quae neque vitae debitis nam animi mollitia ad ratione autem quidem nulla necessitatibus vel, itaque explicabo beatae eaque. Expedita tempore quia velit ad atque voluptas officia, repellat accusamus! Commodi repellat amet itaque blanditiis inventore ipsa aspernatur qui, ratione impedit provident repudiandae molestias, aperiam fuga! Nesciunt consectetur est suscipit deserunt fugiat, perferendis dignissimos nulla saepe incidunt odit distinctio pariatur ipsam iste iusto tempore. Vero, molestiae laboriosam, minima iure maiores quisquam necessitatibus, tempore nihil magni fugit accusamus nobis consectetur culpa! Labore, mollitia nihil?", id}){
    return(
        <div className="w-full border-black border-[1px] rounded-[8px] p-[12px] flex flex-col justify-between">
            <div className="flex justify-between">
                <p className="font-bold">{date}</p>
                <div className="flex items-center gap-[8px]">
                    <p className="font-medium">{rate}</p>
                    <button><AiOutlineMore /></button>
                </div>
            </div>
            <p>{summarize}</p>
        </div>
    )
}