import { BrowserRouter, Routes, Route, } from "react-router-dom"
import {  useState } from "react"

import DiscussionList from "./pages/discussionList"
import Discussion from "./pages/discussion"
import MyDiscussions from "./pages/myDiscussions"
import CreateDiscussion from "./pages/createDiscussion"
import Authentication from "./pages/authentication"

import Header from "./components/header"
import Sidebar from "./components/sidebar"
import EditDiscussion from "./pages/editDiscussion"
import SearchDiscussionList from "./pages/searchDiscussionList"
import ScrollToTop from "./hooks/scrollHook"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
     <ScrollToTop/>
      <div className="min-h-screen dark:bg-slate-950 bg-white text-white pt-16">
        <Header
          toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
        <main className=" md:ml-64">
          <Routes>

            <Route path="/" element={<DiscussionList />} />
            <Route path="/search" element={<SearchDiscussionList/>} />
            <Route path="/discussions/:id" element={<Discussion />} />
            <Route path="/mydiscussions" element={<MyDiscussions/>} />
            <Route path="/create" element={<CreateDiscussion/>} />
            <Route path="/edit/:id" element={<EditDiscussion/>} />
            <Route path="/auth" element={<Authentication/>} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
