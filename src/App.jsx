import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/create" element={<CreateBook />} />
                <Route path="/book/delete/:id" element={<DeleteBook />} />
                <Route path="/book/edit/:id" element={<EditBook />} />
                <Route path="/book/detail/:id" element={<ShowBook />} />
            </Routes>
        </>
    );
};

export default App;
