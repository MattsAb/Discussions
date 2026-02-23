import DiscussionCard from "../components/discussionCard";
import axios from "axios";
import { api } from "../api";
import { useEffect, useState } from "react";

type Discussion = {
  id: number;
  title: string;
  description: string;
  _count: {
    comments: number;
  };
};


export default function DiscussionList () {

    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

      useEffect(() => {
        const getDiscussions = async () => {
            try {
                const response = await api.get(`/`);
                setDiscussions(response.data);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.log(err.message);
                    setErrorMessage(err.message)
                } else {
                    console.log("Unexpected error", err);
                    setErrorMessage("Unexpected error")
                }
            }
        } 
        getDiscussions()
  }, []);

    return (   
        <>

        <div className="flex justify-center">
            <div className="flex flex-col items-center w-full max-w-4xl border-x border-black dark:border-slate-600 bg-slate-200 dark:bg-slate-950 px-4">
                <p className="my-3 text-3xl font-bold dark:text-white text-black"> Discussions </p>
                {!discussions.length ? (<p> {errorMessage}</p>) : (discussions.map((discussion) => (
                <DiscussionCard
                    key={discussion.id}
                    id={discussion.id}
                    title={discussion.title}
                    description={discussion.description}
                    numberOfComments={discussion._count.comments}
                />
                )))}

            </div>
        </div>
        </>
    )
}