import React from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from "next/link";

const Comment = ({ data }) => {
  const { textContent, createdOn, user, name, image, email } = data;

  const date = createdOn.substring(0, 10);
  const username = email.substring(0, 7);

  return (
    <Container fluid className="mt-2 mx-2 mb-2 p-1">
      <Row>
        <Col style={{ cursor: "pointer", display:'flex', justifyContent:'flex-end' }} xs={1}>
        <Link href={`/profile/${username}`}>
          <Image
            className="m-1"
            src={image}
            roundedCircle
            height={40}
            width={40}
          />
        </Link>
        </Col>
        <Col >
          <Row>
            <span>
              <b>{name}</b>   {date}
            </span>
          </Row>
          <Row><span>{textContent}</span></Row>
        </Col>
        {/* <Link href={`/event/${id}`}>
            <b>Event</b>
          </Link> */}
      </Row>
    </Container>
  );
};

export default Comment;
