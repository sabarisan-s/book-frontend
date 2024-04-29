import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {useSnackbar} from 'notistack'

const Deletebook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const {enqueueSnackbar}=useSnackbar()

    const handleDeleteBook = async () => {
        setLoading(true);
        axios
            .delete(`/book/${id}`)
            .then(() => {
                setLoading(false);
                navigate("/");
                enqueueSnackbar("Book Deleted successfully", {
                    variant: "success",
                });
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
        <div className=" mx-auto">
            <BackButton />


            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                    <h3 className="text-2xl">
                        Are you Sure You Want To Delete This Book?
                    </h3>
                    <button
                        className="p-4 bg-red-400 text-white m-8 w-full"
                        onClick={handleDeleteBook}
                    >
                        {" "}
                        Yes,Delete it
                    </button>
                </div>
            )}
   
        </div>
    );
};

export default Deletebook;
