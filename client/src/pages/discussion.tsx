import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import Comment from "../components/comment";
import type { User } from "../types/authTypes";
import axios from "axios";

type CommentType = {
  id: number;
  text: string;
  author: User;
  createdAt: string;
};

type DiscussionInfo = {
  id: number;
  title: string;
  body: string;
  comments: CommentType[];
};

export default function Discussion() {
  const { id } = useParams<{ id: string }>();

  const [discussionInfo, setDiscussionInfo] = useState<DiscussionInfo>({
    id: 0,
    title: "",
    body: "",
    comments: [],
  });
  const [commentInput, setCommentInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch discussion with comments
  useEffect(() => {
    const getDiscussionInfo = async () => {
      try {
        const res = await api.get(`/discussion/${id}`);
        const discussion = res.data; // backend should return discussion object with comments including author
        setDiscussionInfo(discussion);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.message);
          setErrorMessage(err.message);
        } else {
          console.log("Unexpected error", err);
          setErrorMessage("Unexpected error");
        }
      }
    };
    getDiscussionInfo();
  }, [id]);

  // Handle adding a new comment
  const handleComment = async () => {
    if (!commentInput.trim()) return; // ignore empty comments
    try {
       await api.post(`/comment/add/${id}`, { comment: commentInput });

      window.location.reload();

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const backendMessage = err.response?.data?.message ?? err.message;
        console.log(backendMessage);
        setErrorMessage(backendMessage);

      } else {
        console.log("Unexpected error", err);
        setErrorMessage("Unexpected error");
      }
    }
  };

  return (
    <div className="flex justify-center text-black dark:text-white">
      <div className="flex flex-col items-center w-full max-w-4xl border-x border-slate-600 px-4">
        <h1 className="font-bold text-2xl my-4">{discussionInfo.title}</h1>

        <div className="bg-slate-300 dark:bg-slate-800 p-4 rounded-3xl mb-10">
          <p className="my-5">{discussionInfo.body}</p>
        </div>

        {/* Comment input */}
        <div className="flex items-center mb-5 w-full">
          <textarea
            className="flex-1 bg-slate-100 dark:bg-gray-900 rounded-2xl border border-slate-500 p-3 resize-none"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            rows={2}
            placeholder="Write a comment..."
            maxLength={150}
          />
          <button
            className="h-10 p-2 ml-2 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer active:bg-blue-300 dark:active:bg-blue-900"
            onClick={handleComment}
          >
            Add comment
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Comments list */}
        {discussionInfo.comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          discussionInfo.comments.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              username={comment.author.username}
              text={comment.text}
            />
          ))
        )}
      </div>
    </div>
  );
}