import DiscussionCard from "../components/discussionCard";
import axios from "axios";
import { api } from "../api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Discussion } from "../types/discussionTypes";

export default function SearchDiscussionList () {

    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        async function getSearch () {

            try{
            const response = await api.get(`/search?q=${query}`)
            setDiscussions(response.data)
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

        getSearch()
    }, [query]);

    return (   
        <>

        <div className="flex justify-center">
            <div className="flex flex-col items-center w-full max-w-4xl border-x border-b border-black dark:border-slate-600 bg-slate-200 dark:bg-slate-950 px-4">
                <p className="my-3 text-3xl font-bold dark:text-white text-black"> search by: {query} </p>
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