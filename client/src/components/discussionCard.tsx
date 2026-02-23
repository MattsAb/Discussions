import { useNavigate } from "react-router-dom"

type DiscussionProps = {
    id: number
    title: string
    description: string
    numberOfComments: number

}


export default function DiscussionCard({title, description, numberOfComments, id} : DiscussionProps) {

    const navigate = useNavigate()

    function handleClick () {
        navigate(`/discussions/${id}`);
    }

    return (
        <button className="text-black dark:text-white flex flex-col items-center my-5 w-full p-5 rounded-3xl cursor-pointer bg-white hover:bg-slate-100 active:bg-slate-50 dark:bg-slate-800  dark:active:bg-blue-900 dark:hover:bg-slate-700"
        onClick={handleClick}
        >
            <p className=" font-bold text-2xl"> {title} </p>
            <p className=""> {description} </p>
            <div className="flex gap-3 self-baseline mt-2">
                <div className="flex self-end bg-slate-200 dark:bg-slate-600 p-2 rounded-2xl gap-1">
                    <p>Comments:</p>
                <p> {numberOfComments}</p>
                </div>
            </div>
        </button>
    )

}