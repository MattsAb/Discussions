import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"
import DeleteModal from "./deleteModal"

type MyDiscussionProps = {
    id: number
    title: string
    description: string
    numberOfComments: number
}

export default function MyDiscussionCard ({title, description, numberOfComments, id} : MyDiscussionProps) {

    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

    function goToEdit () {
        navigate(`/edit/${id}`)
    }    

    async function handleDelete () {
      try {
        await api.delete(`/delete/${id}`)
        window.location.reload(); 
      } catch (err) {
        console.error(err)
      }

    setShowConfirm(false);
    };

    return (
        <>
                <div className="flex flex-col my-5 w-full gap-5 p-5 rounded-3xl cursor-pointer bg-slate-300 dark:bg-slate-800 text-black dark:text-white">
            <p className=" font-bold text-2xl"> {title} </p>
            <p className=""> {description} </p>

            <div className="flex gap-3 mt-2 flex-col">
                <div className="bg-slate-200 dark:bg-slate-700 p-5 rounded-3xl self-baseline">
                    
                    <div className="flex items-center gap-1">
                        <p>Comments:</p>
                        <p> {numberOfComments}</p>
                    </div>

                </div>

                <div className="flex gap-3 self-end">
                    <button className="bg-slate-200 dark:bg-slate-600 p-2 rounded-2xl font-semibold hover:bg-slate-100 active:bg-slate-50 dark:hover:bg-slate-500 dark:active:bg-blue-900 px-3"
                    onClick={goToEdit}>
                        Edit
                    </button>

                    <button className="bg-slate-200 dark:bg-slate-600 p-2 rounded-2xl font-semibold hover:bg-slate-100 active:bg-slate-50 dark:hover:bg-slate-500 dark:active:bg-blue-900 px-3"
                    onClick={() => setShowConfirm(true)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
                    {showConfirm && ( <DeleteModal handleDelete={handleDelete} setShowConfirm={setShowConfirm}/>)}
      </>
    )



}