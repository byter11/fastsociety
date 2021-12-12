import { useState, useEffect } from "react";
import { useFetchUser } from '../../hooks/user';
import { Modal, Container, Row, Col, Spinner, Button, Image } from "react-bootstrap";
import Comment from './Comment';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommentsView = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [commentData, setCommentData] = useState({});
  const {user, token} = useFetchUser();

  const fetchComments = () => {
    fetch(`/api/event/${eventId}/comment?offset=${comments.length || 0}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newComments) => {
        if (!Array.isArray(newComments) || newComments.length === 0) {
          setHasMore(false);
          return;
        }
        setComments((comments) => [...comments, ...newComments]);
      });
  };

  const postComment = () => {
    fetch(`/api/event/${eventId}/comment`, {
      method: "POST",
      headers: {'Content-Type': 'application/json', token: token},
      body: JSON.stringify(commentData),
    }).then((res) => console.log(res));
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((e) => ({ ...e, [name]: value }));
  };

  useEffect(() => {
    fetchComments();
  }, []);


  return (
    <>
      <Container>
        <div
          className="d-flex flex-wrap m-auto"
          style={{
            cursor: "pointer",
            maxWidth: 768,
          }}
        >
          <Link href={`/profile/${user.id}`}>
            <Image
              className="my-2"
              src={
                user.image ||
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              }
              roundedCircle
              height={40}
              width={40}
            />
          </Link>

          <input 
            className="p-2 m-2 flex-fill d-flex bg-light rounded-pill border hover" placeholder="Say something..."
              style={ { outline: 'none'} } onChange={handleChange} name="textContent"
          />

          <div className="m-auto">
            <FontAwesomeIcon
              icon="paper-plane"
              onClick={postComment}
              size="2x"
              className="ratingStarButton"
              color="silver"
            />
          </div>
        </div>
        {comments.map((comment, index) => (
          <>
            <Comment data={comment} key={index} />
          </>
        ))}
        {hasMore && (
          <div className="text-center">
            <Button variant="light" onClick={fetchComments}>
              Load More Comments
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default CommentsView;
