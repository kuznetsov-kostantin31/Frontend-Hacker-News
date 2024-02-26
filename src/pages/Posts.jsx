import {useEffect, useState} from "react";
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/myModal/MyModal";
import PostForm from "../components/PostForm";
import Pagination from "../components/UI/pagination/Pagination";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/loader";

function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)


    const [fetchPost, isPostLoading, postError] = useFetching(async (limit, page)=>{
        const  response = await PostService.getAll(limit, page)
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPost(limit, page)
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) =>{
        setPage(page)
        fetchPost(limit, page)
    }

    return (
        <div className="App">
            <MyButton onClick={fetchPost}>GET POSTS</MyButton>
            <hr style={{margin: '15px 0'}}/>
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'HACKER NEWS (ну почти)'}/>
            }
        </div>
    );
}

export default Posts;
