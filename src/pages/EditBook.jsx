import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`/book/${id}`)
            .then(({ data }) => {
                setAuthor(data.author);
                setTitle(data.title);
                setPublishYear(data.publishYear);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                alert("Error Happen Please Check Console");
                console.log(e.message);
            });
    }, []);

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear,
            
        };
        setLoading(true);
        axios
            .put(`/book/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book edited successfully", {
                    variant: "success",
                });
                navigate("/");
            })
            .catch((e) => {
                setLoading(false);
                enqueueSnackbar("Error", {
                    variant: "error",
                });
                console.log(e.message);
            });
    };
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Edit Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <div className="my-4">
                        <label
                            htmlFor="title"
                            className="text-gray-500 text-xl mr-4"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label
                            htmlFor="author"
                            className="text-gray-500 text-xl mr-4"
                        >
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label
                            htmlFor="publishYear"
                            className="text-gray-500 text-xl mr-4"
                        >
                            PublishYear
                        </label>
                        <input
                            type="number"
                            name="publishYear"
                            id="publishYear"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className="border-2 border-gray-500 px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        className="p-2 bg-sky-300 m-8 "
                        onClick={handleSaveBook}
                    >
                        Save
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditBook;
