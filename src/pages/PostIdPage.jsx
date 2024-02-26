import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [fetchPostById, isLoading, error] = useFetching(async (id)=>{
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
    }, []);

    return (
        <div>
            <h1>ВЫ ОТКРЫЛИ СТРАНИЦУ ПОСТА С ID = {params.id}</h1>
            {isLoading
                ? <Loader/>
                : <div>
                    {post.id}. {post.title}
                    <div>{post.body}</div>
                </div>
            }
        </div>
    );
};

export default PostIdPage;