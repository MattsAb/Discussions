import { useState } from "react"
import DeleteModal from "./deleteModal"
import { api } from "../api"
import { useAuth } from "../hooks/authHook"

type CommentProps = {
    id: number
    username: string
    text: string
}

export default function Comment ({username, text,id}: CommentProps) {

    const [showConfirm, setShowConfirm] = useState(false)

    const {user} = useAuth();

    async function handleDelete() {
              try {
                await api.delete(`comment/delete/${id}`)
                window.location.reload(); 
              } catch (err) {
                console.error(err)
              }
        
            setShowConfirm(false);
    }

    return (
        <div className="text-black dark:text-white flex flex-col w-full bg-slate-300 dark:bg-slate-800 my-3 p-3 rounded-2xl">
            <p className="font-bold"> {username} </p>
            <p> {text} </p>
            {user?.username === username && (<button className="bg-red-500 self-end px-4 py-1 rounded-2xl cursor-pointer hover:bg-red-400 active:bg-red-300"
            onClick={() => setShowConfirm(true)}
            > Delete </button>)}

            {showConfirm && ( <DeleteModal handleDelete={handleDelete} setShowConfirm={setShowConfirm}/> )}
        </div>
    )
}