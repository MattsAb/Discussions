import { ChevronDownIcon } from "@heroicons/react/24/solid"

import { useNavigate } from "react-router-dom"

type SidebarProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {

    const navigate = useNavigate();

    function goToCreateDiscussion() {
    navigate('/create')
    }

    function goToMyDiscussions() {
    navigate(`/mydiscussions`)
    }


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
            <div className="flex gap-2">
                <p> Recent </p>
                <button className="hover:bg-slate-200 active:bg-slate-100 dark:hover:bg-slate-600 dark:active:bg-blue-900 rounded-full">
                    <ChevronDownIcon className="h-4 w-4 text-black dark:text-white" />
                </button>
            </div>
        </div>
      </aside>
    </>
  )
}
