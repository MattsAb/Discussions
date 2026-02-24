import { ChevronDownIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"
import { useAuth } from "../hooks/authHook"

type TopDiscussionsType = {
  id: number
  title: string
}

type SidebarProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {

    const [topDiscussions, setTopDiscussions] = useState<TopDiscussionsType[]>([])
    const [topShown, setTopShown] = useState(true);

    const navigate = useNavigate();
    const {user} = useAuth();

    const goToCreateDiscussion = () => {
      if (!user)
      {
        navigate('/auth');
        return;
      }
      navigate('/create')}

    const goToMyDiscussions = () => {
      if (!user)
      {
        navigate('/auth');
        return;
      }
      navigate(`/mydiscussions`)
    }

    const goToTopDiscussion = (id: number) => navigate(`/discussions/${id}`)

    useEffect(() => {
        const getTopDiscussions = async () => {
            try {
                const response = await api.get(`/top`);
                setTopDiscussions(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err.message);
                } else {
                    console.log("Unexpected error", err);
                }
            }
        } 
        getTopDiscussions()
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40
          w-64 bg-slate-100 text-black dark:bg-slate-900 dark:text-white p-4
          border-r border-black dark:border-slate-700
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
         <div className="flex flex-col gap-4 border-b border-black dark:border-slate-700 pb-4">
            <button className="py-2 px-4 bg-slate-300 hover:bg-slate-200 dark:bg-slate-700 rounded dark:hover:bg-slate-600"
            onClick={goToCreateDiscussion}
            >Create Discussion</button>
            <button className="py-2 px-4 bg-slate-300 hover:bg-slate-200 dark:bg-slate-700 rounded dark:hover:bg-slate-600"
            onClick={goToMyDiscussions}
            >My Discussions</button>
        </div>

        <div>
            <div className="flex gap-2 mt-2">
                <p> Most Popular </p>
                <button className="hover:bg-slate-200 active:bg-slate-100 dark:hover:bg-slate-600 dark:active:bg-blue-900 rounded-full"
                onClick={() => setTopShown(!topShown)}
                >
                    <ChevronDownIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
            </div>

            {topDiscussions.length > 0 && topShown && (

            <div className="flex flex-col gap-4 items-center mt-3 bg-slate-200 dark:bg-slate-800 py-3 rounded-2xl">
              {topDiscussions.map((discussion) => (
                <button className="text-xl hover:bg-sky-100 dark:hover:bg-slate-600 w-full py-1 rounded-2xl wrap-break-word"
                key={discussion.id}
                onClick={() => goToTopDiscussion(discussion.id)}
                > {discussion.title} </button>
              ))}
            </div>

          )}
        </div>

      </aside>
    </>
  )
}
