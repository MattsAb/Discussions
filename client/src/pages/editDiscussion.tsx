import { useEffect, useState } from "react"
import { api } from "../api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditDiscussion() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getDiscussionInfo = async () => {
            try {
                const response = await api.get(`/getedit/${id}`);
                const discussion = response.data[0];

                setTitle(discussion.title ?? "");
                setDescription(discussion.description ?? "");
                setBody(discussion.body ?? "");

            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err.message);
                } else {
                    console.log("Unexpected error", err);
                }
            }
        } 
        getDiscussionInfo()
  }, [id]);

    async function handleEdit() {
        try {
          await api.put(`/edit/${id}`, {
            title: title,
            description: description,
            body: body
          })
          navigate('/');
        } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err.message);

                } else {
                    console.log("Unexpected error", err);

                }
            }
    }

  return (

    <div className="flex flex-col items-center gap-10 px-4 py-10 text-black dark:text-white">
      <h1 className="text-3xl font-bold">Edit a Discussion</h1>

      <div className="w-full max-w-2xl flex flex-col gap-8">


        <div className="flex flex-col gap-3 bg-slate-300 dark:bg-slate-800 p-6 rounded-2xl">
          <label className="text-xl font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Discussion title"
            className="bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="flex flex-col gap-3 bg-slate-300 dark:bg-slate-800 p-6 rounded-2xl">
          <label className="text-xl font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            rows={4}
            placeholder="Discussion description"
            className="bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-500 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="flex flex-col gap-3 bg-slate-300 dark:bg-slate-800 p-6 rounded-2xl">
          <label className="text-xl font-semibold">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Discussion body"
            className="bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-500 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="bg-blue-300 hover:bg-blue-200 active:bg-blue-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 py-3 rounded-xl font-semibold"
        onClick={handleEdit}>
          Edit a Discussion
        </button>

      </div>
    </div>
  )
}
