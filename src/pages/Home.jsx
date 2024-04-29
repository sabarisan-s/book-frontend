import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showType, setShowType] = useState("table");

    useEffect(() => {
        setLoading(true);
        axios
            .get("/books")
            .then(({ data }) => {
                setBooks(data.data);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e.message);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button
                    className="bg-sky-300 hover:bg-sky-600 px-4 rounded-lg"
                    onClick={() => setShowType("table")}
                >
                    Table
                </button>
                <button
                    className="bg-sky-300 hover:bg-sky-600 px-4 rounded-lg"
                    onClick={() => setShowType("card")}
                >
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3lx my-8 font-bold ">Books List</h1>
                <Link to="/book/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : showType === "table" ? (
                <BookTable books={books} />
            ) : (
                <BookCard books={books} />
            )}
        </div>
    );
};

export default Home;
