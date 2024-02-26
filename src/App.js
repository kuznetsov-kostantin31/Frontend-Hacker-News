import React, {useEffect, useMemo, useState} from "react";
import './styles/App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";
import PostIdPage from "./pages/PostIdPage";

function App() {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" component={<Posts/>} />
                <Route exact path="/posts" element={<Posts/>}/>
                <Route exact path="/posts/:id" element={<PostIdPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
