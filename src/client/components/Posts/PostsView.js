import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Spinner, Button} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Post from './Post';

const PostsView = ({eventId}) => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    // const {user, token} = useFetchUser();

    const fetchPosts = () => {
        fetch(`/api/event/${eventId}/post?offset=${posts.length || 0}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(newPosts => {
            if(!Array.isArray(newPosts) || newPosts.length === 0){
                setHasMore(false);
                return;
            }
            setPosts(posts => [...posts, ...newPosts]);
        });
    }

    useEffect(() => {
        const scrollBarExists = document.body.scrollHeight > document.body.clientHeight;
        if (!scrollBarExists)
            fetchPosts();
    }, []);

    return <>
    <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={hasMore}
            loader={<Skeleton count={10}/>}
            endMessage={
                <p className="text-muted" style={{ textAlign: "center" }}>
                    End of stream
                </p>
            }
            style={{
                maxWidth: 800,
                overflowX: 'hidden',
                margin: 'auto'
            }}
            initialScrollY={1}
        >
        {posts.map((post, index) => (
            <Post 
                data={post} 
                key={index} 
            />
        ))}
        {hasMore && <div  className="text-center"><Button variant="light" onClick={fetchPosts}>Load More</Button></div>}
        </InfiniteScroll>
        </>
}

export default PostsView;