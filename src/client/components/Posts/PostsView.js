import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Spinner, Button} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Post from './Post';
import { useFetchUser } from '../../hooks/user';


const PostsView = ({event}) => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const {user, token} = useFetchUser();

    const fetchPosts = () => {
        fetch(`/api/event/${event.id}/post?offset=${posts.length || 0}`,{
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
    
    const canDelete = (() => {
        try {
            return !!user.societies.filter(s => s.id == event.society.id)[0].role.deletePost
        }
        catch {
            return false;
        }
    })()

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
                post={post} 
                key={index} 
                canDelete={canDelete}
            />
        ))}
        {hasMore && <div  className="text-center"><Button variant="light" onClick={fetchPosts}>Load More</Button></div>}
        </InfiniteScroll>
        </>
}

export default PostsView;