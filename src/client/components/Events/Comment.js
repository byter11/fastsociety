import React from 'react';
import { Card, Image } from 'react-bootstrap';

const Comment = ({ data }) => {
  const { username, textContent, createdOn, user, name, image } = data;

  console.log(user);

  return (
    <>
      <Row className="justify-content-between">
        <Col style={{ cursor: "pointer" }} xs={8}>
          <Link href={`/profile/${username}`}>
            <span>
              <Image
                className="m-2"
                src={
                  image ||
                  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                }
                roundedCircle
                height={40}
                width={40}
              />
              <b>{ name }</b>
            </span>
          </Link>
          <Link href={`/event/${id}`}>
            <b>Event</b>
          </Link>
        </Col>
        <Col className="text-end align-self-center mx-2">
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: userRating ? "yellow" : "grey" }}
          ></FontAwesomeIcon>
          <span> {rating || 0}</span>
        </Col>
      </Row>
    </>
  );
};

export default Comment;
