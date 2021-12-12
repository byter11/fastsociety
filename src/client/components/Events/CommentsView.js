import { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import Comment from "./Comment";

const CommentsView = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  // const {user, token} = useFetchUser();

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

  useEffect(() => {
    const scrollBarExists =
      document.body.scrollHeight > document.body.clientHeight;
    if (!scrollBarExists) fetchComments();
  }, []);

  return (
    <>
      <Container>
        {/* {
      
        } */}
        {comments.map((comment, index) => (
          <Comment data={comment} key={index} />
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
