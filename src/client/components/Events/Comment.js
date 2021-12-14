import React from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from "next/link";

const Comment = ({ data }) => {
  const { textContent, createdOn, user, name, image, email } = data;

  const date = createdOn.substring(0, 10);
  const username = email.substring(0, 7);

  return (
    <Container fluid className="my-2 mx-2">
      <Row>
        <Col style={{ cursor: "pointer", display:'flex', justifyContent:'flex-end' }} className="col-auto">
        <Link href={`/profile/${username}`}>
          <Image
            src={image}
            roundedCircle
            height={40}
            width={40}
          />
        </Link>
        </Col>
        <Col >
          <Row>
            <div className="d-flex flex-wrap">
            <span>
              <b>{name}</b>
            </span>
            <span className="text-sm text-muted px-1">{date}</span>
            </div>
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
