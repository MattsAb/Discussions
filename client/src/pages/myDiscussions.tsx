import { useEffect, useState } from "react";
import MyDiscussionCard from "../components/myDiscussionCard";
import axios from "axios";
import { api } from "../api";

type Discussion = {
  id: number;
  title: string;
  description: string;
    _count: {
    comments: number;
  };
};

export default function MyDiscussions () {

    const [myDiscussions, setMyDiscussions] = useState<Discussion[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

      useEffect(() => {
        const getMyDiscussions = async () => {
            try {
                const response = await api.get(`/mydiscussions`);
                setMyDiscussions(response.data);
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
        getMyDiscussions()
  }, []);

    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center w-full max-w-2xl px-5">
                <h1 className="text-3xl font-bold my-4"> My discussions </h1>
                {!myDiscussions.length ? (<p> {errorMessage}</p>) : (myDiscussions.map((discussion) => (
                    <MyDiscussionCard
                        key={discussion.id}
                        id={discussion.id}
                        title={discussion.title}
                        description={discussion.description}
                        numberOfComments={discussion._count.comments}
                    />
                )))}
            </div>
        </div>
    )

}